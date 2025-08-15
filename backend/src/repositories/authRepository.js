import prisma from "../config/database.js";


export const findUsuarioByEmail = (email) =>
  prisma.usuario.findUnique({ where: { email } });

// ✅ ahora acepta "tipo" y lo pasa si viene definido
export const createUsuarioConPassword = ({ nombre, email, passwordHash, tipo }) =>
  prisma.usuario.create({
    data: {
      nombre,
      email,
      passwordHash,
      provider: "LOCAL",
      ...(tipo != null ? { tipo } : {}), // <- importante
    },
  });

export const updateUltimoLogin = (id) =>
  prisma.usuario.update({ where: { id }, data: { ultimoLogin: new Date() } });
