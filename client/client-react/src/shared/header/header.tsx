import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'
// const Header: React.FC = () => {
//   return (

//   );
// }

class Header extends React.Component {
  render() {
    return (
      <nav className="col s12">
        <div className="nav-wrapper teal">
          <Link className="brand-logo" to="/">Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down" //*ngIf="isUserAuth()"
          >
            <li><Link to='/'>Home</Link></li>
            <li>
              <Link to="/catalog">GoogleBook</Link>
            </li>
            <li>
              <Link to="/book-manager">Books</Link>
            </li>
            <li //*ngIf="userRole()">
            >
              <Link to="/user-manager">Users</Link>
            </li>
            <li className="dropdown">
              <Link className="btn-floating btn-large  waves-effect waves-light teal" to="/profile">
                <img src="https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png" alt="user avatar"></img>
              </Link>
              <ul>
                <li>
                   <Link to="/profile">My profile</Link>
                </li>
                <li>
                  <Link to="/profile/favorites">My favorites</Link>
                </li>
                <li // (click)="this.userInfo.logout()"
                >
                  <Link to="/auth/login">Log out</Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down"  // *ngIf="!isUserAuth()"
          >
            <li>
              <Link to="/auth">Log in</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
