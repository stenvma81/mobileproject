import './admin.css';
import React from 'react';
import { PostsByState } from './PostsByState';
import { AdminHeader } from './admin-header/admin-header';
import { postStates } from '../../utils/variables';

export function AdminMainView() {
  return (
    <div className="Allcontainer">
      <AdminHeader />
      <div className="Admincontainer">
        <PostsByState poststate={postStates.open} />
        <PostsByState poststate={postStates.prosessing} />
        <PostsByState poststate={postStates.closed} />
      </div>
    </div>
  );
}
