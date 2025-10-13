import express from "express";
import router from "../router/router";
import cors from "cors";
import cookie_parser from "cookie-parser";
import dotenv from "dotenv";
import AdminAccountRepository from "../repository/admin_account";
import { PasswordHandler } from "../lib/password_handler";

const start_server = async () => {
  try {
    dotenv.config();
    const app = express();
    const port = 3000;


app.use(cors());
app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(cookie_parser(process.env.COOKIE_SECRET_KEY));

    app.use(router);

    const admin = new AdminAccountRepository();

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      throw new Error("[ENV] : les clés admin de l'environnement ne sont pas définies");
    }

    const admin_already_here = await admin.finOneBy("username", process.env.ADMIN_USERNAME);

    if (!admin_already_here) {
      console.log("[LAUNCH] : création du compte administrateur", +process.env.ADMIN_USERNAME);
      const hash = await PasswordHandler.generate_hash(process.env.ADMIN_PASSWORD);
      if (!hash) {
        throw new Error();
      }

      const adminentity = await admin.add_item({
        username: process.env.ADMIN_USERNAME,
        password: hash,
      });

      if (!adminentity) {
        throw new Error("l'entité n'a pas pu etre placée dans la bdd");
      }
    } else {
      console.warn("[LAUNCH] : compte administrateur déja créé");
    }

    app.listen(port, () => {
      console.log(`Serveur en écoute sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start_server();
