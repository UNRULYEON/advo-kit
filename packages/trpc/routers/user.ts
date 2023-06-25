import { router, publicProcedure } from "../trpc";

type User = { id: string; name: string };

const userRouter = router({
  userList: publicProcedure.query<User[]>(async () => {
    return [{ id: "1", name: "test" }];
  }),
});

export default userRouter;
