import express from 'express';
import { PrismaClient } from '../generated/prisma';
import usersRoutes from './routes/user';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/users', usersRoutes(prisma));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
