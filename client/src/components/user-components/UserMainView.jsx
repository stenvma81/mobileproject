import { Header } from '../header/Header';
import { MainView } from '../main/MainView';
import './UserMainView.css';

export function UserMainView() {
  return (
    <div className="UserMainView">
      <Header />
      <MainView />
    </div>
  );
}
