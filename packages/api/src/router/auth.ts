import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        pass: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { usr_email: input.email },
      });

      if (!user) {
        throw new Error("No existe el usuario");
      }

      const passwordMatches = await bcrypt.compare(input.pass, user.usr_pass);

      if (!passwordMatches) {
        throw new Error("Email o contraseña incorrectos");
      }

      const token = jwt.sign(
        { userId: user.usr_id },
        process.env.ACCESS_JWT_TOKEN as string,
      );
      return {
        token,
        user,
      };
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        lastname: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { usr_email: input.email },
      });

      if (existingUser) {
        throw new Error("Ya existe un usuario con ese email");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const createProfile = await ctx.prisma.profile.create({
        data: {
          prf_name: input.name,
          prf_lastname: input.lastname,
          prf_phone: input.phone,
        },
      });
      const user = await ctx.prisma.user.create({
        data: {
          usr_email: input.email,
          usr_pass: hashedPassword,
          usr_vip: false,
          profile: {
            connect: {
              prf_id: createProfile.prf_id,
            },
          },
        },
      });

      const token = jwt.sign(
        { userId: user.usr_id },
        process.env.ACCESS_JWT_TOKEN as string,
      );
      return {
        token,
        user,
      };
    }),
  checkSession: protectedProcedure.mutation(({ ctx }) => {
    const { userId } = ctx;
    return {
      error: false,
      userId,
    };
  }),
});
