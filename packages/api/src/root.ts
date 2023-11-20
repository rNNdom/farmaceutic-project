import { authRouter } from "./router/auth";
import { profileRouter } from "./router/profile";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
