import React, { Component } from 'react';
import './App.css';
import Home from './home page/home.js'
import Chat from './chat/chat.js'
import firebase,{provider,db} from './config/fbconfig.js'
import {BrowserRouter , Route , Link , Redirect,Switch} from 'react-router-dom'
var user
var users
var key
var id

class App extends Component {
  state ={
    user:'',
    id:'',
   
    isSignedin:false,
    usersobject:{
      currentUser:'',
            user:[],
            key:[]

       }

  }
  GoTo=()=>{
    document.getElementById("GoTo").style.display='none'
    

  }
  
  login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider).then((result)=> {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user.displayName;
    id=result.user.uid
    users=[]
    key=[]

db.collection("Authentication").doc(result.user.uid).set({
    user:user
}).then(

)

db.collection("Authentication").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
        users.push(doc.data().user);
        key.push(doc.id);

 


    });
    this.setState({
  user:user,
  id:id,
  isSignedin:true,
  usersobject:{
       currentUser:user,
       user:users,
       key:key
  }
})
});




});


}
      


logout=(e)=>{
  e.preventDefault();
  firebase.auth().signOut().then(function() {

     this.setState({
       user:'',
       isSignedin:false,
       usersobject:{
            user:[],
            key:[]
       }
})
  
});
}
  
  render() {
   console.log(this.state.id)

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

    else{
      return(
      <div>
      <BrowserRouter>
         <Route to={'/'} exact strict render={()=>{return(
          <div>
          <div id="GoTo">
          <Link to={'/'+id} onClick={this.GoTo} id="welcome-text">Go To My ChatRoom</Link>
          </div>
          <Route exact={true} path={'/' + id} render={()=><div> <Home GoTo={this.state.GoTo} fromUserId={this.state.id} usersobject={this.state.usersobject}/></div>}/>
         



          </div>

         )}}/>
          </BrowserRouter>  
        </div>
       
      )
    }

  
  }
  

}

export default App;
