import React, {Component} from 'react';
import './App.css';
import Main from './components/Main';
import {Container} from 'semantic-ui-react';

class App extends Component {
  render(){
    return (
      <Container textAlign='center'>
        <Main />
      </Container>     
      )
  }
}

export default App;
