import React from 'react'
import {  Link } from 'react-router-dom';

export const NavBar = (props) => {
    console.log('Auth : ', props)
    if(props.auth && props.auth.authenticated) {
        return <ul className="nav justify-content-center">
        <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Main</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/orders">Orders</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/accountalerts">Account alerts</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/settings">Settings</Link>
        </li>
      </ul> 
    } else {
        return <div></div>
    }
    
}