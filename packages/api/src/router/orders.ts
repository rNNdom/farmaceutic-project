import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
  updateOrder: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["PENDING", "DELIVERING", "DELIVERED", "CANCELED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateOrders = await ctx.prisma.order.update({
        where: { order_id: input.id },
        data: {
          order_status: input.status,
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
  createOrders: publicProcedure
    .input(
      z.object({
        prod_id: z.number(),
        quantity: z.number(),
        total: z.number(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //crear primero el orderDetail y dps el order
      const createOrderDetail = await ctx.prisma.orderDetail.create({
        data: {
          product: {
            connect: {
              prod_id : input.prod_id,
            }
          },
          order_det_quantity: input.quantity,
          order_det_total: input.total,
    
        },
      });
      const createOrders = await ctx.prisma.order.create({
        data: {
          OrderDetail: {
            connect: {
              order_det_id : createOrderDetail.order_det_id,
            }
          },
          order_location: input.location,
          
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
  