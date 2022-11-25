import { useEffect, useState } from 'react';
import { AdminMainView } from './admin/AdminMainView';
import { UserMainView } from './user-components/UserMainView';

export function ContentView() {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const userdata = JSON.parse(sessionStorage.getItem('token'));
    setUser(userdata.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div>{user.role === 1 ? <AdminMainView /> : <UserMainView />}</div>;
}
