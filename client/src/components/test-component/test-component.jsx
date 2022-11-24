import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SendMessage } from '../messages/SendMessage';
import { PostForm } from '../posts/PostForm';
import Card from '../singlepostcard/Card';
import { PostList } from '../posts/PostList';

export function TestComponent() {
  return (
    <div className="App">
      <header className="App-header">
        <PostForm />
        <PostList />
        {/* <SinglePost/>
      <SendMessage /> */}
      </header>
      <div></div>
    </div>
  );
}

function SinglePost() {
  const post = {
    date: '3.2.2022',
    title: 'Liukas parkkipaikka',
    argumentpoststate: 'Tila: ',
    poststate: 'Päättynyt',
    description:
      'Parkkipaikka on niin liukas, että pystyssä ei meninaa pysyä. Voisiko sitä hiekoittaa mahdollisimman pian.',
    argumentplace: 'Paikka: ',
    place: 'Karakaaren parkkipaikka',
    argumentmessage: 'Viesti:',
  };

  return (
    <Card
      argumenpoststate={post.argumentpoststate}
      posttate={post.poststate}
      title={post.title}
      date={post.date}
      description={post.description}
      argumentplace={post.argumentplace}
      place={post.place}
      argumentmessage={post.argumentmessage}
    />
  );
}
