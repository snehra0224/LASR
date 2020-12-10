import React, { Component } from 'react';
import StartPage from './StartPage';
import Scored from './Scored';
import Unscored from './Unscored';

class Main extends Component {
	state = {
        step: 1,
        idString: '',
        section_scores: []
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
                return <Scored
                        nextStep = {this.nextStep}
                        idString = {this.state.idString}
                        setScores = {(section_scores) => this.setState({section_scores})}
                        />
            case 3:
                return <Unscored
                        nextStep = {this.nextStep}
                        />
        }
    }
}
export default Main;