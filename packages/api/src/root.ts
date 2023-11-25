import { authRouter } from "./router/auth";
import { orderRouter } from "./router/orders";
import { profileRouter } from "./router/profile";
import { userRouter } from "./router/user";
import { productsRouter } from "./router/products";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  profile: profileRouter,
  orders: orderRouter,
  product: productsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
