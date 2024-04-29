"use client";

import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { About } from "./about/about";
import { HomePage } from "./home/home";
import PrimeList from "./home/prime_list";

import Posts from "./tblog/tblog";
import SignUp from "./user/sign_up";
import NewPostSignIn from "./tblog/new_post";
import SettingsLayout from "src/blog/user/settings/layout";
import { HeaderMenu } from "./home/header_memu";
import SearchPage from "./tblog/search/page";

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

const DebugInfo = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
    <div className="text-white font-serif">
      <p className="text-white">[Debug Info]</p>
      Pathname: <b>{pathname}</b>
      <br />
      Search params: <b>{search}</b>
      <br />
      Hash: <b>{hash}</b>
    </div>
  );
};

const StartPage = () => {
  return (
    <div>
      <HeaderMenu />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path={`/`} element={<HomePage />} />

        <Route path="/posts/*" element={<Posts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write_post/*" element={<NewPostSignIn />} />
        <Route path="/primer/*" element={<PrimeList />} />
        <Route path="/settings/*" element={<SettingsLayout />} />
        <Route path="/search/*" element={<SearchPage />} />
      </Routes>
      <DebugInfo />
    </div>
  );
};

export default StartPage;
