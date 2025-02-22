"use client";

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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { TableListResType } from "@/schemaValidations/table.schema";
import { useDeleteTableMutation, useTableListQuery } from "@/queries/useTable";
import { getVietnameseTableStatus, handleErrorApi } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Input } from "@repo/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { toast } from "@repo/ui/hooks/use-toast";
import AddTable from "@/app/[locale]/manage/tables/add-table";
import EditTable from "@/app/[locale]/manage/tables/edit-table";
import AutoPagination from "@/components/molecules/auto-pagination";
import QRCodeTable from "@/app/[locale]/manage/tables/qrcode-table";
import SearchParamsLoader, {
  useSearchParamsLoader,
} from "@/components/atoms/search-params-loader";
import useTable from "@/store/table";

type TableItem = TableListResType["data"][0];

const AlertDialogDeleteTable = ({
  tableDelete,
  setTableDelete,
}: {
  tableDelete: TableItem | undefined;
  setTableDelete: (value: TableItem | undefined) => void;
}) => {
  const t = useTranslations("Tables");
  const tAll = useTranslations("All");

  const { mutateAsync } = useDeleteTableMutation();
  const deleteTable = async () => {
    if (tableDelete) {
      try {
        const result = await mutateAsync(tableDelete.number);
        setTableDelete(undefined);
        toast({
          title: result.payload.message,
        });
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    }
  };
  return (
    <AlertDialog
      open={Boolean(tableDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setTableDelete(undefined);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteTable")}</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="bg-foreground text-primary-foreground rounded px-1">
              {t("deleteDescription", {
                number: tableDelete?.number,
              })}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tAll("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTable}>
            {tAll("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const PAGE_SIZE = 10;

const TableTable = () => {
  const t = useTranslations("Tables");
  const tAll = useTranslations("All");

  const { searchParams, setSearchParams } = useSearchParamsLoader();
  const page = searchParams?.get("page")
    ? Number(searchParams?.get("page"))
    : 1;
  const pageIndex = page - 1;

  const { tableIdEdit, setTableIdEdit, tableDelete, setTableDelete } =
    useTable();

  const tableListQuery = useTableListQuery();
  const data = tableListQuery.data?.payload.data ?? [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE,
  });

  const columns: ColumnDef<TableItem>[] = useMemo(() => {
    return [
      {
        accessorKey: "number",
        header: t("table.tableNumber"),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("number")}</div>
        ),
        filterFn: (rows, _, filterValue) => {
          if (!filterValue) return true;
          return String(filterValue) === String(rows.getValue("number"));
        },
      },
      {
        accessorKey: "capacity",
        header: t("table.capacity"),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("capacity")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: t("table.status"),
        cell: ({ row }) => (
          <div>{tAll(getVietnameseTableStatus(row.getValue("status")))}</div>
        ),
      },
      {
        accessorKey: "token",
        header: t("table.qrCode"),
        cell: ({ row }) => (
          <div>
            <QRCodeTable
              token={row.getValue("token")}
              tableNumber={row.getValue("number")}
            />
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: function Actions({ row }) {
          const { setTableIdEdit, setTableDelete } = useTable();

          const openEditTable = () => {
            setTableIdEdit(row.original.number);
          };

          const openDeleteTable = () => {
            setTableDelete(row.original);
          };
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("table.actions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={openEditTable}>
                  {tAll("edit")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openDeleteTable}>
                  {tAll("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
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

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE,
    });
  }, [table, pageIndex]);

  return (
    <>
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <div className="w-full">
        <EditTable id={tableIdEdit} setId={setTableIdEdit} />
        <AlertDialogDeleteTable
          tableDelete={tableDelete}
          setTableDelete={setTableDelete}
        />
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder={tAll("searchValue", { value: t("table.tableNumber") })}
            value={
              (table.getColumn("number")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              table.getColumn("number")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
          <div className="ml-auto flex items-center gap-2">
            <AddTable />
          </div>
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
                    {tAll("noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-xs text-muted-foreground py-4 flex-1 ">
            {tAll("showResultPagination", {
              result: table.getPaginationRowModel().rows.length,
              total: data.length,
            })}
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/manage/tables"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableTable;
