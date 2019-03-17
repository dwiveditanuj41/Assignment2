import React, { Component } from 'react';

class Home extends Component{
	render(){
		return(
			<div>
       <div id="box" >
      <br /> <br />
     <span id="welcome-text"> Online Users</span> <br /> <br />
     {this.props.user.displayName}
        <br /> <br />
      </div>
    

      </div>
			)
	}
}

export default Home