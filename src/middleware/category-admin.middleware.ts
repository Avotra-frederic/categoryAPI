import { NextFunction, Request, Response } from "express";
import { timingSafeEqual } from "crypto";

export default function categoryAdmin(_req: Request, res: Response, next: NextFunction) {
  const expected = process.env.CATEGORY_API_ADMIN_TOKEN;
  // Open source installs remain compatible by default. Operators can opt in to
  // bearer-token protection for write routes by configuring this variable.
  if (expected === undefined || expected.length === 0) {
    next();
    return;
  }
  const supplied = _req.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  if (expectedBuffer.length !== suppliedBuffer.length || !timingSafeEqual(expectedBuffer, suppliedBuffer)) {
    res.status(403).json({ status: "Error", message: "Accès réservé à l’administration du catalogue." });
    return;
  }
  next();
}
