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


const App = withAuthInfo((props) => {
  var start = 0
  const logoutFunction = useLogoutFunction()
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions()
  // Or if you want to make links instead
  // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

  const redirectToSettingsPage = () => {
    if (document.getElementById("form").style.display === 'none') {
      document.getElementById("form").style.display = 'grid';
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

  const update = () => {
    var email, wpm, age, gender = null
    var config = {
      method: 'post',
      url: 'http://localhost:3001/' + '',
      data: {
        email: {email},
        wpm: {wpm},
        // shower & league things to be implemented
        age: {age},
        gender: {gender}
      }
    }
  }

  const thing = () => {
    var config = {
      method: 'get',
      url: 'https://v2.jokeapi.dev/joke/Any',
      headers: { }
    };
    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
    }).catch(function (error) {
      console.log(error);
    });
  }

  if (props.isLoggedIn) {
    return (
      <div>
        <p>You are logged in as {props.user.email}</p>
        <button onClick={() => redirectToAccountPage()}>Account</button>
        <button onClick={() => redirectToSettingsPage()}>Settings</button>
        <button onClick={() => logoutFunction(true)}>Logout</button>
        <div id="form" style={{display: "none"}}>
            <select>
              <option selected disabled>do you play leauge?</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            <input placeholder="The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog" onKeyDown={() => startTimer()} id="skibidi"/>



            {/* doesnt show for sum reason */}
            <p id="wpm">???</p>
            
            
            
            <input class="inner-element" type="date" id="dob" placeholder='date of birth'/>
            <input class="inner-element" type="number" id="shower_no" placeholder='how many showers do you take per day'/>
            <select>
              <option selected disabled>orientation</option>
              <option value="gay">gay</option>
              <option value="straight">straight</option>
            </select>
            <input placeholder="leetcode username" id="leetcode_uname"></input>
            


            

            {/* also doesnt show for sum reason */}
            <div>
              <button placeholder="search" onClick={() => searchLeetCode()}/>
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
