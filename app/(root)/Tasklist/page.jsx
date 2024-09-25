import Tasklist from "../../../components/shared/Tasklist";
import { columns } from "./column";
import { DataTable } from "./data-table";

async function getData() {
  return [
    {
      title: "Task 1", // This key should match the `accessorKey` in the columns
      status: "To Do", // This should match the accessor key "status",
      priority: "Low",
      date : "2024-25-23"
    },
    {
      title: "Task 2",
      status: "To Do",
      priority: "Medium",
      date : "null"
    },
    {
      title: "Task 3",
      status: "Progress",
      priority: "Low",
      date : "2024-12-5"
    },
    {
      title: "Task 3",
      status: "Completed",
      priority: "High",
      date : "2024-12-5"
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <div className="my-28">
        <Tasklist />
      </div>
    </div>
  );
}
