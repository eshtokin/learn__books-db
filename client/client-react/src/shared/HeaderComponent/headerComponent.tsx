import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";
import { UserInfoService } from "../../service/user-info.service";

export default function Header() {
  const userInfoService = new UserInfoService();

  return (
    <nav className="col s12 myHeader">
      <div className="nav-wrapper teal">
        <Link className="brand-logo" to="/">
          Logo
        </Link>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down" //*ngIf="isUserAuth()"
        >
          <li>
            <NavLink to="/" activeClassName="isActiveRoute" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" activeClassName="isActiveRoute" exact>
              GoogleBook
            </NavLink>
          </li>
          <li>
            <NavLink to="/book-manager" activeClassName="isActiveRoute" exact>
              Books
            </NavLink>
          </li>
          <li //*ngIf="userRole()">
          >
            <NavLink to="/user-manager" activeClassName="isActiveRoute" exact>
              Users
            </NavLink>
          </li>
          <li className="dropdown">
            <NavLink
              className="btn-floating btn-large  waves-effect waves-light teal"
              to="/profile"
            >
              <img
                src="https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png"
                alt="user avatar"
              ></img>
            </NavLink>
            <ul>
              <li>
                <NavLink to="/profile" activeClassName="isActiveRoute" exact>
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile/favorites"
                  activeClassName="isActiveRoute"
                  exact
                >
                  My favorites
                </NavLink>
              </li>
              <li onClick={userInfoService.logout}>
                <NavLink to="/auth/login" activeClassName="isActiveRoute">
                  Log out
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down" // *ngIf="!isUserAuth()"
        >
          <li>
            <NavLink to="/auth" activeClassName="isActiveRoute">
              Log in
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
