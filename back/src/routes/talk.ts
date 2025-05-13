import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export default function talksRoutes(prisma: PrismaClient): Router {
  const router = Router();

  // Talk Creation
  router.post('/', async (req, res) => {
    const { title, description, roomId, userId } = req.body;

    if (!title || !roomId || !userId) {
      return res.status(400).json({ error: 'title, roomId et userId sont obligatoires' });
    }

    try {
      const talk = await prisma.talk.create({
        data: {
          title,
          description,
          roomId,
          userId,
        },
      });
      res.status(201).json(talk);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Impossible de créer le talk' });
    }
  });

  //Talk Modification
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, roomId, status, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId est requis pour modifier un talk' });
    }

    try {
      const talk = await prisma.talk.findUnique({ where: { id: parseInt(id) } });

      if (!talk) {
        return res.status(404).json({ error: 'Talk introuvable' });
      }

      if (talk.userId !== userId) {
        return res.status(403).json({ error: 'Non autorisé à modifier ce talk' });
      }

      const updatedTalk = await prisma.talk.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          roomId,
          status,
        },
      });

      res.json(updatedTalk);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Impossible de modifier le talk' });
    }
  });

  // Delete a Talk
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId est requis pour supprimer un talk' });
    }

    try {
      const talk = await prisma.talk.findUnique({ where: { id: parseInt(id) } });

      if (!talk) {
        return res.status(404).json({ error: 'Talk introuvable' });
      }

      if (talk.userId !== userId) {
        return res.status(403).json({ error: 'Non autorisé à supprimer ce talk' });
      }

      await prisma.talk.delete({ where: { id: parseInt(id) } });

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Impossible de supprimer le talk' });
    }
  });

  return router;
}
