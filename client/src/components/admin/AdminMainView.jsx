import './admin.css';
import React from 'react';
import { Header } from '../../header/Header';
// import { PostListaddmin, Posts } from './posts-containers';
// import { PostList } from '../posts/PostList';
// import Postlistcard from './postlist-card';
// import { Onepost } from './post-list';
import { PostsByState } from './PostsByState';
import { AdminHeader } from './admin-header/admin-header';

export function AdminMainView() {
  return (
  
      <div className="Allcontainer">
         <AdminHeader/>
        <div className="Admincontainer">
         
          {/* <Onepost name="New posts: " /> */}
          <PostsByState poststate={{ id: 0, title: 'Open:' }} />
          <PostsByState poststate={{ id: 1, title: 'Prosessing:' }} />
          <PostsByState poststate={{ id: 2, title: 'Closed:' }} />
          {/* <Onepost name="Old posts: " />
          <Onepost name="Done: " /> */}
        </div>
      </div>
      
  );
}
