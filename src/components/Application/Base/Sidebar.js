import React from "react"
import { Link } from "react-router-dom"

const Sidebar = props => {

    const checkActiveComponent = (componentName) => {
        return window.location.href.includes(componentName) 
    }

    return (
        <div className="sidebar-wrapper sidebar-theme">
            <nav id="compactSidebar">
                <ul className="navbar-nav theme-brand flex-row">
                    <li className="nav-item theme-logo">
                        <a href="/">
                            <img src="https://res.cloudinary.com/dchmztvzz/image/upload/v1623810851/scaly/logos/fav-white_ksja5d.png" className="navbar-logo" alt="logo" />
                        </a>
                    </li>
                </ul>
                <ul className="menu-categories ps ps--active-y">
                    <li className={`menu menu-single ${checkActiveComponent('dashboard') ? "active" : ""}`}>
                        <Link to="/app/dashboard" data-active={`${checkActiveComponent('dashboard') ? "true" : "false"}`} className="menu-toggle">
                            <div className="base-menu">
                                <div className="base-icons">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                </div>
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </li>
                    
                    <li className={`menu menu-single ${checkActiveComponent('stores') ? "active" : ""}`}>
                        <Link to="/app/stores" data-active={`${checkActiveComponent('stores') ? "true" : "false"}`} className="menu-toggle">
                            <div className="base-menu">
                                <div className="base-icons">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                </div>
                                <span>Stores</span>
                            </div>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </li>

                    <div className="ps__rail-x" style={{left: "0px", bottom: "-82px"}}>
                        <div className="ps__thumb-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
                    </div>
                    <div className="ps__rail-y" style={{top: "82px", height: "538px", right: "0px"}}>
                        <div className="ps__thumb-y" tabIndex="0" style={{top: "110px", height: "100px"}}></div>
                    </div>
                </ul>
            </nav>
            <div id="compact_submenuSidebar" className="submenu-sidebar ps">

                <div className="ps__rail-x" style={{left: "0px", bottom: "0px"}}>
                    <div className="ps__thumb-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
                </div>
                <div className="ps__rail-y" style={{top: "0px", right: "0px"}}>
                    <div className="ps__thumb-y" tabIndex="0" style={{top: "0px", height: "0px"}}></div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar