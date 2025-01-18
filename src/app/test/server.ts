'use server';
export const serverAction = async (data: any) => {
  console.log('Server Action', data);

  return { status: 'success' };
};
