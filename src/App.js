import React, { Component } from 'react';
import './App.css';
import Home from './home page/home.js'
import Chat from './chat/chat.js'
import firebase,{provider,db} from './config/fbconfig.js'
import {BrowserRouter , Route , link} from 'react-router-dom'

class App extends Component {
  state ={
    user:'',
    isSignedin:false
  }
  
  login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider).then((result)=> {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;

this.setState({
  user:user,
  isSignedin:true
})

});
}

logout=(e)=>{
  e.preventDefault();
  firebase.auth().signOut().then(function() {

     this.setState({
       user:'',
       isSignedin:false
})
  
});
}
  
  render() {
    if(!this.state.isSignedin)
    {
    return (
      <div>
      <div id="box" >
      <br /> <br />
       <span id="welcome-text"> WELCOME </span> <br /> <br />
        <br /> <br />
        <form id="get-user-name">
      <button onClick= {this.login} > Log in with Google </button> <br />
      <button onClick= {this.toHome} > Sign Up with Google </button> <br /> <br /> <br /> <br />
        </form>
        </div> 
        </div>
    );}

    else{
      return(
      <div>
         <Home user={this.state.user}/>
        </div> 
      )
    }
  }
}

export default App;
