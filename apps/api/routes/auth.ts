import express from "express";
// @ts-ignore
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createId } from "@paralleldrive/cuid2";
import prisma from "../prisma";

const router = express.Router();

type VerifyCallback = (
  err?: Error | null,
  user?: Express.User,
  info?: object
) => void;

type GithubProfile = {
  id: string;
  displayName: string;
  emails: { value: string }[];
};

passport.use(
  new GitHubStrategy(
    {
      clientID: "3001bc00768158653b81",
      clientSecret: "1a3589b02102cd3d055948be6241cbe1fba25be8",
      callbackURL: "https://localhost:3000/api/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      verified: VerifyCallback
    ) => {
      const emailSplitted = profile.emails[0].value.split("@");

      const isAllowedToSignIn =
        emailSplitted.includes("coolblue.nl") ||
        emailSplitted.includes("coolblue.be") ||
        emailSplitted.includes("coolblue.de") ||
        emailSplitted.includes("kisoensingh.sh");

      if (!isAllowedToSignIn)
        return verified(new Error("not-allowed-to-sign-in"));

      const existingUser = await prisma.user.findUnique({
        where: { email: profile.emails[0].value },
      });

      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            id: createId(),
            email: profile.emails[0].value,
          },
        });
        return verified(null, newUser);
      } else {
        return verified(null, existingUser);
      }
    }
  )
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/admin/login" }),
  (req, res) => res.redirect("/admin")
);

export default router;