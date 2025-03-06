import NotFound from "@/app/not-found";
import DataTable from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLead } from "@/config/api-request";

export default async function Home() {
  const data = await getLead();

  if (!data) return <NotFound />;

  return (
    <div className=" w-[75vw] min-h-[100vh] px-4 py-2 mb-10">
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle className="text-2xl">Total Lead:</CardTitle>
        </CardHeader>
        <CardDescription>
          <CardContent className="text-2xl font-semibold">
            {data.totalLead}
          </CardContent>
        </CardDescription>
      </Card>
      <DataTable leads={data.leads} />
    </div>
  );
}
