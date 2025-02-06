import { Button, ButtonProps } from './ui/button';

export default ({ children, ...rest }: { children: React.ReactNode } & ButtonProps) => {
  return (
    <Button {...rest} className='group'>
      <div className='flex justify-center items-center gap-2  transition-all px-3 [&>span]:scale-x-0 [&>span]:overflow-hidden [&>span]:group-hover:scale-x-100 [&>span]:transition-all [&>span]:origin-left'>
        {children}
      </div>
    </Button>
  );
};
