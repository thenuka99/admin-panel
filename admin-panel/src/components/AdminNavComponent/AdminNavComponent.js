import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavComponent.scss";

function AdminNavComponent() {
  return (
    <div>
      <div className="adminpage">
        <nav className="main-menu">
          <ul>
            <li>
              <NavLink
                to="/"
                className={(isActive) => (isActive ? "active" : "navlink")}
              >
                <i className="fa fa-bar-chart-o"></i>
                <span className="nav-text">Statistics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client"
                className={(isActive) => (isActive ? "active" : "navlink")}
              >
                <i className="fa fa-user"></i>
                <span className="nav-text"> Clients</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/serviceprovider"
                className={(isActive) => (isActive ? "active" : "navlink")}
              >
                <i className="fa fa-user"></i>
                <span className="nav-text"> Service Providers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className={(isActive) => (isActive ? "active" : "navlink")}
              >
                <i className="fa fa-list"></i>
                <span className="nav-text">Catagories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointment"
                className={(isActive) => (isActive ? "active" : "navlink")}
              >
                <i className="fa fa-tag"></i>
                <span className="nav-text">Appointments</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminNavComponent;
