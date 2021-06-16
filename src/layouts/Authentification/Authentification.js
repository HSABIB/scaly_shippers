/* eslint import/no-webpack-loader-syntax: off */

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Helmet } from 'react-helmet'

import FormStyle from '!!raw-loader!./form.css'
import SwitchesStyles from '!!raw-loader!./switches.css'
import CheckboxesStyle from '!!raw-loader!./checkboxes.css'

import Signin from '../../views/Authentification/Signin/Signin'

const Authentification = props => {

    React.useEffect(() => {
        document.body.className = 'form'
    }, [])


    return (
        <>
            <Helmet>
                <style rel="stylesheet" type="text/css">{ FormStyle }</style>
                <style rel="stylesheet" type="text/css">{ SwitchesStyles }</style>
                <style rel="stylesheet" type="text/css">{ CheckboxesStyle }</style>
            </Helmet>
            <div className="form-container">
                <div className="form-form">
                    <div className="form-form-wrap">
                        <div className="form-container">
                            <Switch>
                                <Route path="/auth/signin" component={Signin} />
                                <Redirect to="/auth/signin" />
                            </Switch>
                        </div>
                    </div>
                </div>
                <div className="form-image">
                    <div className="l-image"></div>
                </div>
            </div>
        </>
    )

}

export default Authentification