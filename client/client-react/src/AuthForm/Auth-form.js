import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import AuthFormlogin from './AuthFormLogin/AuthFormLogin';
import AuthFormReg from './AuthFormReg/AuthFormReg'

class AuthForm extends React.Component {
  render() {
    return (
      <div className="row">
        <ul className="col s4 offset-s4 row">
            <li className="col s3 offset-s3">
                <NavLink to="/auth/login">Login</NavLink>
            </li>
            <li className="col s3">
                <NavLink to="/auth/registr">Registration</NavLink>
            </li>
        </ul>
        <Switch>
          <Route exact path="/auth/login" component = { AuthFormlogin } />
          <Route exact path="/auth/registr" component = { AuthFormReg } />
        </Switch>
      </div>
    )
  }
}

export default AuthForm;