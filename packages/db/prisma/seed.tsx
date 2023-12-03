import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {

  // await prisma.order.create({
  //   data: {
  //     user: {
  //       connect: {
  //         usr_id: 16,
  //       },
  //     },
  //     delivery_user: {
  //       connect: {
  //         usr_id: 13,
  //       },
  //     },
  //     order_location: "Temuco",
  //     OrderDetail: {
  //       create: {
  //         order_det_total: 19824,
  //         order_det_recipe: false,
  //         ProductOrderDetail: {
  //           create: {
  //             quantity: 4,
  //             Product: {
  //               connect: {
  //                 prod_id: 81,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     }
  //   },
  // });
  await prisma.order.update({
    where: {
      order_id: 39,
    },
    data: {
      order_status: "DELIVERED",
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