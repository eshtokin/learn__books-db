import React, { Suspense } from 'react';
import './App.scss';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './shared/HeaderComponent/headerComponent'
import { Switch, Route } from 'react-router-dom';
import ProtectedUserRoute from './guard/protectedUserRoute';
import ProtectedAdminRotue from './guard/protectedAdminRoute';

const GoogleBook = React.lazy(() => import('./Admin/Google-Book/googleBook'));
const BookManager = React.lazy(() => import('./Admin/BookManager/BookManager'));
const UserManager = React.lazy(() => import('./Admin/UserManager/userManager'));
const FilteredBook = React.lazy(() => import('./shared/FilteredBook/filteredBook'));
const Profile = React.lazy(() => import('./shared/Profile/profileComponent'));
const Favorites = React.lazy(() => import('./shared/Favorites/favorites'));
const AuthForm = React.lazy(() => import('./AuthForm/authForm'));

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<h3>Loading...</h3>}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <ProtectedUserRoute path='/catalog' component={GoogleBook} />
        <ProtectedUserRoute path='/book-manager' component={BookManager} />
        <ProtectedUserRoute path='/filtered' component={FilteredBook} />
        <ProtectedAdminRotue path='/user-manager' component={UserManager} />
        <ProtectedUserRoute exact path='/profile' component={Profile} />
        <ProtectedUserRoute path='/profile/favorites' component={Favorites} />
        <Route path='/auth' component={AuthForm} />
        <Route path="*" component={() => <h3>404 Page not found</h3>}/>
      </Switch>
      </Suspense>
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
