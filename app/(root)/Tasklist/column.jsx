"use client";


import { ArrowUpDown } from "lucide-react";

const Button = ({ children, variant, onClick }) => (
    <button
      className={`p-2 ${variant === "ghost" ? "bg-transparent" : "bg-blue-500 text-white"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );


// This type is used to define the shape of our data.
export const columns = [
  {
    accessorKey: "title", // Ensure your data has this key
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status", // Ensure your data has this key and matches the casing
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const titleA = rowA.getValue("status").toLowerCase();
      const titleB = rowB.getValue("status").toLowerCase();
      
      // Custom sorting logic, e.g., alphabetical order
      if (titleA == 'to do' && titleB == 'in progress') return 1; // A should come before B
      else if (titleA == 'to do' && titleB == 'completed') return 1;  // A should come after B
      else if (titleA == 'in progress' && titleB == 'completed') return 1;
      else return -1;
    },
  },
  {
    accessorKey : "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const titleA = rowA.getValue("priority").toLowerCase();
      const titleB = rowB.getValue("priority").toLowerCase();
      
      // Custom sorting logic, e.g., alphabetical order
      if (titleA == 'low' && titleB == 'medium') return 1; // A should come before B
      else if (titleA == 'low' && titleB == 'high') return 1;  // A should come after B
      else if (titleA == 'medium' && titleB == 'high') return 1;
      else return -1;
    },
  },
  {
    accessorKey : "dueDate",
    header: "Date",
  },
];
