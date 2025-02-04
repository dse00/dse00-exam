'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { QuestionType } from '@/types/question';

export type QuestionColumn = QuestionType;

export const questionColumn: ColumnDef<QuestionColumn>[] = [
  {
    accessorKey: '_id',
    header: () => <div className='hidden'>_id</div>,
    cell: ({ row }) => <div className='capitalize hidden'>{row.getValue('_id')}</div>,
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          subject
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('subject')}</div>,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          year
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('year')}</div>,
  },
  {
    accessorKey: 'questionNo',
    header: () => <div className='text-right'>questionNo</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.getValue('questionNo')}</div>;
    },
  },
  {
    accessorKey: 'answer',
    header: () => <div className='text-right'>answer</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.getValue('answer')}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className='text-right'>Created At</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>{moment(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm')}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white p-4 shadow-lg grid gap-2 z-50 rounded-sm'>
            <DropdownMenuItem className='cursor-pointer'>
              <Link href={`/self/${row.original._id}`}>View</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
