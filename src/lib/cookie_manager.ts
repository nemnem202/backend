import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { SessionToken } from "../types/general/session_token";

dotenv.config();
export class CookieManager {
  static generate_cookie_with_token(
    res: Response,
    session: SessionToken
  ): Response<any, Record<string, any>> | null {
    const secret = process.env.SESSION_TOKEN_SECRET_KEY;

    if (!secret) return null;

    const token = jwt.sign(session, secret, {
      expiresIn: "1h",
    });

    return res.cookie("session_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }

  static parse(req: Request): SessionToken | null {
    const secret = process.env.SESSION_TOKEN_SECRET_KEY;
    if (!secret) return null;

    const token = req.cookies?.session_token;
    if (!token) return null;

    try {
      const decoded = jwt.verify(token, secret);
      if (typeof decoded === "object" && "user_id" in decoded) {
        const payload = decoded as SessionToken;
        return payload;
      } else {
        console.error("Le token est une string, pas un objet");
        return null;
      }
    } catch (err) {
      console.error("Token invalide ou expiré :", err);
      return null;
    }
  }
}
