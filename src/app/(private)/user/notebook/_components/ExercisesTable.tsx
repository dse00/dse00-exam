'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useExercise } from '@/hooks/useExercise';
import { ExerciseListItemType } from '@/types/exercise';

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
            className={buttonVariants({ size: 'sm' })}
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
  return <BaseTable columns={columns} data={data} filter='exerciseName' />;
}
