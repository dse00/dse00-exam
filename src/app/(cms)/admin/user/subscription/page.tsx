import cmsServices from '@/services/cms';
const AdminUserSubscriptionPage = async () => {
  const users = await cmsServices.getAllUsers();

  console.log(users.length);

  return (
    <div>
      {users?.map(user => (
        <div key={user.email}>
          <span>{user.email}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminUserSubscriptionPage;
