import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card className="w-[30vw] mt-4">
      <CardHeader>
        <CardTitle className="flex justify-center">Not Found</CardTitle>
      </CardHeader>
      <CardDescription className="flex justify-center">
        Could not find requested resource
      </CardDescription>
      <Button>
        <Link href="/">Return Home</Link>
      </Button>
    </Card>
  );
}
