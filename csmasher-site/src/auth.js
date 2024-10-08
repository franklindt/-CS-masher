import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, RequiredAuthProvider, RedirectToLogin } from "@propelauth/react";
// import Authorize from './auth';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authUrl={process.env.REACT_APP_AUTH_URL}>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default root;
