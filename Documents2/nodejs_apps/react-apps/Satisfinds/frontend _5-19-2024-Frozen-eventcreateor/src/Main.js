// Main.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import SignUp from './pages/SignUp';

import Tester from './pages/Tester';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Hero from './components/Hero';
import Events from './pages/Events';
import PostEvent from './pages/PostEvent';
import LinksPage from './pages/LinksPage';
import PublicPage from './pages/UserLinkPage';
import EventPage from './pages/UserEventPage';
import Dashboard from './pages/Dashboard';

const Main = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/public/:userName/*" element={<PublicPage />} />
        <Route path="/LinksPage" element={<LinksPage />} />
        <Route path="/Login" element={<Login />} />
        
        <Route path="/Signup" element={<SignUp />} />
       
        <Route path="/Tester" element={<Tester />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/Hero" element={<Hero />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/events/:eventname" element={<EventPage />} />
        <Route path="/PostEvent" element={<PostEvent />} />
      </Routes>
    </Suspense>
  );
};

export default Main;
