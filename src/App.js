import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Survey from './survey.js';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Instruction from './instruction.js';
import { fetchData } from './action.js';

import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({});

// get [[{image, id}...], ...]
// post [[{id, bool}...], ...]
class App extends Component {
  constructor(props) {
    super();
    this.state = { showInstruction: true, question: null };
  }
  componentDidMount() {
    fetchData(
      data => this.setState({ question: data }),
      error => {
        console.log(error);
      }
    );
  }
  render() {
    // const { classes } = this.props;
    const surveyLoadSucceed = this.state.question != null;
    return (
      <div className="App">
        <Instruction />
        {surveyLoadSucceed ? (
          <Survey datas={this.state.question} workerid={'123'} />
        ) : (
          <Fade
            in={!surveyLoadSucceed}
            style={{ transitionDelay: surveyLoadSucceed ? '0ms' : '800ms' }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
