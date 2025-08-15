import * as authService from "../services/authService.js";

export class AuthController {
  async register(req, res) {
    try {
      const { nombre, email, password, tipo } = req.body; // ✅ incluir tipo
      if (!nombre || !email || !password)
        return res.status(400).json({ error: "MISSING_FIELDS" });
      const user = await authService.register({ nombre, email, password, tipo }); // ✅ pasar tipo
      return res.status(201).json(user);
    } catch (e) {
      if (e.message === "EMAIL_TAKEN")
        return res.status(409).json({ error: "EMAIL_TAKEN" });
      console.error("Auth register error:", e); // 👈 dejá este log para ver la causa real
      return res.status(500).json({ error: "INTERNAL_ERROR" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: "MISSING_FIELDS" });

      const { user, token } = await authService.login({ email, password });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      });
      return res.json(user);
    } catch (e) {
      if (e.message === "INVALID_CREDENTIALS")
        return res.status(401).json({ error: "INVALID_CREDENTIALS" });
      return res.status(500).json({ error: "INTERNAL_ERROR" });
    }
  }

  async me(req, res) {
    return res.json(req.user);
  }

  async logout(req, res) {
    res.clearCookie("token");
    return res.status(204).send();
  }
}
