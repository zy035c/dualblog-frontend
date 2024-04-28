import "./App.css";
import "./app/globals.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./blog/start_page";
import { Toaster } from "src/components/ui/toaster";

const App = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden z-[-20] bg-gray-900">
        <div className="fixed inset-0 overflow-hidden z-[-20] bg-gradient-to-br from-theme-color-1 via-theme-color-2 to-theme-color-3 opacity-60" />
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
