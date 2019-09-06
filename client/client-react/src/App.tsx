import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './shared/header/header'
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={() => <h3>home</h3>}/>
        <Route path='/catalog' component={() => <h3>catalog</h3>}/>
        <Route path='/gbooks' component={() => <h3>gbooks</h3>}/>
        <Route path='/user-manager' component={() => <h3>user-manager</h3>}/>
        <Route path='/profile' component={() => <h3>profile</h3>}/>
        <Route path='/profile/favorites' component={() => <h3>favorites</h3>}/>
        <Route path='/auth' component={() => <h3>auth</h3>}/>
        <Route path='/auth/login' component={() => <h3>Login</h3>}/>
      </Switch>
    </div>
  );
}

export default App;
