const dotenv = require("dotenv");

import fs from "fs";
import express from "express";
import https from "https";
import session from "express-session";
// @ts-ignore
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./prisma";

import authRouter from "./routes/auth";

const app = express();
const PORT = 3000;
const STATIC_DIR_WEB = "../web/dist";
const STATIC_DIR_ADMIN = "../admin/dist";

const key =
  process.env.NODE_ENV !== "production"
    ? fs.readFileSync("../../.cert/localhost/advo-kit-localhost.decrypted.key")
    : undefined;
const cert =
  process.env.NODE_ENV !== "production"
    ? fs.readFileSync("../../.cert/localhost/advo-kit-localhost.crt")
    : undefined;

app.use((_, res, next) => {
  res.setHeader("X-Powered-By", "your mom");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      domain: "localhost",
      secure: true,
      sameSite: "none",
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 1000 * 60 * 60 * 24 * 7, // 1 week
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done: any) => {
  process.nextTick(() => {
    return done(null, user.id);
  });
});

passport.deserializeUser((id: string, done: any) => {
  prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .then((user: any) => {
      done(null, user || false);
    })
    .catch((e: any) => {
      done(e);
    });
});

app.use("/", express.static(STATIC_DIR_WEB));
app.use("/admin", express.static(STATIC_DIR_ADMIN));

app.use("/api/admin", authRouter);

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/hello", (req, res) => {
  res.send("World!");
});

if (process.env.NODE_ENV === "production") {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
} else {
  const server = https.createServer({ key, cert }, app);

  server.listen(PORT, () => {
    console.log(`Server started on https://localhost:${PORT}`);
  });
}
