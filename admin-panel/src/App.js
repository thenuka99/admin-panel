import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/StatisticsPageComponent/StatisticsPageComponent";
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import CategoryPageComponent from './pages/CategoryPageComponent/CategoryPageComponent';
// import LoginComponent from './components/Auth/LoginComponent/LoginComponent';
// import SignupComponent from './components/Auth/SignupComponent/SignupComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category" exact element={<CategoryPageComponent/>} />
          {/* <Route path="/login" exact element={<LoginComponent />} />
          <Route path="/signup" exact element={<SignupComponent />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
