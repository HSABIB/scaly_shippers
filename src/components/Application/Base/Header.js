import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import AuthService from "../../../services/auth.service";

const Header = (props) => {   

    const [profileDropdown, setProfileDropdown] = useState(false)

    const Signout = () => {
		AuthService.signout();
    }
    
    const toggleProfileDropdown = () => {
        setProfileDropdown( prevState => !prevState )
    }

    useEffect(() => {}, [])

    return (
        <div className="header-container fixed-top">
            <header className="header navbar navbar-expand-sm">
                <a href="#" className="sidebarCollapse" data-placement="bottom" onClick={props.toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </a>
                <ul className="navbar-item flex-row navbar-dropdown search-ul">
                    <li className={`nav-item dropdown user-profile-dropdown  order-lg-0 order-1 ${profileDropdown ? "show" : ""}`}>
                        <a href="#" onClick={toggleProfileDropdown} className="nav-link dropdown-toggle user" id="userProfileDropdown" data-toggle="dropdown" aria-expanded={ profileDropdown ? "true" : "false" }>
                            <img src="https://res.cloudinary.com/dchmztvzz/image/upload/v1622170944/developement/profile-7_yjahns.jpg" alt="admin-profile" className="img-fluid" />
                        </a>
                        <div className={`dropdown-menu position-absolute ${profileDropdown ? "show" : ""}`} aria-labelledby="userProfileDropdown">
                            <div className="user-profile-section">
                                <div className="media mx-auto">
                                    <img src="https://res.cloudinary.com/dchmztvzz/image/upload/v1622170944/developement/profile-7_yjahns.jpg" className="img-fluid mr-2" alt="avatar" />
                                    <div className="media-body">
                                        <h5>Alan Green</h5>
                                        <p>Project Leader</p>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/app/profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> <span> Profile</span>
                                </Link>
                            </div>
                            <div className="dropdown-item">
                                <a href="#" onClick={Signout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> <span>Log Out</span>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </header>
        </div>
    )
}

export default Header