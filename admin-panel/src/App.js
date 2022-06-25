import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/StatisticsPageComponent/StatisticsPageComponent";
import NavbarComponent from './components/NavbarComponent/NavbarComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
