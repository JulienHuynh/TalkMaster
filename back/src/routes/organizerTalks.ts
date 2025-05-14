import { Router, Request } from 'express';
import { PrismaClient } from '@prisma/client';

export default function organizerTalksRoute(prisma: PrismaClient): Router {

  const router = Router();

  // Route pour update le status d'un talk"
  router.post('/:id/update', async (req: Request<{ id: string, status: string }>, res) => {
    const { id } = req.params;
    const { status } = req.body;

    await prisma.talk.update({
      where: { id: Number(id)},
      data: {
        status: status
      }
    })
    .then((updatedTalk: object) => res.status(200).json(updatedTalk))
    .catch((err: object) => {
      console.log(err)
      res.status(400).json({ error: 'Impossible de modifier le talk' });
    });
  });

  return router;
}