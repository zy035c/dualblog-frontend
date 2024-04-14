import "./App.css";
import "./app/globals.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./blog/start_page";
import { Toaster } from "src/components/ui/toaster";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-pigliver-400 via-pigliver-600 to-pigliver-700 h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StartPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
