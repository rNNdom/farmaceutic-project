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
  getDeliversData: publicProcedure.query(async ({ ctx }) => {
    const profiles = await ctx.prisma.user.findMany({
      where: { usr_role: "DELIVER" },
      select: {
        usr_status: true,
        profile: {
          select: {
            prf_name: true,
            prf_phone: true,
          },
        },
        Order_Delivery: {
          where: { order_status: "DELIVERED" },
          select: {
            OrderDetail: true,
          },
        },
      },
    });
    const parseUserStatus = (status: string) => {
      switch (status) {
        case "UNAVAILABLE":
          return "Sin disponibilidad";
        case "DELIVERING":
          return "En entrega";
        case "AVAILABLE":
          return "Disponible";
        default:
          return "Usuario normal";
      }
    };
    return profiles.map((profile) => {
      const {
        usr_status,
        profile: { prf_name, prf_phone },
        Order_Delivery,
      } = profile;
      const orderStatus = parseUserStatus(usr_status);

      const totalOrders = Order_Delivery.length;
      return {
        usr_status: orderStatus,
        prf_name,
        prf_phone,
        totalOrders,
      };
    });
  }),
});
