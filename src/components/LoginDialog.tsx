import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks';
import { useAppStore } from '@/store';

export function LoginDialog() {
  const { loginDialogOpen, setLoginDialogOpen } = useAppStore();
  const pathname = usePathname();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const { loginUser } = useUser();

  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    loginUser(credentials);
  }

  const onCredentialsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const index = e.target.dataset.index as any;
    setCredentials({ ...credentials, [index]: value });
  };

  return (
    <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogTitle />

        <form className='grid gap-4'>
          <div className='grid gap-4'>
            <Input placeholder='電郵' value={credentials.email} onChange={onCredentialsInput} data-index='email' />
            <Input
              placeholder='密碼'
              type='password'
              value={credentials.password}
              data-index='password'
              onChange={onCredentialsInput}
            />
          </div>

          <DialogDescription className='flex justify-between items-center'>
            <Link
              href={`https://www.dse00.com/p/login.html?origin=${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + pathname}`}
              target='_blank'
              className={buttonVariants({ variant: 'ghost' })}
            >
              返回 DSE00 登入
            </Link>
            <Button onClick={onSubmit} disabled={!credentials.email || !credentials.password}>
              快速登入
            </Button>
          </DialogDescription>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
