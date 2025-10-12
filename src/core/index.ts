import express from "express";
import router from "../router/router";
import cors from "cors";
import cookie_parser from "cookie-parser";
import dotenv from "dotenv";
import AdminAccountRepository from "../repository/admin_account";

const start_server = async () => {
  try {
    dotenv.config();
    const app = express();
    const port = 3000;

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

    const admin_already_here = admin.finOneBy("username", process.env.ADMIN_USERNAME);

    if (!admin_already_here) {
      const adminentity = await admin.add_item({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });

      if (!adminentity) {
        throw new Error("l'entité n'a pas pu etre placée dans la bdd");
      }
    }

    app.listen(port, () => {
      console.log(`Serveur en écoute sur http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start_server();
