import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from 'blog/start_page'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StartPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
