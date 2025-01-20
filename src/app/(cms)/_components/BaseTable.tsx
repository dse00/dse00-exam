'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table as TableType,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FREE_USER_QUOTA } from '@/constants';
import { useSubscription } from '@/hooks';
import { useAppStore } from '@/store';

export function BaseTable<T>({
  data,
  columns,
  filter,
  table,
  batchActionButton,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  filter: {
    key: string;
    name: string;
  };
  table?: TableType<T>;
  batchActionButton?: React.ReactNode;
}) {
  const { isActiveSubscription } = useSubscription();
  const { setCallForSubscriptionDialogOpen } = useAppStore();
  table =
    table ||
    useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });

  const handleOnSelect = (value: string) => {
    if (!isActiveSubscription && +value > FREE_USER_QUOTA.MAXIMUM_DISPLAY_SELECT_ITEMS) {
      return setCallForSubscriptionDialogOpen(true);
    }
    table.setPageSize(+value);
  };

  return (
    <div className='w-full grid gap-4 pb-10'>
      {/* input & action buttons */}

      <div className='flex sm:items-center justify-between flex-col sm:flex-row items-start gap-4'>
        <div className='flex items-center border rounded-md p-2 gap-4 text-sm'>
          <Search size={16} />
          <input
            placeholder={`搜尋${filter.name}...`}
            value={(table.getColumn(filter.key)?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn(filter.key)?.setFilterValue(event.target.value)}
            className='bg-transparent focus:outline-none placeholder:font-[300]'
          />
        </div>
        {batchActionButton}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              顯示 <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* table */}

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className='[&>button]:px-0'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
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

      {/* pagination */}

      <div className='flex items-center justify-between space-x-2'>
        {/* 已選擇數目 */}
        <div className='text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} 已選擇
            </>
          )}
        </div>

        {/* 顯示數目 */}
        <div className='flex items-center space-x-2'>
          <Select onValueChange={handleOnSelect} defaultValue='10'>
            <SelectTrigger className='w-[80px] text-center'>
              <SelectValue placeholder='顯示數目' />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100, 200, 500].map(size => (
                <SelectItem key={size} value={size.toString()}>
                  {size > FREE_USER_QUOTA.MAXIMUM_DISPLAY_SELECT_ITEMS ? (
                    <div className='flex items-center gap-2'>
                      <span>{size}</span>
                      <Image src={'/images/leaf.png'} width={16} height={16} alt='learn more' />
                    </div>
                  ) : (
                    size
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 分頁 */}
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
