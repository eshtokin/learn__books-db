import React from 'react';
import adminGuardService from './adminGuardService';
import { Redirect, Route } from 'react-router';

export default function ProtectedAdminRotue({component: Component, ...rest}: any) {
  return (
    <Route {...rest} render={
      (props) => {
        if (adminGuardService.canActivate()) {
          return <Component {...props} />
        } else {
          return <Redirect to={{pathname: '/home', state: {from: props.location}}} />
        }
      }
    } />
  )
}