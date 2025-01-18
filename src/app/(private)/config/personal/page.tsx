'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMyToast, useUser } from '@/hooks';
import services from '@/services';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: '名字太短了',
  }),
  email: z.string().email({
    message: '電郵格式不正確',
  }),
  school: z.string().min(2, {
    message: '學校名字太短了',
  }),
});

function ConfigPersonalPage() {
  const { userData, invalidateUserQuery } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      school: userData?.school || '',
    },
  });

  const { successToast } = useMyToast();

  useEffect(() => {
    if (!userData) return;
    form.reset({
      name: userData.name,
      email: userData.email,
      school: userData.school,
    });
  }, [userData, form]);

  if (!userData) return null;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await services.updateUserProfile({
      ...data,
      user: userData?.user as string,
    });

    successToast('更新成功');

    invalidateUserQuery();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>用戶名字</FormLabel>
              <FormControl>
                <Input placeholder='名字' {...field} />
              </FormControl>
              <FormDescription>這是你的名字，用來顯示在網站上。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>電郵</FormLabel>
              <FormControl>
                <Input placeholder='電郵' {...field} disabled />
              </FormControl>
              <FormDescription>在這裡不能更改</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='school'
          render={({ field }) => (
            <FormItem>
              <FormLabel>學校</FormLabel>
              <FormControl>
                <Input placeholder='電郵' {...field} disabled />
              </FormControl>
              <FormDescription>在這裡不能更改</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormDescription>
          <Link href={'https://www.dse00.com/p/login.html?isEdit=true'} target='_blank'>
            詳細更改返回DSE00 編輯個人檔案
          </Link>
        </FormDescription>

        <Button type='submit' disabled={!form.formState.isDirty}>
          <span>確定</span>
          <Leaf />
        </Button>
      </form>
    </Form>
  );
}

export default ConfigPersonalPage;
