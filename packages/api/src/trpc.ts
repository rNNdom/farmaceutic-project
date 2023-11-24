/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { decode, verify } from "jsonwebtoken";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma } from "@acme/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
type CreateContextOptions = {
  userId: string | null;
};
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    userId: opts.userId,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  function getUserIdFromHeader() {
    if (req.headers) {
      const jwtToken = req.headers.get("authorization")?.split(" ")[1];
      console.log(jwtToken);
      try {
        const decoded = decode(jwtToken) as any;
        if ("userId" in decoded) {
          const { userId } = decoded;
          return userId;
        }
      } catch (e) {
        console.log(e);
      }
    }

    return null;
  }
  const userId = getUserIdFromHeader();

  return createInnerTRPCContext({ userId: userId });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      usr_id: parseInt(ctx.userId),
    },
  });
  return next({
    ctx: {
      // infers the `session` as non-nullable
      userId: ctx.userId,
      role: user?.usr_role,
    },
  });
});
const enforceUserIsDelivery = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      usr_id: parseInt(ctx.userId),
    },
  });
  if (user?.usr_role !== "DELIVER") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      userId: ctx.userId,
      role: user?.usr_role,
    },
  });
});
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const protectedDeliveryProcedure = t.procedure.use(
  enforceUserIsDelivery,
);
//AQUI CREO NUEVOS MIDDLEWARES PARA VERIFICAR ROLES
/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
