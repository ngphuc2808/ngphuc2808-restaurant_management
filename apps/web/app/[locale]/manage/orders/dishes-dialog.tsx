"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
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

import { DishListResType } from "@/schemaValidations/dish.schema";
import { useDishListQuery } from "@/queries/useDish";
import {
  formatCurrency,
  getVietnameseDishStatus,
  simpleMatchText,
} from "@/lib/utils";
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
import AutoPagination from "@/components/molecules/auto-pagination";

type DishItem = DishListResType["data"][0];

const PAGE_SIZE = 10;

const DishesDialog = ({ onChoose }: { onChoose: (dish: DishItem) => void }) => {
  const tAll = useTranslations("All");

  const [open, setOpen] = useState(false);
  const dishListQuery = useDishListQuery();
  const data = dishListQuery.data?.payload.data ?? [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const columns: ColumnDef<DishItem>[] = useMemo(() => {
    return [
      {
        id: "dishName",
        header: "Món ăn",
        cell: ({ row }) => (
          <div className="flex items-center space-x-4">
            <Image
              src={row.original.image}
              alt={row.original.name}
              width={50}
              height={50}
              className="rounded-md object-cover w-[50px] h-[50px]"
            />
            <span>{row.original.name}</span>
          </div>
        ),
        filterFn: (row, _, filterValue: string) => {
          if (filterValue === undefined) return true;
          return simpleMatchText(
            String(row.original.name),
            String(filterValue),
          );
        },
      },
      {
        accessorKey: "price",
        header: "Giá cả",
        cell: ({ row }) => (
          <div className="capitalize">
            {formatCurrency(row.getValue("price"))}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: tAll("status"),
        cell: ({ row }) => (
          <div>{tAll(getVietnameseDishStatus(row.getValue("status")))}</div>
        ),
      },
    ];
  }, []);

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

  const choose = (dish: DishItem) => {
    onChoose(dish);
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
          <DialogTitle>Chọn món ăn</DialogTitle>
        </DialogHeader>
        <div>
          <div className="w-full">
            <div className="flex items-center py-4 gap-2">
              <Input
                placeholder="Lọc tên"
                value={
                  (table.getColumn("dishName")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("dishName")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
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
                        onClick={() => choose(row.original)}
                        className="cursor-pointer"
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
                        colSpan={columns.length}
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

export default DishesDialog;
