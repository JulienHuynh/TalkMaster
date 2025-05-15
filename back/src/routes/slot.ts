import type { PrismaClient } from "@prisma/client";
import { type Request, Router } from "express";

export default function slotsRoutes(prisma: PrismaClient): Router {
  const router = Router();

  router.get(
    "/",
    async (
      req: Request<{ roomId: string; date: string; duration: string }>,
      res: any,
    ) => {
      const { roomId, date, duration } = req.query;

      if (!roomId || !date)
        return res.status(400).json({ error: "roomId and date are required" });

      if (typeof date !== "string")
        return res.status(400).json({ error: "Invalid date format" });

      const baseDate = new Date(date);
      const indexSlot = Math.floor(
        (baseDate.getHours() * 60 + baseDate.getMinutes()) / 15,
      );
      baseDate.toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
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

      const takenIndexes = new Set(
        takenSlots.map((s: any) => {
          const minutes = s.date.getHours() * 60 + s.date.getMinutes();
          return Math.floor(minutes / 15); // index de 0 à 95
        }),
      );

      const result = Array.from({ length: 96 }, (_, i) => {
        if (i < indexSlot || i > indexSlot + Number(duration)) return null;
        const time = new Date(baseDate.getTime() + i * 15 * 60 * 1000);
        return {
          index: i,
          time,
          isTaken: takenIndexes.has(i),
        };
      }).filter(Boolean);

      res.json(result);
    },
  );

  router.post(
    "/assign",
    async (
      req: Request<{
        roomId: number;
        talkId: number;
        slotsIndex: object[];
      }>,
      res: any,
    ) => {
      const { roomId, talkId, slotsIndex } = req.body;

      if (!roomId || !slotsIndex || !talkId)
        return res
          .status(400)
          .json({ error: "roomId, date, talkId and userId are required" });

      const talk = await prisma.talk.findUnique({
        where: { id: talkId },
        include: {
          Slot: true,
        },
      });

      if (!talk) return res.status(404).json({ error: "Talk not found" });
      if (talk.Slot.length > 0)
        return res
          .status(400)
          .json({ error: "Talk already has slots assigned" });

      const baseDate = new Date(talk.date);
      baseDate.setHours(0, 0, 0, 0);

      const existingSlots = await prisma.slot.findMany({
        where: {
          roomId,
          index: { in: slotsIndex.map((s: any) => s.index) },
          date: {
            gte: baseDate,
            lt: new Date(new Date(baseDate).getTime() + 24 * 60 * 60 * 1000),
          },
        },
      });

      if (existingSlots.length > 0) {
        return res
          .status(400)
          .json({ error: "One or more selected slots are already reserved" });
      }

      await Promise.all(
        slotsIndex.map((slot: any) => {
          return prisma.slot
            .create({
              data: {
                date: talk.date,
                index: slot.index,
                roomId,
                userId: talk.userId,
                talkId: talkId,
              },
            })
            .then((slot: any) => {
              return {
                index: slot.index,
                time: slot.date,
              };
            })
            .catch(() => {
              return res
                .status(400)
                .json({
                  error: `Impossible de réserver le slot ${slot.index}`,
                });
            });
        }),
      )
        .then((slots: any) => {
          res.status(201).json(slots);
        })
        .catch(() => {
          res.status(400).json({ error: "Impossible de réserver les slots" });
        });

      await prisma.talk.update({
        where: { id: talkId },
        data: { status: "plannified" },
      });
    },
  );

  return router;
}
