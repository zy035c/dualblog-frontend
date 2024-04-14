import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { About } from "./about/about";
import { HomePage } from "./home/home";
import PrimeList from "./home/prime_list";

import Posts from "./tblog/tblog";
import SignUp from "./user/sign_up";
import NewPostSignIn from "./tblog/new_post";
import UserDropdown from "./user/user_dropdown";
import SettingsLayout from "src/blog/user/settings/layout";

const HeaderOption = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="transition-colors duration-300 ease-in-out hover:bg-pigliver-200 text-white hover:text-pigliver-700 px-3 py-2 rounded-md"
    >
      {text}
    </Link>
  );
};

const DemoHeader = () => {
  return (
    <div>
      <div className="bg-pigliver-400 rounded-md shadow-md p-2 flex justify-between items-center">
        <div className="flex space-x-2 flex-row">
          <HeaderOption to="./about" text="About Us" />
          <HeaderOption to="./primer" text="Primer!" />
          <HeaderOption to="/" text="Home" />
          <HeaderOption to="./posts" text="Blog Posts" />
          <HeaderOption to="./signup" text="Sign Up" />
          <HeaderOption to="./write_post" text="Write Post" />
        </div>
      </div>
      <UserDropdown />
    </div>
  );
};

const StartPage = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  return (
    <div>
      <DemoHeader />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path={`/`} element={<HomePage />} />

        <Route path="/posts/*" element={<Posts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write_post" element={<NewPostSignIn />} />
        <Route path="/primer" element={<PrimeList />} />
        <Route path="/settings" element={<SettingsLayout />} />
      </Routes>

      <div className="text-white font-serif">
        <p className="text-white">[Debug Info]</p>
        Pathname: <b>{pathname}</b>
        <br />
        Search params: <b>{search}</b>
        <br />
        Hash: <b>{hash}</b>
      </div>
    </div>
  );
};

export default StartPage;
