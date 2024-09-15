import logo from './logo.svg';
import './App.css';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = withAuthInfo((props) => {
  const logoutFunction = useLogoutFunction()
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions()
  // Or if you want to make links instead
  // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

  if (props.isLoggedIn) {
      return (
          <div>
              <p>You are logged in as {props.user.email}</p>
              <button onClick={() => redirectToAccountPage()}>Account</button>
              <button onClick={() => logoutFunction(true)}>Logout</button>
          </div>
      )
  } else {
      return (
          <div>
              <p>You are not logged in</p>
              <button onClick={() => redirectToLoginPage()}>Login</button>
              <button onClick={() => redirectToSignupPage()}>Signup</button>
          </div>
      )
  }
})

export default App;
