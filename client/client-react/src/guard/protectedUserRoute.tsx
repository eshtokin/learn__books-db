import React from 'react';
import { Route, Redirect } from 'react-router';
import userGuardService from './userGuardService';

export default function ProtectedUserRoute({component: Component, ...rest}: any ) {
  return (
    <Route {...rest} render={
      (props) => {
        if (userGuardService.canActivate()) {
          return  <Component {...props} />    
        } else {
          return <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        }
      }
    }/>
  )
}