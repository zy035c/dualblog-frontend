import "./App.css";
import "./app/globals.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./blog/start_page";
import { Toaster } from "src/components/ui/toaster";

const App = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden z-[-1] bg-black">
        <div className="fixed inset-0 overflow-hidden z-[-1] bg-gradient-to-br from-gumi-yellow via-gumi-red to-gumi-orange opacity-75" />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StartPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
