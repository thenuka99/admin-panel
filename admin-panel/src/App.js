import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/StatisticsPageComponent/StatisticsPageComponent";
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import CategoryPageComponent from './pages/CategoryPageComponent/CategoryPageComponent';
import UserDashboardPageComponent from './pages/UserDashboardPageComponent/UserDashboardPageComponent';
import SPDashboardPageComponent from './pages/SPDashboardPageComponent/SPDashboardPageComponent';
import AppointmentPageComponent from './pages/AppointmentPageComponent/AppointmentPageComponent';
import ClientProfilePageComponent from './pages/ClientProfilePageComponent/ClientProfilePageComponent';
import SPProfilePageComponent from './pages/SPProfilePageComponent/SPProfilePageComponent';
import Error from './pages/Error/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category" exact element={<CategoryPageComponent/>} />
          <Route path="/client" exact element={<UserDashboardPageComponent/>} />
          <Route path="/serviceprovider" exact element={<SPDashboardPageComponent/>} />
          <Route path="/appointment" exact element={<AppointmentPageComponent/>} />
          <Route path="/clientprofile/:userID" exact element={<ClientProfilePageComponent/>} />
          <Route path="/serviceproviderprofile/:spID" exact element={<SPProfilePageComponent/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
