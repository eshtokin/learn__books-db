import React from 'react';
import { Link, Route } from 'react-router-dom';
import { AuthFormLogin } from './AuthFormLogin/authFormLogin';
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
      <Route path="/auth/login" component={ AuthFormLogin } />
      <Route path="/auth/registr" component={ AuthFormRegistr } />
    </div>
  )
}