import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { fDateTimeSuffix } from "@/app/utils/formatTime";

const columns = [
  { id: "name", Header: "Name" },
  { id: "email", Header: "Email" },
  { id: "status", Header: "Status" },
  { id: "date", Header: "Date" },
];

type Leads = {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}[];

function DataTable(props: { leads: Leads }) {
  const { leads } = props;

  return (
    <div className="flex justify-start">
      <div className="rounded-md border mt-10 w-[60vw]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.Header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.status}</Badge>
                </TableCell>
                <TableCell>{fDateTimeSuffix(lead.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
