import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { usr_id: input.id },
      });

      const profile = await ctx.prisma.profile.findUnique({
        where: { prf_id: user?.usr_id },
      });
      const userData = {};
      return Object.assign(userData, profile, user);
    }),
  updateProfile: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        lastname: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.update({
        where: { usr_id: input.id },
        data: {
          usr_name: input.name,
          usr_lastname: input.lastname,
          usr_phone: input.phone,
        },
      });
      return profile;
    }),
});
