import React, { Component } from 'react';
import './App.css';
import Survey from './survey.js';
import { fetchData } from './action.js';

import { withStyles } from 'material-ui/styles';
import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({});

// get [[{image, id}...], ...]
// post [[{id, bool}...], ...]
class App extends Component {
	constructor(props) {
		super();
		this.state = { showInstruction: true, question: null, workerid: null };
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
		const surveyLoadSucceed = this.state.question != null;
		return (
			<div className="App">
				{surveyLoadSucceed ? (
					<Survey datas={this.state.question} />
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
