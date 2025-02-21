"use client";

import { useEffect, useState } from "react";

import { TableListResType } from "@/schemaValidations/table.schema";
import { useTableListQuery } from "@/queries/useTable";
import { getVietnameseTableStatus, simpleMatchText } from "@/lib/utils";
import { cn } from "@repo/ui/lib/utils";
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
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { TableStatus } from "@/constants/type";
import AutoPagination from "@/components/molecules/auto-pagination";

type TableItem = TableListResType["data"][0];

export const tablesColumns = () => {
  const columns: ColumnDef<TableItem>[] = [
    {
      accessorKey: "number",
      header: "Số bàn",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("number")}</div>
      ),
      filterFn: (row, columnId, filterValue: string) => {
        if (filterValue === undefined) return true;
        return simpleMatchText(
          String(row.original.number),
          String(filterValue),
        );
      },
    },
    {
      accessorKey: "capacity",
      header: "Sức chứa",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("capacity")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => (
        <div>{getVietnameseTableStatus(row.getValue("status"))}</div>
      ),
    },
  ];

  return columns;
};

const PAGE_SIZE = 10;

const TablesDialog = ({
  onChoose,
}: {
  onChoose: (table: TableItem) => void;
}) => {
  const [open, setOpen] = useState(false);
  const tableListQuery = useTableListQuery();
  const data = tableListQuery.data?.payload.data ?? [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const table = useReactTable({
    data,
    columns: tablesColumns(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const choose = (table: TableItem) => {
    onChoose(table);
    setOpen(false);
  };

  useEffect(() => {
    table.setPagination({
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    });
  }, [table]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thay đổi</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Chọn bàn</DialogTitle>
        </DialogHeader>
        <div>
          <div className="w-full">
            <div className="flex items-center py-4 gap-2">
              <Input
                placeholder="Số bàn"
                value={
                  (table.getColumn("number")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("number")?.setFilterValue(event.target.value)
                }
                className="w-[80px]"
              />
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
                                  header.getContext(),
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
                        onClick={() => {
                          if (
                            row.original.status === TableStatus.Available ||
                            row.original.status === TableStatus.Reserved
                          ) {
                            choose(row.original);
                          }
                        }}
                        className={cn({
                          "cursor-pointer":
                            row.original.status === TableStatus.Available ||
                            row.original.status === TableStatus.Reserved,
                          "cursor-not-allowed":
                            row.original.status === TableStatus.Hidden,
                        })}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={tablesColumns().length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-xs text-muted-foreground py-4 flex-1 ">
                Hiển thị{" "}
                <strong>{table.getPaginationRowModel().rows.length}</strong>{" "}
                trong <strong>{data.length}</strong> kết quả
              </div>
              <div>
                <AutoPagination
                  page={table.getState().pagination.pageIndex + 1}
                  pageSize={table.getPageCount()}
                  onClick={(pageNumber) =>
                    table.setPagination({
                      pageIndex: pageNumber - 1,
                      pageSize: PAGE_SIZE,
                    })
                  }
                  isLink={false}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TablesDialog;
