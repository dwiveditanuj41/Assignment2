import React, { Component } from 'react';
import {BrowserRouter , Route , Link , Redirect,Switch} from 'react-router-dom'
import Chat from '../chat/chat.js';

var usersarray=new Array(50)
for(var i=0;i<50;i++)
{
	usersarray[i]=new Array(50)
}

class Home extends Component{
	onclick=()=>{
		document.getElementById("box").style.display='none'
		document.getElementById("link").style.display='none'
        document.getElementById("users").style.display='none'
        document.getElementById("chat").style.display='block'
	}
	state={
			user:this.props.user,
			usersobject:this.props.usersobject,
			fromUserId:this.props.fromUserId
		
		}
		
makeArray=()=>{
		for(var i=0;i<this.state.usersobject.user.length;i++)
		{
			usersarray[i][0]=this.state.usersobject.key[i]
		}

		for(var i=0;i<this.state.usersobject.user.length;i++)
		{
			usersarray[i][1]=this.state.usersobject.user[i]
		}
	}		



	
render(){
		 
		this.makeArray()
		 console.log(this.state.fromUserId)
		return(
			<div>
              <div id="box" >
                <span id="welcome-text"> Online Users</span> 
                  <br /> <br />
                </div>
                 <BrowserRouter>
               <div id="users">
                                   {usersarray.map(item => { var i=0;
                                   	if(item[i])
                                   		{
                                        return (
                                           <div>
                                          

                                            <Link to ={'/' + this.state.fromUserId +'/'+ item[0]} id="link" onClick={this.onclick}>{item[1]}</Link>
                                
                                            </div>
                                        )
                                        i=i+2;
                                       }
                                    })}
                                
                   </div>

                   <div id="chat">
                                    {usersarray.map(item => {var j=0;
                                    	if(item[j])
                                    		{
                                        return (
                                          <div>

                                              <Route exact={true} path={'/' + this.state.fromUserId + '/' + item[0]} render={()=><div><Chat fromUserId={this.state.fromUserId} currentUser={this.state.usersobject.currentUser} user={item[1]}/></div>}/>
   
                                           </div>
                                        )
                                        j=j+2;
                                       }
                                    })}

                               
                   </div>
                    </BrowserRouter>


            </div>
			)}
			
		

}
		



export default Home