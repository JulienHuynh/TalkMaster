import type { PrismaClient } from "@prisma/client";
import { type Request, Router } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";

export default function talksRoutes(prisma: PrismaClient): Router {
  const router = Router();

  router.get("/", async (_, res) => {
    const talks = await prisma.talk.findMany();
    res.json(talks);
  });

  router.get("/pending-requests", async (_, res) => {
    try {
      const talksPending = await prisma.talk.findMany({
        where: {
          status: "pending",
        },
      });

      res.json(talksPending);
    } catch (_err) {
      res.status(500).json({
        error: 'Impossible de récupérer les talks en statut "pending"',
      });
    }
  });

  router.get("/:id", async (req: Request<{ id: string }>, res: any) => {
    const { id } = req.params;
    const talk = await prisma.talk.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!talk) {
      return res.status(404).json({ error: "Talk not found" });
    }

    res.json(talk);
  });

  // Talk Creation
  router.post(
    "/",
    async (
      req: Request<{
        title: string;
        description: string;
        status?: string;
        date: Date;
        duration: number;
        roomId: number;
      }> &
        AuthenticatedRequest,
      res: any,
    ) => {
      const {
        title,
        description,
        status = "pending",
        roomId,
        duration,
        date,
      } = req.body;
      const userId = req.userId;

      if (!title || !roomId || !userId || !duration || !date) {
        return res
          .status(400)
          .json({ error: "title, roomId et userId sont obligatoires" });
      }

      await prisma.talk
        .create({
          data: {
            title,
            description,
            status,
            roomId,
            duration,
            date: new Date(date),
            userId,
          },
        })
        .then((talk: object) => res.status(201).json(talk))
        .catch(() =>
          res.status(400).json({ error: "Impossible de créer le talk" }),
        );
    },
  );

  //Talk Modification
  router.put(
    "/:id",
    async (
      req: Request<{
        id: string;
        title: string;
        description: string;
        status: string;
        roomId: number;
        userId: string;
      }>,
      res: any,
    ) => {
      const { id } = req.params;
      const { title, description, roomId, status, userId } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ error: "userId est requis pour modifier un talk" });
      }

      const talk = await prisma.talk.findUnique({ where: { id: Number(id) } });

      if (talk.userId !== userId) {
        return res
          .status(403)
          .json({ error: "Non autorisé à modifier ce talk" });
      }

      if (!talk) {
        return res.status(404).json({ error: "Talk introuvable" });
      }

      await prisma.talk
        .update({
          where: { id: Number(id) },
          data: {
            title,
            description,
            roomId,
            status,
          },
        })
        .then((updatedTalk: object) => res.status(200).json(updatedTalk))
        .catch(() =>
          res.status(400).json({ error: "Impossible de modifier le talk" }),
        );
    },
  );

  // Delete a Talk
  router.delete(
    "/:id",
    async (req: Request<{ id: string; userId: string }>, res: any) => {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ error: "userId est requis pour supprimer un talk" });
      }

      const talk = await prisma.talk.findUnique({ where: { id: Number(id) } });

      if (talk.userId !== userId) {
        return res
          .status(403)
          .json({ error: "Non autorisé à supprimer ce talk" });
      }

      if (!talk) {
        return res.status(404).json({ error: "Talk introuvable" });
      }

      await prisma.talk
        .delete({ where: { id: Number(id) } })
        .then(() =>
          res.status(200).json({ message: "Talk supprimé avec succès" }),
        )
        .catch(() =>
          res.status(400).json({ error: "Impossible de supprimer le talk" }),
        );
    },
  );

  return router;
}
