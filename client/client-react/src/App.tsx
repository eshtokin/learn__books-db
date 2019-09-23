import React from 'react';
import './App.scss';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './shared/HeaderComponent/headerComponent'
import { Switch, Route } from 'react-router-dom';
import { AuthForm } from './AuthForm/authForm';
import GoogleBook from './Admin/Google-Book/googleBook';
import BookManager from './Admin/BookManager/BookManager';
import UserManager from './Admin/UserManager/userManager'
import FilteredBook from './shared/FilteredBook/filteredBook';
import TestPage from './Admin/testFile';
import Profile from './shared/Profile/profileComponent';
import Favorites from './shared/Favorites/favorites';

import ProtectedUserRoute from './guard/protectedUserRoute';
import ProtectedAdminRotue from './guard/protectedAdminRoute';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <ProtectedUserRoute path='/catalog' component={GoogleBook} />
        <ProtectedUserRoute path='/book-manager' component={BookManager} />
        <ProtectedUserRoute path='/filtered' component={FilteredBook} />
        <ProtectedAdminRotue path='/user-manager' component={UserManager} />
        <ProtectedUserRoute exact path='/profile' component={Profile} />
        <ProtectedUserRoute path='/profile/favorites' component={Favorites} />
        <Route path='/auth' component={AuthForm} />
        <ProtectedUserRoute path='/test' component={TestPage} />
        <Route path="*" component={() => <h3>404 Page not found</h3>}/>
      </Switch>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <h3>Home Page</h3>
    </>
  )
}

export default App;
