import React, {Component} from 'react';
import Axios from 'axios';
import {Button} from 'semantic-ui-react';
import Str from '@supercharge/strings';

class StartPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			generatedID: false
		}
	}
	continue = (e) => {
		e.preventDefault();
		if(this.state.generatedID){
			this.props.nextStep();
		}
	}

	genID = (e) => {
		var temp = [];
		var idString = Str.random(5);
		Axios.get(`http://localhost:4000/api/getIDStrings`)
		.then((response) => {
			temp = response.data;
		});
		while(temp.includes(idString)){
			idString = Str.random(5);
		}
		this.props.setID(idString);
		this.setState({generatedID: true});
	}

	render(){
		var displayID = this.state.generatedID ? (
				<h2>Your ID is {this.props.idString}</h2>
			) : (<h2>Please generate an ID</h2>);
		return(
			<div>
				<h1>Welcome to the LASR</h1>
				<Button onClick={this.genID}>Generate ID</Button>
				{displayID}
				<Button onClick={this.continue}>Continue</Button>
			</div>
		)
	}
}

export default StartPage;