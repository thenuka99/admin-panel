/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarComponent.scss';

const NavbarComponent = () => {


  return (
    <>
      <nav className='navbar'>
        <NavLink to='/' className='navbar-logo' >
          ADMIN PANEL
        </NavLink>

      </nav>
    </>
  );
};

export default NavbarComponent;
