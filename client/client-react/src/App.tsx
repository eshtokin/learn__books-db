import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Profile from './Shared/Profile/Profile';
import Catalog from './Shared/Catalog/Catalog';
import BookManager from './Admin/BookManager/BookManager';
import UserManager from './Admin/UserManager/UserManager';
import AuthForm from './AuthForm/Auth-form';

function App() {
  return (
    <div className="App">
      <nav className="teal">
        <div className="nav-wrapper row">
          <ul id="nav-mobile" className=" row">
            <li className="col s2 center">
              <NavLink to="/auth/login">Log in</NavLink>
            </li>
            <li className="col s2 center">
              <NavLink to="/auth">Log out</NavLink>
            </li>
            <li className="col s2 center">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="col s2 center">
              <NavLink to="/catalog">Catalog</NavLink>
            </li>
            <li className="col s2 center">
              <NavLink to="/dbviewers">Book manager</NavLink>
            </li>
            <li className="col s2 center">
              <NavLink to="/user-manager">User manager</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      
      <Route path="/auth" component = { AuthForm } />
      <Route exact path="/profile" component = { Profile } />
      <Route exact path="/catalog" component = { Catalog } />
      <Route exact path="/dbviewers" component = { BookManager } />
      <Route exact path="/user-manager" component = { UserManager } />
    </div>
  );
}

export default App;
