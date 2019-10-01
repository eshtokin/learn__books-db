import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";
import { UserInfoService } from "../../service/user-info.service";
import { connect } from "react-redux";
import { setUserStatus } from "../../store/actions/authentificatedInfoAction";

interface State {
  isUserAuth: boolean;
}

class Header extends React.Component<any, State> {
  private userInfoService: UserInfoService;

  constructor(props: any) {
    super(props);
    this.userInfoService = new UserInfoService();
    this.logOut = this.logOut.bind(this);
  }

  public logOut() {
    this.props.setUserStatus(false);
    this.userInfoService.logout();
  }

  render() {
    return (
      <nav className="col s12 myHeader">
        <div className="nav-wrapper teal">
          <Link className="brand-logo" to="/">
            Logo
          </Link>
          {this.props.isLogined
          ? <ul
              id="nav-mobile"
              className="right hide-on-med-and-down">
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
              {this.props.role === 1 
              ? <li>
                  <NavLink to="/user-manager" activeClassName="isActiveRoute" exact>
                    Users
                  </NavLink>
                </li>
              : null}
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
                      exact>
                      My favorites
                    </NavLink>
                  </li>
                  <li onClick={this.logOut}>
                    <NavLink to="/auth/login" activeClassName="isActiveRoute">
                      Log out
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          : <ul
              id="nav-mobile"
              className="right hide-on-med-and-down">
              <li>
                <NavLink to="/auth" activeClassName="isActiveRoute">
                  Log in
                </NavLink>
              </li>
            </ul> }
        </div>
      </nav>
    )
  }
}


const mapStateToProps = (state: any) => {
  return {
    ...state.authentificatedInfo
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserStatus: (status: boolean) => dispatch(setUserStatus(status))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)