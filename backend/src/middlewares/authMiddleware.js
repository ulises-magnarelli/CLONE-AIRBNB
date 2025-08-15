import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

export function requireAuth(req, res, next) {
  const fromHeader = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.replace("Bearer ", "")
    : null;
  const token = req.cookies?.token || fromHeader;
  if (!token) return res.status(401).json({ error: "UNAUTHORIZED" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
}
