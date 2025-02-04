'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMyToast } from '@/hooks';
import cmsSercices from '@/services/cms';
import { UserType } from '@/types/user';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email.',
  }),
  message: z.string().min(2, {
    message: 'Message must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
});

export default () => {
  const [user, setUser] = useState<UserType | null>(null);
  const { errorToast, successToast } = useMyToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
      title: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    await cmsSercices.sendMessage({
      user: user?._id as string,
      title: values.title,
      message: values.message,
    });

    form.reset();
    successToast('Message sent');
    setUser(null);
  }

  const searchEmail = async () => {
    // validate the input
    const isValid = await form.trigger('email');
    if (!isValid) return;
    const res = await cmsSercices.searchUserByEmail(form.getValues('email'));
    if (res) {
      setUser(res);
      successToast('User found');
    } else errorToast('User not found');
  };

  return (
    <div className='container py-20'>
      <Card className='w-[550px]  mx-auto'>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='email' {...field} onBlur={searchEmail} disabled={!!user} />
                    </FormControl>
                    <FormDescription>
                      {user ? <span className='text-green-500'>user found: {user._id}</span> : ' This is email of user'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user && (
                <>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='title' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder='message' {...field} rows={10} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
