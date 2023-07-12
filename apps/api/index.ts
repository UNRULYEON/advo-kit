const dotenv = require("dotenv");

import fs from "fs";
import express from "express";
import https from "https";
import session from "express-session";
import cors from "cors";
// @ts-ignore
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cookieParser from "cookie-parser";
import prisma from "./prisma";

import authRouter from "./routes/auth";

const app = express();
const PORT = 3000;
const STATIC_DIR_WEB = "../web/dist";
const STATIC_DIR_ADMIN = "../admin/dist";

const corsOptions = {
  origin: [
    "https://127.0.0.1:5173",
    "https://localhost:5173",
    "https://127.0.0.1:5174",
    "https://localhost:5174",
  ],
  credentials: true,
};

const key =
  process.env.NODE_ENV !== "production"
    ? fs.readFileSync("../../localhost-key.pem")
    : undefined;
const cert =
  process.env.NODE_ENV !== "production"
    ? fs.readFileSync("../../localhost.pem")
    : undefined;

app.use((_, res, next) => {
  res.setHeader("X-Powered-By", "your mom");
  next();
});

app.enable("trust proxy");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
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

app.use("/api", authRouter);

app.get("/api/health", (_, res) => {
  res.status(200).send("OK");
});

app.get("/api/hello", (req, res) => {
  res.send("World!");
});

app.use("/admin", express.static(STATIC_DIR_ADMIN));
app.use("/admin*", express.static(STATIC_DIR_ADMIN));
app.use("/", express.static(STATIC_DIR_WEB));

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
