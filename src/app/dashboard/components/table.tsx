"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from '@/components/ui/loader';
import { ShareModal } from './share-modal';
import { MdFileDownload } from 'react-icons/md';
import { deletePdfs } from "../api/delete-pdfs";
import { toast } from "react-toastify";
import signPdf from '../api/sign-pdf';
import LoadingIcons from 'react-loading-icons'

export type TableMetaData = {
  file_id: string,
  filename: string;
  shared_to: {};
};

const viewPDF = async (file_id: string, setLoading: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs?file_id=${file_id}`;
    const userJson = localStorage.getItem('user');

    if (!userJson) {
      throw new Error('User data not found in localStorage');
    }

    const user = JSON.parse(userJson);
    const accessToken: string = user.stsTokenManager.accessToken;

    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': accessToken },
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      setLoading(false)
    } else {
      throw new Error('Network response was not ok.');
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

export const columns_all: ColumnDef<TableMetaData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'view/downloadPDF',
    header: () => <div className="text-center">Download or<br></br>view PDF</div>,
    cell: ({ row }) => {
      const [loading, setLoading] = React.useState(false)
      return (
        <div className="flex justify-center">
          {loading ? <LoadingIcons.TailSpin stroke="#000000" height='24' width='24' /> : <MdFileDownload className="cursor-pointer" size={20} onClick={() => {
            setLoading(true)
            viewPDF(row.original.file_id, setLoading)
          }} />}
        </div>
      )
    }
  },
  {
    accessorKey: "filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("filename")}</div>,
  },
  {
    accessorKey: 'signButton',
    header: () => <div className="text-center">Sign</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Button className="p-4 bg-blue-500 text-white text-md rounded-lg" onClick={() => signPdf(row.original.file_id, row.original.filename)}>Sign PDF</Button>
        </div>
      )
    }
  },
  {
    accessorKey: 'shareButton',
    header: () => <div className="text-center">Send for signing</div>,
    cell: ({ row }) => {
      const [showPopup, setShowPopup] = React.useState(false);
      const sharePdf = () => {
        setShowPopup(true);
      }
      return (
        <div className="flex justify-center">
          <Button className="p-4 bg-blue-500 text-white text-md rounded-lg" onClick={sharePdf}>Share PDF</Button>
          {showPopup && <ShareModal fileId={row.original.file_id} fileName={row.original.filename} sharedTo={row.original.shared_to} onClose={() => setShowPopup(false)} />}
        </div>
      )
    }
  }
];

export const columns_to_sign: ColumnDef<TableMetaData>[] = [
  {
    accessorKey: 'view/downloadPDF',
    header: () => <div className="text-center">Download or<br></br>view PDF</div>,
    cell: ({ row }) => {
      const [loading, setLoading] = React.useState(false)
      return (
        <div className="flex justify-center">
          {loading ? <LoadingIcons.TailSpin stroke="#000000" height='24' width='24' /> : <MdFileDownload className="cursor-pointer" size={20} onClick={() => {
            setLoading(true)
            viewPDF(row.original.file_id, setLoading)
          }} />}

        </div>
      )
    }
  },
  {
    accessorKey: "filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("filename")}</div>,
  },
  {
    accessorKey: 'signButton',
    header: () => <div className="text-center">Sign</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Button className="p-4 bg-blue-500 text-white text-md rounded-lg" onClick={() => signPdf(row.original.file_id, row.original.filename)}>Sign Pdf</Button>
        </div>
      )
    }
  },
];

export const DataTable = ({ data, selected_option }: { data: TableMetaData[], selected_option: string }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  type RowSelectionState = Record<number, boolean>;
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  var columns: ColumnDef<TableMetaData>[] = [];

  if (selected_option == "Added Documents") {
    columns = columns_all;
  } else if (selected_option === "Documents to be signed") {
    columns = columns_to_sign;
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDeletePdf = async () => {
    const selectedRowIds: number[] = Object.keys(rowSelection).map(Number);
    const selectedPdfIds: string[] = [];
    if (selectedRowIds.length > 0) {
      for (const id of selectedRowIds) {
        selectedPdfIds.push(data[id].file_id);
      }
      await deletePdfs(selectedPdfIds);
      toast.success('Deleted please reload!');
    } else {
      toast.warning('No rows selected!');
    }
  }

  return (
    <div className="w-full p-5">
      <div className="flex py-4">
        <input
          placeholder="Search pdf..."
          value={(table.getColumn("filename")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("filename")?.setFilterValue(event.target.value)
          }
          className="border bg-gray-100 rounded-md px-5 outline-none text-gray-800 text-sm flex-1 max-w-sm"
        />
        {selected_option == "Added Documents" ?
          <Button className="ml-4" onClick={handleDeletePdf}> Delete selected pdfs</Button> : <div></div>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader />
                  <div className="m-2"></div>
                  Loading your pdfs
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
