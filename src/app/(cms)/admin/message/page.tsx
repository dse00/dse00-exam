import { cookies } from 'next/headers';

import cmsServices from '@/services/cms';

import { BaseTable } from '../../_components/BaseTable';
import { columns } from './_components/column';

const CmsUserListPage = async () => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get('token')?.value;

  if (!token) return null;
  const messages = await cmsServices.getMessages(token);

  return (
    <div>
      <BaseTable
        data={messages}
        columns={columns}
        filter={{
          key: 'user',
          name: 'User ID',
        }}
      />
    </div>
  );
};

export default CmsUserListPage;
