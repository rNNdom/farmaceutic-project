import { z } from "zod";

import {
  createTRPCRouter,
  protectedDeliveryProcedure,
  publicProcedure,
} from "../trpc";

export const orderRouter = createTRPCRouter({
  getOrdersForTable: publicProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      orderBy: { order_date_of_ord: "desc" },
      include: {
        user: {
          select: {
            profile: true,
            usr_vip: true,
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
    const parseOrderStatus = (status: any) => {
      switch (status) {
        case "PENDING":
          return "Pendiente";
        case "DELIVERING":
          return "En camino";
        case "DELIVERED":
          return "Entregado";
        case "CANCELED":
          return "Cancelado";
        default:
          return "Pendiente";
      }
    };
    const checkIs15Minutes = (date: Date) => {
      const dateNow = new Date();
      const dateOrder = new Date(date);
      const diff = dateNow.getTime() - dateOrder.getTime();
      const minutes = Math.floor(diff / 60000);
      return minutes >= 15;
    };
    return orders.map((order) => {
      const {
        order_customer,
        order_id,
        order_status,
        user: {
          profile: { prf_name: userName },
          usr_vip,
        },
        delivery_user,
        OrderDetail: [{ order_det_total } = {} as { order_det_total: number }],
        order_date_of_ord,
      } = order;

      const deliveryUserName = delivery_user
        ? delivery_user.profile.prf_name
        : "Sin asignar";

      const orderStatus = parseOrderStatus(order_status);
      return {
        order_customer,
        order_id,
        order_status: orderStatus,
        user_name: userName,
        delivery_user_name: deliveryUserName,
        order_det_total,
        order_late: usr_vip
          ? checkIs15Minutes(order_date_of_ord) && order_status != "DELIVERED"
            ? "late"
            : "on_time"
          : "not_vip",
        order_time: order_date_of_ord,
        usr_vip,
      };
    });
  }),
  getAllOrdersDates: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.order.findMany({
      orderBy: { order_date_of_ord: "desc" },
      select: {
        order_date_of_ord: true,
        OrderDetail: {
          select: {
            order_det_total: true,
          },
        },
      },
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
  getOrderDetails: publicProcedure
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
      const userData = await ctx.prisma.order.findMany({
        where: { order_id: input.id },
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
        },
      });
      const profileUser = userData.map((order) => order.user.profile);
      const profileDelivery = userData.map((order) => order.delivery_user);
      const orderData =
        order.map((item) => {
          return {
            prod_id: item.Product.prod_id,
            prod_name: item.Product.prod_name,
            prod_price: item.Product.prod_price,
            quantity: item.quantity,
            prod_recipe: item.Product.prod_recipe,
          };
        }) ?? [];
      const data = {
        orderData,
        profileUser,
        profileDelivery,
      };
      return data;
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
        orderBy: { order_date_of_ord: "desc" },
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
        orderBy: { order_date_of_ord: "desc" },
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
          NOT: {
            order_status: "DELIVERED",
          },
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
