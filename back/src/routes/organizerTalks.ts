import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export default function organizerTalksRoute(prisma: PrismaClient): Router {

  const router = Router();

  // Route pour valider un talk
  router.post('/:id/validated', async (req, res) => {
    const { id } = req.params;

    await prisma.talk.update({
      where: { id: Number(id)},
      data: {
        status: 'validated'
      }
    })
    .then((updatedTalk: object) => res.status(200).json(updatedTalk))
    .catch((err: object) => {
      console.log(err)
      res.status(400).json({ error: 'Enable to update talk' });
    });
  });

  // Route pour refuser un talk
  router.post('/:id/refused', async (req, res) => {
    const { id } = req.params;

    await prisma.talk.update({
      where: { id: Number(id)},
      data: {
        status: 'refused'
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