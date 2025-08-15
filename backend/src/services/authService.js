// src/services/authService.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUsuarioByEmail,
  createUsuarioConPassword,
  updateUltimoLogin,
} from "../repositories/authRepository.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";
const sanitize = ({ passwordHash, ...u }) => u;
const signAccessToken = (user) =>
  jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "15m" });

// ✅ ahora recibe y reenvía "tipo"
export async function register({ nombre, email, password, tipo }) {
  const existing = await findUsuarioByEmail(email);
  if (existing) throw new Error("EMAIL_TAKEN");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUsuarioConPassword({ nombre, email, passwordHash, tipo });
  return sanitize(user);
}

export async function login({ email, password }) {
  const user = await findUsuarioByEmail(email);
  if (!user || !user.passwordHash) throw new Error("INVALID_CREDENTIALS");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("INVALID_CREDENTIALS");
  await updateUltimoLogin(user.id);
  const token = signAccessToken(user);
  return { user: sanitize(user), token };
}
