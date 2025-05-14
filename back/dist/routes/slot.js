"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = slotsRoutes;
const express_1 = require("express");
function slotsRoutes(prisma) {
    const router = (0, express_1.Router)();
    router.get('/', async (req, res) => {
        const { roomId, date, duration } = req.query;
        if (!roomId || !date)
            return res.status(400).json({ error: 'roomId and date are required' });
        if (typeof date !== 'string')
            return res.status(400).json({ error: 'Invalid date format' });
        const baseDate = new Date(date);
        const indexSlot = Math.floor((baseDate.getHours() * 60 + baseDate.getMinutes()) / 15);
        baseDate.toLocaleString('fr-FR', {
            timeZone: 'Europe/Paris',
        });
        baseDate.setHours(0, 0, 0, 0);
        const takenSlots = await prisma.slot.findMany({
            where: {
                roomId: Number(roomId),
                date: {
                    gte: baseDate,
                    lt: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000),
                },
            },
            select: { date: true },
        });
        const takenIndexes = new Set(takenSlots.map((s) => {
            const minutes = s.date.getHours() * 60 + s.date.getMinutes();
            return Math.floor(minutes / 15); // index de 0 à 95
        }));
        const result = Array.from({ length: 96 }, (_, i) => {
            if (i < indexSlot || i > indexSlot + Number(duration))
                return null;
            const time = new Date(baseDate.getTime() + i * 15 * 60 * 1000);
            return {
                index: i,
                time,
                isTaken: takenIndexes.has(i),
            };
        }).filter(Boolean);
        res.json(result);
    });
    router.post('/assign', async (req, res) => {
        const { roomId, date, userId, talkId } = req.body;
        if (!roomId || !date || !userId || !talkId)
            return res.status(400).json({ error: 'roomId, date, talkId and userId are required' });
        const talk = await prisma.talk.findUnique({
            where: { id: talkId },
            include: {
                Slot: true,
            }
        });
        if (!talk)
            return res.status(404).json({ error: 'Talk not found' });
        if (talk.Slot.length > 0)
            return res.status(400).json({ error: 'Talk already has slots assigned' });
        const talkDuration = talk.duration;
        const baseDate = new Date(date);
        // baseDate.toLocaleString('fr-FR', {
        //     timeZone: 'Europe/Paris',
        // });
        // Get index of date 
        const minutes = baseDate.getHours() * 60 + baseDate.getMinutes();
        const index = Math.floor(minutes / 15); // index de 0 à 95
        const slotIndexes = Array.from({ length: talkDuration }, (_, i) => index + i);
        // Check if slots indexes exists
        const existingSlots = await prisma.slot.findMany({
            where: {
                roomId,
                index: { in: slotIndexes },
                date: {
                    gte: baseDate,
                    lt: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000),
                },
            },
        });
        const isTaken = existingSlots.some((slot) => slot.index >= index && slot.index < index + talkDuration);
        if (isTaken)
            return res.status(400).json({ error: 'One or more selected slots are already reserved' });
        // Reserve the slots
        await Promise.all(slotIndexes.map((i) => {
            return prisma.slot.create({
                data: {
                    date: baseDate,
                    index: i,
                    roomId,
                    userId,
                    talkId: talkId,
                },
            }).then((slot) => {
                return {
                    index: i,
                    time: slot.date
                };
            }).catch((err) => {
                console.error(err);
                return res.status(400).json({ error: 'Impossible de réserver le slot ' + i });
            });
        })).then((slots) => {
            res.status(201).json(slots);
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ error: 'Impossible de réserver les slots' });
        });
        await prisma.talk.update({
            where: { id: talkId },
            data: { status: 'plannified' },
        });
    });
    return router;
}
