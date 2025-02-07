'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Smile } from 'lucide-react';
import moment from 'moment';

import { Button } from '@/components/ui/button';
import { MessageType } from '@/types/message';

export const columns: ColumnDef<MessageType>[] = [
  {
    accessorKey: 'user',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{(row.getValue('user') as string).substring(20)}</div>,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'acknowledged',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          acknowledged
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('acknowledged') ? <Smile color='green' /> : 'no'}</div>,
  },
  {
    accessorKey: 'message',
    header: 'message',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('message')}</div>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'updatedAt',
    cell: ({ row }) => <div className='capitalize'>{moment(row.getValue('updatedAt')).format('YYYY-MM-DD HH:mm')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className='text-right'>Created At</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{moment(row.getValue('createdAt')).format('YYYY-MM-DD')}</div>;
    },
  },
];
