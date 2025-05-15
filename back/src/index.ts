import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { PrismaClient } from "../generated/prisma";
import { authMiddleware } from "./middleware/auth";
import { organizerMiddleware } from "./middleware/organizer";
import organizerTalksRoute from "./routes/organizerTalks";
import slotsRoutes from "./routes/slot";
import talksRoutes from "./routes/talk";
import usersRoutes from "./routes/user";

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: [
      /https:\/\/.*\.vercel\.app/, // autorise n’importe quel sous-domaine Vercel
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRoutes(prisma));
app.use("/talks", authMiddleware, talksRoutes(prisma));
app.use("/slots", slotsRoutes(prisma));
app.use(
  "/organizer/talks",
  authMiddleware,
  organizerMiddleware,
  organizerTalksRoute(prisma),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
