import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';
import { userRoles } from '../utils/variables';
import { AdminMainView } from './admin/AdminMainView';
import { UserMainView } from './user-components/UserMainView';

export function ContentView() {
  const { user, setUser } = useContext(MainContext);

  const fetchUser = async () => {
    const userdata = JSON.parse(sessionStorage.getItem('token'));
    setUser(userdata.user);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user.role === userRoles.admin.id ? <AdminMainView /> : <UserMainView />}
    </div>
  );
}
