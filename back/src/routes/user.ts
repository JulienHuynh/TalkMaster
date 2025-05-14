import { Router, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export default function usersRoutes(prisma: PrismaClient): Router {
  const router = Router();

  router.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

  router.post('/', async (req: Request<{ email: string, password: string, firstName: string, lastName: string }>, res: any) => {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    }).then((user: { id: string, email: string, firstName: string, lastName: string }) => {
      res.status(201).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }).catch((err: object) => {
      console.error(err);
      res.status(400).json({ error: 'Impossible de créer l\'utilisateur' });
    })
  });

  return router;
}
