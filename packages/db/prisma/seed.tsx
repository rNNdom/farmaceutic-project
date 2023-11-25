import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {

  await prisma.order.create({
    data: {
      user: {
        connect: {
          usr_id: 12,
        },
      },
      delivery_user: {
        connect: {
          usr_id: 13,
        },
      },
      order_location: "Santiago",
      OrderDetail: {
        create: {
          order_det_total: 2000,
          order_det_recipe: true,
          ProductOrderDetail: {
            create: {
              quantity: 2,
              Product: {
                connect: {
                  prod_id: 77,
                },
              },
            },
          },
        },
      }
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
