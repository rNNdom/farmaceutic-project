import { z } from "zod";

import {
  createTRPCRouter,
  protectedDeliveryProcedure,
  publicProcedure,
} from "../trpc";

export const orderRouter = createTRPCRouter({
  //create me a procedure that gets me all the orders even when order_delivery is null

  getOrdersForTable: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      include: {
        user: {
          select: {
            profile: true,
          },
        },
        delivery_user: {
          select: {
            profile: true,
          },
        },
        OrderDetail: {
          include: {
            ProductOrderDetail: {
              include: {
                Product: true,
              },
            },
          },
        },
      },
    });

    return orders.map((order) => {
      const {
        order_id,
        order_status,
        user: {
          profile: { prf_name: userName },
        },
        delivery_user,
        OrderDetail: [{ order_det_total } = {} as { order_det_total: number }],
      } = order;

      const deliveryUserName = delivery_user
        ? delivery_user.profile.prf_name
        : "Sin asignar";

      return {
        order_id,
        order_status,
        user_name: userName,
        delivery_user_name: deliveryUserName,
        order_det_total,
      };
    });
  }),

  getOrder: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: { order_id: input.id },
        include: {
          user: {
            select: {
              usr_vip: true,
              usr_email: true,
              profile: true,
            },
          },
          delivery_user: {
            select: {
              profile: true,
              usr_email: true,
            },
          },
          OrderDetail: true,
        },
      });
      return order;
    }),
  getProdDetails: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.productOrderDetail.findMany({
        where: { orderDetailId: input.id },
        include: {
          Product: true,
        },
      });
      return order;
    }),
  getAllOrder: publicProcedure
    .input(
      z.object({
        idCustomer: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findMany({
        where: { order_customer: input.idCustomer },
        include: {
          user: {
            select: {
              usr_vip: true,
              usr_email: true,
              profile: true,
            },
          },
          delivery_user: {
            select: {
              profile: true,
              usr_email: true,
            },
          },
          OrderDetail: true,
        },
      });

      return order;
    }),
  getAllOrdersByDeliverId: publicProcedure
    .input(
      z.object({
        idDeliver: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findMany({
        where: { order_delivery: input.idDeliver },
        orderBy: { order_date_of_ord: "asc" },
        include: {
          user: {
            select: {
              usr_vip: true,
              usr_email: true,
              profile: true,
            },
          },
          OrderDetail: true,
        },
      });

      return order;
    }),
  getAllOrderforDeliver: publicProcedure
    .input(
      z.object({
        idDeliver: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findMany({
        where: {
          OR: [
            {
              order_delivery: null,
            },
            {
              order_delivery: input.idDeliver,
            },
          ],
          NOT:{
            order_status: "DELIVERED"
          }
        },
        orderBy: { order_date_of_ord: "asc" },
        include: {
          user: {
            select: {
              usr_vip: true,
              usr_email: true,
              profile: true,
            },
          },
          OrderDetail: true,
        },
      });

      return order;
    }),
  getLastOrder: publicProcedure
    .input(
      z.object({
        idCustomer: z.number(),
      }),
    )

    .query(async ({ ctx, input }) => {
      return await ctx.prisma.order.findFirst({
        where: { order_customer: input.idCustomer },
        orderBy: { order_date_of_ord: "desc" },
        include: {
          OrderDetail: true,
          delivery_user: {
            select: {
              usr_email: true,
              profile: {
                select: {
                  prf_lastname: true,
                  prf_name: true,
                  prf_phone: true,
                },
              },
            },
          },
        },
      });
    }),
  getLastDeliverOrder: publicProcedure
    .input(
      z.object({
        idDeliver: z.number(),
      }),
    )

    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findFirst({
        where: { order_delivery: input.idDeliver },
        orderBy: { order_date_of_ord: "desc" },
        include: {
          OrderDetail: true,
          user: {
            select: {
              usr_email: true,
              profile: {
                select: {
                  prf_lastname: true,
                  prf_name: true,
                  prf_phone: true,
                },
              },
            },
          },
        },
      });
      if (!order) {
        throw new Error("No se encontraron pedidos");
      }

      return order;
    }),
  updateOrder: protectedDeliveryProcedure
    .input(
      z.object({
        idOrder: z.number(),
        idDeliver: z.number().nullable(),
        status: z.enum(["PENDING", "DELIVERING", "DELIVERED", "CANCELED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const dataToUpdate = {
        order_status: input.status,
        delivery_user: {},
      };

      if (input.idDeliver !== null) {
        dataToUpdate.delivery_user = {
          connect: {
            usr_id: input.idDeliver,
          },
        };
      } else {
        dataToUpdate.delivery_user = {
          disconnect: true,
        };
      }
      console.log(dataToUpdate);

      const updateOrders = await ctx.prisma.order.update({
        where: { order_id: input.idOrder },
        data: dataToUpdate,
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
      const order = await ctx.prisma.order.delete({
        where: { order_id: input.id },
      });

      if (!order) {
        throw new Error("No se pudo eliminar el pedido");
      }

      return {
        orders: order,
      };
    }),
  createOrder: publicProcedure
    .input(
      z.object({
        user_id: z.number(),
        total: z.number(),
        recipe: z.boolean(),
        location: z.string(),
        products: z.array(
          z.object({
            quantity: z.number(),
            prod_id: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createOrder = await ctx.prisma.order.create({
        data: {
          user: {
            connect: {
              usr_id: input.user_id,
            },
          },
          order_location: input.location,
          OrderDetail: {
            create: {
              order_det_total: input.total,
              order_det_recipe: input.recipe,
              ProductOrderDetail: {
                createMany: {
                  data: input.products.map((product) => ({
                    quantity: product.quantity,
                    productId: product.prod_id,
                  })),
                },
              },
            },
          },
        },
      });

      if (!createOrder) {
        throw new Error("No se pudo crear el pedido");
      }

      return {
        orders: createOrder,
      };
    }),
});
