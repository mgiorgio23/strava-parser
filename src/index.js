import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/App';
import Instructions from './pages/instruct';
import NotFound from './pages/404'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/instructions' element={<Instructions />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    <Home />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
