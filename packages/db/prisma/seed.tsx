import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {
  const createProfile = await prisma.profile.create({
    data: {
      prf_name: "PruebaSeed",
      prf_lastname: "PruebaSeed",
      prf_phone: "-56999999999",
    },
  });
  const user = await prisma.user.create({
    data: {
      usr_email: "pruebaSeed@prueba.com",
      usr_pass: "asdasd123123",
      usr_vip: false,
      profile: {
        connect: {
          prf_id: createProfile.prf_id,
        },
      },
    },
  });
  const profileDelivery = await prisma.profile.create({
    data: {
      prf_name: "DeliveryMan",
      prf_lastname: "DeliveryMan",
      prf_phone: "-56999999999",
    },
  });
  const userdelivery = await prisma.user.create({
    data: {
      usr_email: "DeliveryMan@prueba.com",
      usr_pass: "asdasd123123",
      usr_vip: false,
      profile: {
        connect: {
          prf_id: profileDelivery.prf_id,
        },
      },
    },
  });
  const product1 = await prisma.product.create({
    data: {
      prod_name: "product1",
      prod_date_expir: new Date(),
      prod_date_pack: new Date(),
      prod_status: "status",
      prod_image: "image",
      prod_brand: "brand",
      prod_price: 100,
      prod_description: "description",
      prod_quantity: 100,
      prod_tablet: "tablet",
      prod_detail: "detail",
      prod_category: "category",
    },
  });
  const product2 = await prisma.product.create({
    data: {
      prod_name: "product2",
      prod_date_expir: new Date(),
      prod_date_pack: new Date(),
      prod_status: "status",
      prod_image: "image",
      prod_brand: "brand2",
      prod_price: 100,
      prod_description: "description2",
      prod_quantity: 100,
      prod_tablet: "tablet2",
      prod_detail: "detail2",
      prod_category: "category2",
    },
  });
  const orderDetail1 = await prisma.orderDetail.create({
    data: {
      order_det_total: 100,
      order_det_recipe: true,
      ProductOrderDetail: {
        create: {
          quantity: 50,
          Product: {
            connect: {
              prod_id: product1.prod_id,
            },
          },
        },
      },
    },
  });
  const orderDetail2 = await prisma.orderDetail.create({
    data: {
      order_det_total: 200,
      order_det_recipe: true,
      ProductOrderDetail: {
        create: {
          quantity: 100,
          Product: {
            connect: {
              prod_id: product2.prod_id,
            },
          },
        },
      },
    },
  });
  await prisma.order.create({
    data: {
      user: {
        connect: {
          usr_id: user.usr_id,
        },
      },
      delivery_user: {
        connect: {
          usr_id: userdelivery.usr_id,
        },
      },
      order_location: "Temuco",
      OrderDetail: {
        connect: {
          order_det_id: orderDetail1.order_det_id,
        },
      },
    },
  });
  await prisma.order.create({
    data: {
      user: {
        connect: {
          usr_id: user.usr_id,
        },
      },
      delivery_user: {
        connect: {
          usr_id: userdelivery.usr_id,
        },
      },
      order_location: "Santiago",
      OrderDetail: {
        connect: {
          order_det_id: orderDetail2.order_det_id,
        },
      },
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
