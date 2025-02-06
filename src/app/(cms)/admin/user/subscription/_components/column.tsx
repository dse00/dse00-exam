'use client';
import { Checkbox } from '@radix-ui/react-checkbox';
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
import { useCmsSubscription } from '@/hooks/cms/useCmsSubscription';

export type SubscriptionColumn = {
  _id: string;
  endDate: string;
  plan: string;
  user: string;
  email: string;
  message: string;
  createdAt: string;
};

export const subscriptionColumn: ColumnDef<SubscriptionColumn>[] = [
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
    enableHiding: true,
  },
  {
    accessorKey: '_id',
    header: () => <div className='hidden'>_id</div>,
    cell: ({ row }) => <div className='capitalize hidden'>{row.getValue('_id')}</div>,
  },
  {
    accessorKey: 'plan',
    header: 'plan',
    cell: ({ row }) => row.getValue('plan'),
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
    accessorKey: 'createdAt',
    header: () => <div className='text-right'>createdAt</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{moment().from(moment(row.getValue('createdAt')))}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: () => <div className='text-right'>endDate</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{moment(row.getValue('endDate')).format('YYYY-MM-DD')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      const { deleteSubscription } = useCmsSubscription();

      const toDeleteSubscription = (subscriptionId: string) => {
        deleteSubscription(subscriptionId);
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
            <DropdownMenuItem className='cursor-pointer' onClick={() => toDeleteSubscription(row.getValue('_id'))}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
