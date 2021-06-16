/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect } from "react"
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import ErrorStyle from '!!raw-loader!./error.css'

import Error404 from '../../views/Error/404/Error404'

import { LOGO } from '../../constants'

const Error = props => {

    useEffect(() => {
        document.body.className = 'error404 text-center'
    }, [])

    return (
        <>
            {
                <Helmet>
                    <style>{ ErrorStyle }</style>
                </Helmet>
            }
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mr-auto mt-5 text-md-left text-center">
                        <a href="index.html" className="ml-md-5">
                            <img alt="404" src={LOGO} className="theme-logo" style={{width: "30%"}} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="container-fluid error-content">
                <div>
                    <Switch>
                        <Route path="/error/404" component={Error404} />
                        <Redirect to="/auth" />
                    </Switch>
                    <Link to="/auth/signin" className="btn btn-primary mt-5">Go Back</Link>
                </div>
            </div>
        </>
    )

}

export default Error