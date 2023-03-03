import React, { Component } from "react";
// import logo from './logo.svg';
import ipLogo from "./ippopay_logo.png";
import './App.css';

import { minStepsPasswordCorrection } from "./problem/passwordValidator";

class App extends Component {

  state = {
    pwd: "",
    assessmentResult: false,
    testArray: []
  }

  changePWD = (value) => {
    this.setState({ pwd: value });
  }

  verifyPassword = () => {
    let result = minStepsPasswordCorrection(this.state.pwd);
    this.setState({ assessmentResult: result });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ipLogo} className="App-logo" alt="logo" />
          <p>
            Assessments
          </p>
          <label htmlFor="as1">Input for assesment 1</label>
          <input id="as1" name="as1" type={"text"} onChange={e => this.changePWD(e.target.value)} />
          <button type='button' onClick={this.verifyPassword}> Check Password </button>
          <p>{`Result for Assessment 1 => ${this.state.assessmentResult !== false ? this.state.assessmentResult === 0 ? "Valid Password" : this.state.assessmentResult + " Steps need to be modified" : `not yet started`}`}</p>
        </header>
      </div>
    );
  }

}

export default App;
