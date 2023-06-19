import { router, publicProcedure } from "../trcp";

type User = { id: string; name: string };

const userRouter = router({
  userList: publicProcedure.query<User[]>(async () => {
    return [{ id: "1", name: "test" }];
  }),
});

export default userRouter;
