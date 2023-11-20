"use client";

import withAuth from "~/components/withAuth";
import ProfileInfo from "../../components/ProfileInfo";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

function ProfilePage() {
  return (
    <div className="flex justify-center p-10">
      <Card className="flex w-6/12 flex-col">
        <CardHeader>
          <h1 className="mb-8 mt-3 text-2xl font-semibold">Perfil</h1>
        </CardHeader>
        <CardContent>
          <ProfileInfo />
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ProfilePage);
