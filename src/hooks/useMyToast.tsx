import { useToast } from './use-toast';

export const useMyToast = () => {
  const { toast } = useToast();

  const successToast = (message: string) => {
    toast({
      description: message,
    });
  };

  const errorToast = (message: string) => {
    toast({
      description: message,
      type: 'foreground',
    });
  };

  return { successToast, errorToast };
};
