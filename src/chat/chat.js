import React, { Component } from 'react';

class Chat extends Component{
render(){
	return(

		<div>
		  <div id ="content-wrap">
		  <span id="block"> 
				<div id="header" > <span id="welcome"> Welcome , You are online now </span> </div>
				<div id="output"> </div>
			 </span>
			 <form id='message'>
			<span id="InputMessage">
				
					<span><input type="text" id="InputMessage" /></span>
					<span><button  id="send"> Send </button></span>
				    <span><button  id="sendImage"> Send Image </button></span>
				

			</span>
			</form>
		  </div>
		</div>

		)
}}
export default Chat;