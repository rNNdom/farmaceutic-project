'use client'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import { UsersTable } from '~/components/UsersTable'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import withAuth from '~/components/withAuth'

function page () {
  return (
    <>
      <div className=" flex-grow flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 py-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Administración de Roles
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="col-span-3">
                  <CardHeader className="px-8 pt-8">
                    <CardTitle>Usuarios</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <UsersTable />
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