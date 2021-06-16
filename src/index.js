import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import './assets/css/bootstrap.min.css'
import './assets/css/main.css'
import './assets/css/perfect-scrollbar.css'
import './assets/css/structure.css'
import './assets/css/monokai-sublime.css'

import Application from "./layouts/Application/Application";
import Authentification from "./layouts/Authentification/Authentification";
import Error from "./layouts/Error/Error";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
      <Route path="/app" component={Application} />
      <Route path="/auth" component={Authentification} />
      <Route path="/error" component={Error} />
      
      <Redirect to="/auth/signin" />
    </Switch>
	</BrowserRouter>,
	document.getElementById('root')
)