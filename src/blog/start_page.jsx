import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import DemoAbout from './about/about';
import DemoHome from './home/home';

import Posts from './tblog/tblog';
import SignUp from './user/sign_up';

function Products() {
  return <h2>About</h2>;
}

function Pricing() {
  return <h2>Pricing</h2>;
}

const HeaderOption = ({to, text}) => {
  return (
    <Link to={to} className="transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md">
      {text}
    </Link>
  )
}

const DemoHeader = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <div class="bg-blue-200 rounded-md shadow-md p-4 flex space-x-4">
        <HeaderOption to="./about" text="WhatAbout" />
        <HeaderOption to="./home" text="Primer!" />
        <HeaderOption to="/" text="Home" />
        <HeaderOption to="./products" text="Products" />
        <HeaderOption to="./posts" text="Blog Posts" />
        <HeaderOption to="./#pricing" text="Pricing" />
        <HeaderOption to="./signup" text="Sign Up" />
      </div>
    </div>
  )
};

const StartPage = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  return (
    <div>
      <DemoHeader />

      <Routes>
        <Route path={`/about`} element={<DemoAbout/>}/>
        <Route path={`/home`} element={<DemoHome/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/posts/*" element={<Posts />} />
        <Route path="/#pricing" element={<Pricing />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <div> 
        Pathname: <b>{pathname}</b><br />
        Search params: <b>{search}</b><br />
        Hash: <b>{hash}</b>
      </div>
    </div> 
  );
};

export default StartPage;