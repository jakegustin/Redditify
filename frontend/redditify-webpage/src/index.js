import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonTest from './ButtonTest';
import SpotifyLogin from './Login';
import TopPosts from './DailyPlaylistGen';
import Subreddit from './Subreddit';
import SubredditTest from './SubredditTest';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import LoginStatus from './LoginStatus';
import SpotifyLoginStatus from './SpotifyLoginStatus';
import SpotifyPlaylists from './SpotifyPlaylists';
import UserSpotifyPlaylistGen from './UserPlaylistGenerator';
import SubSpotifyPlaylistGen from './SubPlaylistGenerator';
import FindSubreddits from './FindNewSubreddits';

//Index.js: The root of the React app, which renders the App component

export default function Root() {
  return (
    <BrowserRouter>
    {/*generally is not seen by user, links webpages to files/functions*/}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/userPosts" element={<ButtonTest />} />
      <Route path="/spotifyLogin" element={<SpotifyLogin />} />
      <Route path="/topPosts" element={<TopPosts />} />
      <Route path="/subredditSearch" element={<Subreddit />} />
      <Route path="/subredditPosts" element={<SubredditTest />} />
      <Route path="/registerForm" element={<RegisterForm />} />
      <Route path="/loginForm" element={<LoginForm />} />
      <Route path="/loginStatus" element={<LoginStatus />} />
      <Route path="/spotifyLoginStatus" element={<SpotifyLoginStatus />} />
      <Route path="/spotifyPlaylists" element={<SpotifyPlaylists />} />
      <Route path="/createUserPlaylist" element={<UserSpotifyPlaylistGen />} />
      <Route path="/createSubredditPlaylist" element={<SubSpotifyPlaylistGen />} />
      <Route path="/findSubreddit" element={<FindSubreddits />} />
      <Route path="*" element={<h1>404: Not Found</h1>} />
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
