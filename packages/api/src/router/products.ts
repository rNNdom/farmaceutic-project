import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const productsRouter = createTRPCRouter({
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        where: { prod_id: input.id },
      });
      return products;
    }),
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),
  updateProducts: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        date_exp: z.date(),
        date_pack: z.date(),
        status: z.string(),
        image: z.string(),
        brand: z.string(),
        price: z.number(),
        description: z.string(),
        stock: z.number(),
        tablet: z.string(),
        detail: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateProducts = await ctx.prisma.product.update({
        where: { prod_id: input.id },
        data: {
          prod_name: input.name,
          prod_date_expir: input.date_exp,
          prod_date_pack: input.date_pack,
          prod_status: input.status,
          prod_image: input.image,
          prod_brand: input.brand,
          prod_price: input.price,
          prod_description: input.description,
          prod_quantity: input.stock,
          prod_tablet: input.tablet,
          prod_detail: input.detail,
          prod_category: input.category,
        },
      });

      if (!updateProducts) {
        throw new Error("No se pudo actualizar el producto");
      }

      return {
        products: updateProducts,
      };
    }),
  deleteProducts: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deleteProducts = await ctx.prisma.product.delete({
        where: { prod_id: input.id },
      });

      if (!deleteProducts) {
        throw new Error("No se pudo eliminar el producto");
      }

      return {
        products: deleteProducts,
      };
    }),
  createProducts: publicProcedure
    .input(
      z.object({
        name: z.string(),
        date_exp: z.date(),
        date_pack: z.date(),
        status: z.string(),
        image: z.string(),
        brand: z.string(),
        price: z.number(),
        description: z.string(),
        stock: z.number(),
        tablet: z.string(),
        detail: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createProducts = await ctx.prisma.product.create({
        data: {
          prod_name: input.name,
          prod_date_expir: input.date_exp,
          prod_date_pack: input.date_pack,
          prod_status: input.status,
          prod_image: input.image,
          prod_brand: input.brand,
          prod_price: input.price,
          prod_description: input.description,
          prod_quantity: input.stock,
          prod_tablet: input.tablet,
          prod_detail: input.detail,
          prod_category: input.category,
        },
      });

      if (!createProducts) {
        throw new Error("No se pudo ingresar el producto");
      }

      return {
        products: createProducts,
      };
    }),
});
