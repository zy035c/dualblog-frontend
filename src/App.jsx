import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from 'blog/start_page'

const App = () => {
  return (
    <div className="bg-gradient-to-br from-pigliver-400 via-pigliver-600 to-pigliver-700 h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StartPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
