import type { PrismaClient } from "@prisma/client";
import { type Request, Router } from "express";

export default function organizerTalksRoute(prisma: PrismaClient): Router {
  const router = Router();

  router.patch(
    "/:id",
    async (req: Request<{ id: string; status: string }>, res) => {
      const { id } = req.params;
      const { status } = req.body;

      await prisma.talk
        .update({
          where: { id: Number(id) },
          data: {
            status: status,
          },
        })
        .then((updatedTalk: object) => res.status(200).json(updatedTalk))
        .catch(() =>
          res.status(400).json({ error: "Impossible de modifier le talk" }),
        );
    },
  );

  return router;
}
