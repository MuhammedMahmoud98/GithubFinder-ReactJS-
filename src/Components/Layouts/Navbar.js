import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({gitHubIcon, title}) => {
    return (
        <div className='navbar'>
            <h1><i className={gitHubIcon} aria-hidden="true"></i> {title}</h1>
            <ul className='nav-links'>
                <Link style={removeTextDecoration} to='/'><li>Home</li></Link>
                <Link style={removeTextDecoration} to='/about'><li>About</li></Link>
            </ul>
            <i className="fas fa-sign-out-alt"></i>
        </div>
    );
}

const removeTextDecoration = {
    textDecoration: 'none'
}

export default Navbar;