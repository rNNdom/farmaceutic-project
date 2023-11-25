import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: { usr_id: "desc" } });
  }),
  one: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { usr_id: input.id } });
    }),
  updateRole: publicProcedure
    .input(
      z.object({
        id: z.number(),
        role: z.enum(["ADMIN", "DELIVER", "USER"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateUser = await ctx.prisma.user.update({
        where: { usr_id: input.id },
        data: {
          usr_role: input.role,
        },
      });

      if (!updateUser) {
        throw new Error("No se pudo actualizar el usuario");
      }

      return {
        user: updateUser,
      };
    }),
});
