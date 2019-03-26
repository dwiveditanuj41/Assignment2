import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;
import 'firebase/auth' ;




class Chat extends Component{
	constructor(props){
        super(props);

        this.state = {
        	user:this.props.currentUser,
            username: '',
            message: '',
            messages: [],
            fromUserId:this.props.fromUserId,
			recive: this.props.recive,
			InputMessage: '',
			file: ''
        };
		
		
		
		firebase.firestore().collection('Message').doc(firebase.auth().currentUser.uid).collection("To").doc(this.state.recive).collection("Sent").orderBy('time').onSnapshot(snapshot =>{
		let changes = snapshot.docChanges();
		changes.forEach(doc=> {
		
		if(doc.type== "added")
		{
			rendermessage(doc.doc);
		}
		
		})
		
		})
		
		
		
		
		
		
		
		function rendermessage(doc)
		{


			const output = document.querySelector('#output');
			let user = document.createElement('div');
			user.setAttribute('id', 'user');
	        user.textContent = doc.data().user;
			let local = document.createElement('div');
			local.setAttribute('id', 'messages');
			let img = document.createElement('img');
			let br = document.createElement('br');
			if(doc.data().message)
			{
			
			local.textContent = doc.data().message
			local.appendChild(user);

			}
			
			
			if(doc.data().imgURL)
			{
				
				img.setAttribute('src', doc.data().imgURL);
				img.setAttribute('id', 'img');
				img.appendChild(user);
			}
			
			if(!(doc.data().message) && !(doc.data().imgURL))
			{
				output.appendChild(user);
			output.appendChild(local);

			output.appendChild(img);
            output.scrollTop = output.scrollHeight;
				
			}
			else if(!(doc.data().message) && (doc.data().imgURL))
			{
				output.appendChild(user);
				output.appendChild(img);
            output.scrollTop = output.scrollHeight;
			}
			else if((doc.data().message) && !(doc.data().imgURL))
			{
				output.appendChild(user);
				output.appendChild(local);
            output.scrollTop = output.scrollHeight;
			}
			else
			{
			alert("No message or image found");
			}
			
			
			
		}
	}
		
		sendmessage = (e) =>
		{
            
			e.preventDefault();
	var uploader = document.getElementById("uploader");
	uploader.value = 0;
			document.getElementById("InputMessage").value="";
			
			
			if(this.state.InputMessage!="")
			{firebase.firestore().collection("Message").doc(firebase.auth().currentUser.uid).collection("To").doc(this.state.recive).collection("Sent").doc().set({
				message: this.state.InputMessage, 
				user: firebase.auth().currentUser.displayName,  //chamge uid into anything you want to display
				time : new Date()
				
			});	

			firebase.firestore().collection("Message").doc(this.state.recive).collection("To").doc(firebase.auth().currentUser.uid).collection("Sent").doc().set({
				message: this.state.InputMessage,
				user: firebase.auth().currentUser.displayName  //chamge uid into anything you want to display
			});	
         

		}
			
			
			if(this.state.file)
			{
				
					var storeRef = firebase.storage().ref('Insta/').child(this.state.file);
					var file = e.target.file.files[0];
					storeRef.put(file).then(
					
					firebase.storage().ref('Insta/' + this.state.file).getDownloadURL().then((url)=>{
						
						firebase.firestore().collection("Message").doc(firebase.auth().currentUser.uid).collection("To").doc(this.state.recive).collection("Sent").doc().set({
				imgURL: url,
			    user: firebase.auth().currentUser.displayName,
				time: new Date()
			});
			
			
			
			//
			
			firebase.firestore().collection("Message").doc(this.state.recive).collection("To").doc(firebase.auth().currentUser.uid).collection("Sent").doc().set({
				imgURL: url,
				user: firebase.auth().currentUser.displayName,
				time: new Date()
			});	
			
			//
						
					}
				
						
			
					
					)
						
				)
			}
		if(!this.state.file && !this.state.InputMessage)
		{
			alert("Please type a message or select a file")
		}
			
			this.state.file ='';
			this.state.InputMessage="";

		
			
			
		}
		messagein =(e) =>
		{
			this.setState({ [e.target.id] : e.target.value});

		}
		
		sendImg =(e) =>
		{
			e.preventDefault();
			
		}
		filechange =(e) =>
		{
			e.preventDefault();
		if(e.target.files[0]){
				this.setState({
				file: e.target.files[0].name
		})
			
			var file = e.target.files[0];
			var filename = this.state.file;
			var storeRef = firebase.storage().ref('Insta/').child(file.name);
			var task = storeRef.put(file);
			var uploader = document.getElementById("uploader");
			
			var post = document.getElementById("send");
			task.on('state_changed', function progress(snapshot){
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
			uploader.value = percentage;
			if(uploader.value==100) {post.textContent="Send Image";}
			else { post.textContent="Uploading Image"}
			
		})
		}
		else
		{
			var uploader = document.getElementById("uploader");
			var post = document.getElementById("send");
			post.textContent = "Send Message";
			uploader.value = 0;
			
			this.setState({
				file: ''
			})
		}
			
		}
		
		upload=(e) =>
		{
			e.preventDefault();
			var file = e.target.file.files[0];
			var filename = this.state.file;
			if(filename)
			{
				var storeRef = firebase.storage().ref('Insta/').child(file.name);
				storeRef.put(file).finally(
				firebase.storage().ref('Insta/' + this.state.filename).getDownloadURL().finally((url) =>{
						firebase.firestore().collection("Message").doc(firebase.auth().currentUser.uid).collection("To").doc(this.state.recive).collection("Sent").doc().set({
							user: firebase.auth().currentUser.displayName,
				fileurl: url
			})
				firebase.firestore().collection("Message").doc(this.state.recive).collection("To").doc(firebase.auth().currentUser.uid).collection("Sent").doc().set({
					user: firebase.auth().currentUser.displayName,
				fileurl: url
			});		
					
				})
				)
			}
		}
		
		back =(e) =>
		{
			var b = document.getElementById("box2");
			b.style.display = 'block';
			var header = document.getElementById("content-wrap");
			var users = document.getElementById("users");
			users.style.display = 'block';
			header.style.display = 'none';
			var back = document.getElementById("back");
			back.style.display = 'none';
		}
	
		
		
		
render(){

	
	return(

		<div>
		<span id="back" onClick = {this.back}> Back </span>
		  <div id ="content-wrap">
		  <span id="block"> 
		  
				<div id="header" > <span id="welcome"> Welcome {firebase.auth().currentUser.displayName} </span> </div>
				<div id="output">
					
			
				</div>
			 </span>
			 <form id='message' onSubmit={this.sendmessage}>
			<span id="InputMessages">
				
					<span><input type="text" id="InputMessage"  onChange={this.messagein} /></span>
					<span><button  id="send" > Send </button></span>
					<span><input type = "file" id="file" onChange = {this.filechange} /> </span>
				    <progress value="0" max="100" id="uploader" > 0%  </progress>
				

			</span>
			</form>
			
			
		  </div>
		</div>

		)
}}
export default Chat;