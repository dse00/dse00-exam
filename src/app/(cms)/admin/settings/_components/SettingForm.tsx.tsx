/* eslint-disable react/jsx-handler-names */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useMyToast } from '@/hooks';
import { useCmsSetting } from '@/hooks/cms/useCmsSetting';
import cmsServices from '@/services/cms';

const FormSchema = z.object({
  showAds: z.boolean(),
});

export function SettingForm() {
  const { successToast } = useMyToast();
  const { cmsSettingData } = useCmsSetting();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      showAds: true,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await cmsServices.updateSettings(data);
    successToast('Form submitted');
  }

  useEffect(() => {
    if (cmsSettingData) {
      form.reset(cmsSettingData);
    }
  }, [cmsSettingData, form]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <div>
            <h3 className='mb-4 text-lg font-medium'>App Setting</h3>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='showAds'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className='space-y-0.5'>
                      <FormLabel>Show Adsense</FormLabel>
                      <FormDescription>show adsense on website. </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type='submit' disabled={form.formState.isSubmitting || !form.formState.isDirty}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SettingForm;
