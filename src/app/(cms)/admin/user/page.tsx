import { cookies } from 'next/headers';

import cmsServices from '@/services/cms';

import { BaseTable } from '../../_components/BaseTable';
import { columns, UserCoumnType } from './_components/column';

const CmsUserListPage = async () => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get('token')?.value;

  if (!token) return null;
  const users = (await cmsServices.getAllUsers(token)) as UserCoumnType[];

  return (
    <div>
      <BaseTable
        data={users}
        columns={columns}
        filter={{
          key: 'email',
          name: 'Email',
        }}
      />
    </div>
  );
};

export default CmsUserListPage;
