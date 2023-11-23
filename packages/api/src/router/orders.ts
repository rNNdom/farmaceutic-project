import { z } from "zod";

import { createTRPCRouter, protectedDeliveryProcedure, protectedProcedure, publicProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  getOrder: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findMany({
        where: { order_id: input.id },
      });
      return order;
    }),
  updateOrder: protectedDeliveryProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["PENDING", "DELIVERING", "DELIVERED", "CANCELED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deliverId = ctx.userId as string;
      const updateOrders = await ctx.prisma.order.update({
        where: { order_id: input.id },
        data: {
          order_status: input.status,
          delivery_user: {
            connect: {
              usr_id: parseInt(deliverId),
            },
          },
        },
      });

      if (!updateOrders) {
        throw new Error("No se pudo actualizar el pedido");
      }

      return {
        orders: updateOrders,
      };
    }),
  deleteOrders: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deleteOrders = await ctx.prisma.order.delete({
        where: { order_id: input.id },
      });

      if (!deleteOrders) {
        throw new Error("No se pudo eliminar el pedido");
      }

      return {
        orders: deleteOrders,
      };
    }),
  createOrder: publicProcedure
    .input(
      z.object({
        total: z.number(),
        recipe: z.boolean(),
        location: z.string(),
        product: z.object({
          quantity: z.number(),
          prod_id: z.number(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId as string;
      const createOrderDetail = await ctx.prisma.orderDetail.create({
        data: {
          order_det_total: input.total,
          order_det_recipe: input.recipe,
          ProductOrderDetail: {
            create: {
              quantity: input.product.quantity,
              Product: {
                connect: {
                  prod_id: input.product.prod_id,
                },
              },
            },
          },
        },
      });

      const createOrders = await ctx.prisma.order.create({
        data: {
          user: {
            connect: {
              usr_id: parseInt(userId),
            },
          },
          order_location: input.location,
          OrderDetail: {
            connect: {
              order_det_id: createOrderDetail.order_det_id,
            },
          },
        },
      });

      if (!createOrders) {
        throw new Error("No se pudo crear el pedido");
      }

      return {
        orders: createOrders,
      };
    }),
});
  