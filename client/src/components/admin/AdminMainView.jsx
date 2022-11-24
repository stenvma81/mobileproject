import './admin.css';
import React from 'react';
import { Header } from '../../header/Header';
import { PostListaddmin, Posts } from './posts-containers';
import { PostList } from '../posts/PostList';
import Postlistcard from './postlist-card';
import { Onepost } from './post-list';

export function AdminMainView() {
  return (
    <>
      <div className="Allcontainer">
        <div className="Admincontainer">
          <Header id="header"></Header>
          <Onepost name="New posts: " />
          <Onepost name="Old posts: " />
          <Onepost name="Done: " />
        </div>
      </div>
    </>
  );
}
