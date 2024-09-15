import logo from './logo.svg';
import './App.css';
import SmashLanding from './Landing';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'
import TinderLikeCard from './Card';
import axios from 'axios';

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

var start = null

const App = withAuthInfo((props) => {
  const logoutFunction = useLogoutFunction()
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions()
  // Or if you want to make links instead
  // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

  const redirectToSettingsPage = () => {
    if (document.getElementById("form").style.display == 'none') {
      document.getElementById("form").style.display = 'block';
    } else {
      document.getElementById("form").style.display = 'none';
    }
  }

  const startTimer = () => {
    if (!start) start = Date.now()
    
    var delta = Date.now() - start;
    document.getElementById("wpm").value = Math.floor(delta / 1000) + " wpm"

  }


  const searchLeetCode = () => {
    var username = document.getElementById("leetcode_uname").value;
    axios.get({
      method: 'get',
      url: "http://localhost:6969",
      params:{
        username: {username}
      }
    }).then((res) => {
      document.getElementById("leetcode_stats").value = res.json();
    })
  }

  const update = () => {}

  if (props.isLoggedIn) {
    return (
      <div>
        <p>You are logged in as {props.user.email}</p>
        <button onClick={() => redirectToAccountPage()}>Account</button>
        <button onClick={() => redirectToSettingsPage()}>Settings</button>
        <button onClick={() => logoutFunction(true)}>Logout</button>
        <div id="form">
            <select class="inner-element">
              <option selected disabled>do you play leauge?</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            <input class="inner-element" placeholder='The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog' onChange={() => startTimer()} id="skibidi"/>



            {/* doesnt show for sum reason */}
            <p class="inner-element" id="wpm">???</p>
            
            
            
            <input class="inner-element" type="date" id="dob" placeholder='date of birth'/>
            <input class="inner-element" type="number" id="shower_no" placeholder='how many showers do you take per day'/>
            <select class="inner-element">
              <option selected disabled>orientation</option>
              <option value="gay">gay</option>
              <option value="straight">straight</option>
            </select>
            <input class="inner-element" placeholder='leetcode username' id="leetcode_uname"/>
            


            

            {/* also doesnt show for sum reason */}
            <div>
              <button class="inner-element" placeholder="search" onClick={() => searchLeetCode()}/>
            </div>
            
            
            
            
            
            
            
            <span class="inner-element" id="leetcode_stats"/>

            <button class="inner-element" onClick={() => update()}>update</button>


        </div>
        <TinderLikeCard/>
      </div>
    )
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => redirectToLoginPage()}>Login</button>
        <button onClick={() => redirectToSignupPage()}>Signup</button>
        <SmashLanding />
      </div>
    )
  }
})

export default App;
