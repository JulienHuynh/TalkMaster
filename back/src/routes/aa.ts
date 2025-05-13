import { Router, Request } from 'express';
import { PrismaClient } from '@prisma/client';

export default function talksRoutes(prisma: PrismaClient): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const talks = await prisma.talk.findMany();
        res.json(talks);
    });

    router.get('/:id', async (req: Request<{ id: string; }>, res: any) => {
        const { id } = req.params;
        const talk = await prisma.talk.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!talk) {
            return res.status(404).json({ error: 'Talk not found' });
        }

        res.json(talk);
    });

    router.post('/', async (req: Request<{ title: string, description: string, status: string, roomId: number, userId: string }>, res: any) => {
        const { title, description, status = 'pending', roomId, userId } = req.body;

        await prisma.talk.create({
            data: {
                title,
                description,
                status,
                roomId,
                userId,
            },
        })
            .then(() => {
                res.status(201).json({ message: 'Talk created successfully' });
            })
            .catch((err: object) => {
                console.error(err);
                res.status(400).json({ error: 'Unable to create talk' });
            });
    })
    return router;
}