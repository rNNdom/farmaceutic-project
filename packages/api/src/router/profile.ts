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
        id: z.number(),
        name: z.string(),
        lastname: z.string(),
        email: z.string().email(),
        pass: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { usr_id: input.id },
      });
      const updateUser = await ctx.prisma.user.update({
        where: { usr_id: input.id },
        data: {
          usr_email: input.email,
          usr_pass: input.pass,
        },
      });
      const updateProfile = await ctx.prisma.profile.update({
        where: { prf_id: user?.usr_profile },
        data: {
          prf_name: input.name,
          prf_lastname: input.lastname,
          prf_phone: input.phone,
        },
      });

      if (!updateUser || !updateProfile) {
        throw new Error("No se pudo actualizar el usuario");
      }

      return {
        user: updateUser,
        profile: updateProfile,
      }
      
    }),
});
