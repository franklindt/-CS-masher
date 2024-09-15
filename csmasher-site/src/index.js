import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "@propelauth/react";
// import Authorize from './auth';
import reportWebVitals from './reportWebVitals';
// import { initBaseAuth } from '@propelauth/node';


// const {
//   validateAccessTokenAndGetUser,
//   fetchUserMetadataByUserId,
//   // ...
// } = initBaseAuth({
//   authUrl: "https://8458970.propelauthtest.com",
//   apiKey: "8038169eecdfece6c9404a65038e6271412c61eb33dd150b3e34d156119edfb6efdfb6d5ded73e8120a14309e9b7ba69", 
//   manualTokenVerificationMetadata: {
//       verifierKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6Ln2dDW5YRDwu8HSoltXstx/XJTlDybaYjy9hPAY+nQs4mYNTed1cnuGIGjBp8YbdqW9etAmAZB/8ej/B4pCBzjG697n4oWWhUMH3FXG93jnqYCjV9Q0HMadVv6dPOaWY3urWuiJ7ZfjVfZAprjOlfacAoGDIEwrHcmYpCEkVAEumBLaQCXlaJP1xYKMAvD2V9XyCCK0334oezOMlDCLFhkG0EtnBUPodnpcf8iuEBjoIdfxjchS2ZL197cv8k3uIQQzcZpwwirX197id3DYCg9KPbduYeSFrgUkJCAAreOm5hvM8phcXft4CDG601E1uJFniQIfDZqs6bai7TPaawIDAQAB",
//       issuer: "https://8458970.propelauthtest.com",
//   }
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider authUrl={process.env.REACT_APP_AUTH_URL}>
      <App />
  </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
