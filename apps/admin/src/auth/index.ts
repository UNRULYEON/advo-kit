import GithubProvider from "next-auth/providers/github";
import db, { users } from "@advo-kit/db";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const emailSplitted = user.email.split("@");

      const isAllowedToSignIn =
        emailSplitted.includes("coolblue.nl") ||
        emailSplitted.includes("coolblue.be") ||
        emailSplitted.includes("coolblue.de") ||
        emailSplitted.includes("kisoensingh.sh");

      if (!isAllowedToSignIn) return false;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));

      if (existingUser.length === 0) {
        await db.insert(users).values({
          id: createId(),
          email: user.email,
          name: user.name || "",
          image: user.image || "",
        });
      }

      return true;
    },
  },
};
