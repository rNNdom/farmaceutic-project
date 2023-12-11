"use client"
import withAuth from '~/components/withAuth'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import ProductDetails from '~/components/ProductDetails';

function page ({ params }: {
  params: { id: string }
}
) {
  const paramsId = Number(params.id);
  return (
    <>
      <div className=" flex-grow flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 py-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Detalle del producto
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="col-span-3">
                  <CardHeader className="px-8 pt-8">
                    <CardTitle>Productos:</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <ProductDetails orderId={paramsId} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default withAuth(page)