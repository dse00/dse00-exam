'use client';
import { Checkbox } from '@radix-ui/react-checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import moment from 'moment';

import { Button } from '@/components/ui/button';

export type PaymentColumn = {
  _id: string;
  createdAt: string;
  referenceId: string;
  message: string;
  status: string;
};

export const paymentColumn: ColumnDef<PaymentColumn>[] = [
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'message',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          message
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('message')}</div>,
  },
  {
    accessorKey: 'referenceId',
    header: () => <div className='text-right'>referenceId</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.getValue('referenceId')}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className='text-right'>Created At</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>{moment(row.getValue('createdAt')).format('YYYY-MM-DD hh:mm')}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white p-4 shadow-lg grid gap-2 z-50'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user._id)}>Copy user ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View user details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
