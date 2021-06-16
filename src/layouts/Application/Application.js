/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import AuthService from '../../services/auth.service'

import Header from '../../components/Application/Base/Header'
import Sidebar from '../../components/Application/Base/Sidebar'
import Footer from '../../components/Application/Base/Footer'
import Scrollup from '../../components/Application/Base/Scropllup'

import scrollspyNavStyle from '!!raw-loader!./scrollspyNav.css'

import Profile from '../../views/Application/Profile/Profile'
import Dashboard from '../../views/Application/Dashboard/Dashboard'

import Stores from '../../views/Application/Stores/Stores'

import Orders from '../../views/Application/Orders/Orders'
import Order from '../../views/Application/Order/Order'

const Application = props => {

    const MediaSize = {
        xl: 1200,
        lg: 992,
        md: 991,
        sm: 576
    }

    useEffect(() => {
        (async function Authentification() {
            const authResponse = await AuthService.getAuthentification() // Auth ? return true(bool) : signout redirect
            document.body.className = 'dashboard-analytics'
            toggleOverlay()
            sidebarCloser();
        })();
    }, [])

    const toggleSidebar = event => {

        const get_overlay = document.querySelector('.overlay')
        const get_mainContainer = document.querySelector('.main-container')

        get_mainContainer.classList.toggle('sidebar-closed')
        get_mainContainer.classList.toggle('sbar-open')

        if ( window.innerWidth <= MediaSize.md ) {
            if (get_overlay.classList.contains('show')) {
                get_overlay.classList.remove('show');
            } else {
                get_overlay.classList.add('show');
            }
        }
        document.querySelector('html, body').classList.toggle('sidebar-noneoverflow')
    }

    const toggleOverlay = event => {
        if ( window.innerWidth <= MediaSize.md ){
            document.querySelector('.main-container').classList.add('sidebar-closed')
        }
        document.querySelector('.overlay').classList.remove('show')
        document.querySelector('html, body').classList.remove('sidebar-noneoverflow')
        document.querySelector('body').classList.remove('mini_bar-open')
    }

    const sidebarCloser = () => {
        if ( window.innerWidth <= MediaSize.md ) {
            document.querySelector('.main-container').classList.remove('sbar-open')
            document.querySelector('#container').classList.add('sidebar-closed')
            document.querySelector('.overlay').classList.remove('show')
        } else if ( window.innerWidth > MediaSize.md ) {
            document.querySelector('#container').classList.remove('sidebar-closed')
            document.querySelector('#container').classList.remove('sbar-open')            
        }
    }

    const sidebarMobCheck = () => {
        if (window.innerWidth <= MediaSize.md ) {
            if ( document.querySelector('.main-container').classList.contains('sbar-open') ) {
                return;
            } else {
                sidebarCloser()
            }
        } else if (window.innerWidth > MediaSize.md ) {
            sidebarCloser();
        }
    }

    window.addEventListener('resize', () => {
        sidebarMobCheck();
    });

    return (
        <>
            <Helmet>
                <style rel="stylesheet" type="text/css">{ scrollspyNavStyle }</style>
            </Helmet>
            <Header toggleSidebar={toggleSidebar} />
            <div className="main-container" id="container">
                <div className="overlay" onClick={toggleOverlay}></div>
                <Sidebar />
                <div id="content" className="main-content">
                    <div className="layout-px-spacing">
                        <Switch>
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/profile" component={Profile} />

                            <Route path="/app/stores" component={Stores} />

                            <Route path="/app/orders/:storeID" component={Orders} />
                            <Route path="/app/order/:orderID" component={Order} />

                            <Redirect to="/error/404" />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
            <Scrollup />
        </>
    )

}

export default Application