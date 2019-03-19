import React, { Component } from 'react';
import {BrowserRouter , Route , Link , Redirect,Switch} from 'react-router-dom'
import Chat from '../chat/chat.js';

class Home extends Component{
	onclick=()=>{
		document.getElementById("box").style.display='none'
		document.getElementById("link").style.display='none'
        document.getElementById("users").style.display='none'
        document.getElementById("chat").style.display='block'
	}
	state={
			user:this.props.user,
			users:this.props.users
		}

	
	render(){
		
		
		return(
			<div>
              <div id="box" >
                <span id="welcome-text"> Online Users</span> 
                  <br /> <br />
                </div>
                 <BrowserRouter>
               <div id="users">
                                    {this.state.users.map(user => {
                                        return (
                                           <div>
                                          

                                            <Link to ={'/' + user} id="link" onClick={this.onclick}>{user}</Link>
                                
                                            </div>
                                        )
                                    })}
                                
                   </div>

                   <div id="chat">
                                    {this.state.users.map(user => {
                                        return (
                                          <div>

                                              <Route exact={true} path={'/' + user} render={()=><div><Chat user={user}/></div>}/>
   
                                           </div>
                                        )
                                    })}

                               
                   </div>
                    </BrowserRouter>


            </div>
			)}
		

}
		



export default Home