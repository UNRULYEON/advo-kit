import t, { router } from "./trpc";
import userRouter from "./routers/user";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
export { createContext } from "./trpc";
