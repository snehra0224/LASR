import React, { Component } from 'react';
import StartPage from './StartPage';
import LASR from './LASR';

class Main extends Component {
	state = {
        step: 1,
        idString: ''
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

     render(){
        const {step} = this.state;
        switch(step){
            case 1: 
                return <StartPage 
                        nextStep = {this.nextStep}
                        idString = {this.state.idString}
                        setID = {(idString) => this.setState({idString})}
                        />
            case 2:
                return <LASR
                        idString = {this.state.idString}
                        />
        }
    }
}

export default Main;