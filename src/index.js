import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CV from './components/CV';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="CV" element={<CV />} />
        <Route path="About" element={<Navigate to="/" replace />} />
        <Route path="Research" element={<Navigate to="/#research" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
