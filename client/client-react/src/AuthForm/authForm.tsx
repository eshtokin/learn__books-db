import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AuthFormLogin from './AuthFormLogin/authFormLogin';
import { AuthFormRegistr } from './AuthFormRegistr/authFormRegistr';

export const AuthForm = () => {
  return (
    <div className="row">
      <ul className="col s4 offset-s4 row">
        <li className="col s3 offset-s3">
            <Link to="/auth/login" className="nav-link">Login</Link>
        </li>
        <li className="col s3">
            <Link to="/auth/registr">Registration</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/auth/login" component={ AuthFormLogin } />
        <Route path="/auth/registr" component={ AuthFormRegistr } />
        <Route path="/auth/*" component={ () => <h3>Not found</h3> } />
      </Switch>
    </div>
  )
}