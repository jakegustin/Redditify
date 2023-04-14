import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonTest from './ButtonTest';
import Login from './Login';
import TopPosts from './TopPosts';
import Subreddit from './Subreddit';
import SubredditTest from './SubredditTest';

export default function Root() {
  return (
    <BrowserRouter>
    {/*generally is not seen by user, links webpages to files/functions*/}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/userPosts" element={<ButtonTest />} />
      <Route path="/loginPage" element={<Login />} />
      <Route path="/topPosts" element={<TopPosts />} />
      <Route path="/subredditSearch" element={<Subreddit />} />
      <Route path="/subredditPosts" element={<SubredditTest />} />
    </Routes>
  </BrowserRouter>
  )
}

// Initialization of React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
