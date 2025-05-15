import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "./auth";

export const organizerMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  if (req.role !== "organizer") {
    res.status(403).json({ error: "Forbidden, you are not a Orgnaizer" });
    return;
  }

  next();
};
