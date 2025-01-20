'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Angry, ArrowUpDown, CircleX, Eye, MoreHorizontal, Smile, Trash2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import ExportExamPdfButton from '@/app/(public)/[subject]/questions/_components/ExportExamPdfButton';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserAnswer } from '@/hooks';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { getDifficulty, getDifficultyStyle } from '@/lib/getDifficulty';
import { cn } from '@/lib/utils';
import services from '@/services';
import { useAppStore } from '@/store';
import { UserAnswerType } from '@/types/userAnswer';

export function RecordTable({ data }: { data: UserAnswerType[] }) {
  const { paperNameMappingData, displayNameKey } = usePaperNameMapping();
  const columns: ColumnDef<UserAnswerType>[] = [
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
      accessorKey: 'subject',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='sm:flex hidden px-0'
          >
            科目
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='sm:flex hidden'>
          <Badge variant={'outline'}>{row.getValue('subject')}</Badge>
        </div>
      ),
    },
    {
      accessorKey: 'topic',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='px-0'>
            主題
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className=''>{paperNameMappingData?.[row.getValue('topic') as string]?.[displayNameKey]}</div>;
      },
    },
    {
      accessorKey: 'correctPercentage',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='sm:flex hidden'
          >
            難度
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const difficulty = row.getValue('correctPercentage');

        return (
          <div className={cn(getDifficultyStyle(difficulty as number), 'pl-7')}>
            {getDifficulty(difficulty as number)
              .substring(0, 1)
              .toUpperCase()}
          </div>
        );
      },
    },
    {
      accessorKey: 'correct',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='px-0'>
            評分
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isCorrect = row.getValue('correct');

        return (
          <div className=''>
            {isCorrect ? (
              <div className='text-green-600 flex items-center gap-2'>
                <Smile size={'16'} />
                <span>正確</span>
              </div>
            ) : (
              <div className='flex items-center gap-2 opacity-70'>
                <Angry size={'16'} />
                <span>錯誤</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const answer = row.original;
        const { deleteUserAnswer } = useUserAnswer();

        const deleteRecord = (id: string) => {
          deleteUserAnswer(id);
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
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <Link href={`/${answer.question.subject}/questions/${answer.question._id}`}>
                <DropdownMenuItem>
                  <Eye />
                  <span>查看題目</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deleteRecord(answer._id)}>
                <CircleX />
                刪除記錄
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const { invalidateUserAnswersQuery } = useUserAnswer();
  const { setLoading } = useAppStore();

  const toDeleteAll = async (ids: string[]) => {
    const confirm = window.confirm(`確定刪除 ${ids.length} 條記錄嗎?`);
    if (!confirm) return;
    setLoading(true);

    for (const id of ids) {
      await services.deleteUserAnswer(id);
    }
    invalidateUserAnswersQuery();
    setLoading(false);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const selectedQuestionIdArray = Object.entries(table.getState().rowSelection)
    ?.filter(([key, value]) => value)
    ?.map(([key, value]) => data[parseInt(key)]?.question._id);

  const selectedAnswerIdArray = Object.entries(table.getState().rowSelection)
    ?.filter(([key, value]) => value)
    .map(([key, value]) => data[parseInt(key)]?._id);

  const handleToDeleteAll = async () => {
    await toDeleteAll(selectedAnswerIdArray);
    table.setRowSelection({});
  };

  return (
    <BaseTable
      data={data}
      columns={columns}
      filter={{
        key: 'topic',
        name: '題號',
      }}
      table={table}
      batchActionButton={
        <div className='flex gap-2 flex-row-reverse sm:flex-row'>
          {selectedQuestionIdArray.length > 0 && (
            <>
              <ExportExamPdfButton questionsId={selectedQuestionIdArray} />
              <Link
                className={buttonVariants({ variant: 'default' })}
                href={`/exam/user/${selectedQuestionIdArray.join('/')}`}
              >
                <Eye />
                查看點選題目
              </Link>
            </>
          )}
          <Button variant={'ghost'} disabled={selectedQuestionIdArray.length === 0} onClick={handleToDeleteAll}>
            <Trash2 />
          </Button>
        </div>
      }
    />
  );
}
