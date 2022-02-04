import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from './logo.png';
import * as FaIcons from 'react-icons/fa';

const NavBar = () => {
    const navigate = useNavigate();
    const [isMobile, setMobile] = useState(window.innerWidth < 699);
      
    const updateMedia = () => {
        setMobile(window.innerWidth < 699);
    };
      
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const logOut = async (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className='d-flex flex-column flex-shrink-0 p-3 text-white MyNavBar' style={{backgroundColor: '#F29441'}}>
            <img src={logo} alt="Logo" width="55%" className={isMobile ? 'HideThisOne' :  ''} />
            <hr className={isMobile ? 'HideThisOne' :  ''}/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to="/dashboard" activeclassname="active" className="nav-link text-white">
                        {isMobile ? FaIcons.FaHome :  <><FaIcons.FaHome /> Dashboard</>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search" activeclassname="active" className="nav-link text-white">
                        {isMobile ? FaIcons.FaSearch :  <><FaIcons.FaSearch /> Search</>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reservation" activeclassname="active" className="nav-link text-white">
                        {isMobile ? FaIcons.FaCalendar :  <><FaIcons.FaCalendar /> Reservation</>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cart" activeclassname="active" className="nav-link text-white">
                        {isMobile ? FaIcons.FaShoppingCart :  <><FaIcons.FaShoppingCart /> Shopping Cart</>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/kit" activeclassname="active" className="nav-link text-white">
                        {isMobile ? FaIcons.FaBriefcase :  <><FaIcons.FaBriefcase /> Kit</>}
                    </NavLink>
                </li>
                <div style={{padding: '5%', clear: 'both'}}></div>
                <hr className={isMobile ? 'HideThisOne' :  ''}/>
                <li>
                    <button 
                        type="button" 
                        className="btn"
                        onClick={logOut}
                    >
                        <FaIcons.FaSignOutAlt /> {isMobile ? '' :  'Sign Out'}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default NavBar
