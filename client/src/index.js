import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/App';
import Instructions from './pages/instruct';
import NotFound from './pages/404';
import Results from './pages/results-page'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/instructions' element={<Instructions />}/>
        <Route path='/results' element={<Results />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
