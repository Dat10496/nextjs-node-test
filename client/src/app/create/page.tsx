import CreateLeadForm from "@/components/create-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

function CreatePage() {
  return (
    <div className=" w-[75vw] min-h-[100vh] px-4 flex justify-center py-10">
      <div className="flex w-full max-w-sm flex-col gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center">
              CREATE LEAD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CreateLeadForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CreatePage;
