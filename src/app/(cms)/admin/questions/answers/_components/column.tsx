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

import { Button } from '@/components/ui/button';
import { useCmsPayment } from '@/hooks/cms/useCmsPayment';

export type AnswerColumn = {
  _id: string;
  createdAt: string;
  referenceId: string;
  message: string;
  status: string;
  subject: string;
};

export const answerColumn: ColumnDef<AnswerColumn>[] = [
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
    accessorKey: 'correct',
    header: 'correct',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue('correct') ? (
          <span className='flex text-green-500'>Correct</span>
        ) : (
          <span className='flex text-red-500'>Incorrect</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'user',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='px-0'>
          user
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{(row.getValue('user') as string).substring(20)}</div>,
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
      const user = row.original;

      const { updatePayment } = useCmsPayment();

      const handlePayment = (status: string) => {
        updatePayment({ paymentId: row.getValue('_id'), status });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white p-4 shadow-lg grid gap-2 z-50 rounded-sm'>
            <DropdownMenuItem className='cursor-pointer' onClick={() => handlePayment('success')}>
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => handlePayment('fail')}>
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => handlePayment('pending')}>
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
