'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUserAnswer } from '@/hooks';
import { useExercise } from '@/hooks/useExercise';
import { ExerciseListItemType, ExerciseType } from '@/types/exercise';
import { UserAnswerType } from '@/types/userAnswer';

export const columns: ColumnDef<ExerciseListItemType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'exerciseName',
    header: '練習本名稱',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('exerciseName')}</div>,
  },
  {
    accessorKey: 'exerciseLength',
    header: '題數',
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue('exerciseLength')}</div>;
    },
  },
  {
    accessorKey: 'timeLimited',
    header: '時限',
    cell: ({ row }) => {
      return <div className='font-medium text-left'>{Math.ceil(row.getValue('timeLimited'))} 分鐘</div>;
    },
  },
  {
    id: 'button',
    header: () => <div className='text-center'>分數</div>,
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {row.original.score ? (
          <span>{row.original.score}</span>
        ) : (
          <Link
            href={`/exam/${row.original.subject}/exercise/${row.original._id}`}
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            開始
          </Link>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const exercise = row.original;
      const { deleteExercise } = useExercise();

      const toDeleteRecord = (id: string) => {
        const confirm = window.confirm('確定要刪除嗎?');
        if (confirm) {
          deleteExercise(id);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Link href={`/exam/${exercise.subject}/exercise/${exercise._id}`}>查看題目</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toDeleteRecord(exercise._id)}>刪除記錄</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ExercisesTable({ data }: { data: ExerciseListItemType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='搜尋'
          value={(table.getColumn('exerciseName')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('exerciseName')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  暫時沒有東西
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} 已選擇
            </>
          )}
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
