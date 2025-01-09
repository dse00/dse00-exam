"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, Trash2 } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { UserAnswerType } from "@/types/userAnswer"
import { useUserAnswer } from "@/hooks"
import Link from "next/link"



export const columns: ColumnDef<UserAnswerType>[] = [
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
        accessorKey: "questionNo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    題號
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("questionNo")}</div>,
    },
    {
        accessorKey: "topic",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hidden sm:flex"
                >
                    主題
                    <ArrowUpDown />
                </Button>
            )
        }, cell: ({ row }) => (
            <div className="capitalize hidden sm:block ml-4">{row.getValue("topic")}</div>
        ),
    },
    {
        accessorKey: "correct",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    評分
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isCorrect = row.getValue("correct")
            return <div className="pl-4">{isCorrect ? <span className="text-green-500">正確</span> : '錯誤'}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const answer = row.original
            const { deleteUserAnswer } = useUserAnswer();

            const deleteRecord = (id: string) => {
                deleteUserAnswer(id)
            }


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem>
                            <Link href={`/exam/user/${answer.question._id}`} >
                                查看題目
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteRecord(answer._id)}>刪除記錄</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function RecordTable({ data }: { data: UserAnswerType[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const { deleteUserAnswer } = useUserAnswer()
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const toDeleteAll = (ids: string[]) => {
        const confirm = window.confirm(`確定刪除 ${ids.length} 條記錄嗎?`)
        if (!confirm) return
        ids.forEach(id => {
            deleteUserAnswer(id)
        })
    }


    const selectedQuestionIdArray = Object.entries(rowSelection)?.filter(([key, value]) => value)?.map(([key, value]) => data[parseInt(key)]?.question._id)

    const selectedAnswerIdArray = Object.entries(rowSelection)?.filter(([key, value]) => value).map(([key, value]) => data[parseInt(key)]?._id)

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
    })

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="搜尋"
                    value={(table.getColumn("questionNo")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("questionNo")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    {
                        selectedQuestionIdArray.length > 0 && <Link className={buttonVariants({ variant: 'default' })} href={`/exam/user/${selectedQuestionIdArray.join('/')}`}>查看點選題目</Link>

                    }
                    <Button variant={'ghost'} disabled={selectedQuestionIdArray.length === 0} onClick={() => toDeleteAll(selectedAnswerIdArray)}>
                        <Trash2 />
                    </Button>
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
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
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
                                    暫時沒有東西
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {
                        table.getFilteredSelectedRowModel().rows.length > 0 &&
                        <>
                            {table.getFilteredSelectedRowModel().rows.length} /{" "}
                            {table.getFilteredRowModel().rows.length} 已選擇
                        </>
                    }
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
