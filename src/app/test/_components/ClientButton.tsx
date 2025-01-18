'use client';

import { serverAction } from '../server';

const ClientButton = () => {
  const triggerServerAction = async () => {
    serverAction({ name: 123 });
  };

  return <button onClick={triggerServerAction}>Client Button</button>;
};

export default ClientButton;
