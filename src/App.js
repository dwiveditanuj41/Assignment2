import React, { Component } from 'react';
import './App.css';
import Home from './home page/home.js'
import Chat from './chat/chat.js'
import firebase,{provider,db} from './config/fbconfig.js'
import {BrowserRouter , Route , link , Redirect,Switch} from 'react-router-dom'

class App extends Component {
  state ={
    user:'',
    isSignedin:false,
    users:[]
  }
  
  login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider).then((result)=> {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user.displayName;

  let users=[]

db.collection("Authentication").add({
    user:user
}).then(

)

db.collection("Authentication").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
        users.push(doc.data().user);
this.setState({
  user:user,
  isSignedin:true,
  users:users
})
        
    });
});







});

}

logout=(e)=>{
  e.preventDefault();
  firebase.auth().signOut().then(function() {

     this.setState({
       user:'',
       isSignedin:false,
       users:[]
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
      <button onClick= {this.login.bind(this)} > Log in with Google </button> <br /><br /><br /><br />
      
        </form>
        </div> 
        </div>
    );}

    else{console.log(this.state.users)
      return(
      <div>
      <BrowserRouter>
         <Route to='/home' exact strict render={()=>{return(
          <div>
          <Home user={this.state.user} users={this.state.users} />


          </div>

         )}}/>
          </BrowserRouter>  
        </div>
       
      )
    }

  
  }
  

}

export default App;
