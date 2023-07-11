import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ component: Component, ...props  }) => {
  console.log(props.loggedIn)
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
)}

export default ProtectedRouteElement;
