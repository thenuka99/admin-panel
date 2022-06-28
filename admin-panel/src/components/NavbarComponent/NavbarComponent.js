/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarComponent.scss';
import logo from "../../assets/servicr_logo.png"

const NavbarComponent = () => {


  return (
    <>
      <nav className='navbar'>
        <NavLink to='/' className='navbar-logo' >
          <div className='navlogo'><img src={logo}/></div>
          <p>ADMIN PANEL</p>
        </NavLink>

      </nav>
    </>
  );
};

export default NavbarComponent;
