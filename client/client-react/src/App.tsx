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
        <Route path='/profile' component={() => <h3>profile</h3>}/>
        <Route path='/profile/favorites' component={() => <h3>favorites</h3>}/>
        <Route path='/auth' component={AuthForm}/>
      </Switch>
    </div>
  );
}

export default App;
