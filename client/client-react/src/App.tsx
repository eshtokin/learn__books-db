import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './shared/HeaderComponent/headerComponent'
import { Switch, Route } from 'react-router-dom';
import { AuthForm } from './AuthForm/authForm';
import { GoogleBook } from './Admin/Google-Book/googleBook';
import  BookManager from './Admin/BookManager/BookManager';
import UserManager from './Admin/UserManager/userManager'
import FilteredBook from './shared/FilteredBook/filteredBook';
import TestPage from './Admin/testFile';
import Profile from './shared/Profile/profileComponent';
import Favorites from './shared/Favorites/favorites';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={() => <h3>home</h3>}/>
        <Route path='/catalog' component={ GoogleBook }/>
        <Route path='/book-manager' component={ BookManager }/>
        <Route path='/filtered' component={ FilteredBook }/>
        <Route path='/user-manager' component={ UserManager }/>
        <Route exact path='/profile' component={ Profile }/>
        <Route path='/profile/favorites' component={ Favorites }/>
        <Route path='/auth' component={AuthForm}/>
        <Route path='/test' component={TestPage}/>
      </Switch>
    </div>
  );
}

export default App;
