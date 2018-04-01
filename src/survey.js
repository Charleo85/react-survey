import React, { Component } from 'react';
import { ImgChoiceType, TextChoiceType } from './choice.js';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { has, get, set, reduce } from 'lodash';
import { submitResponse } from './action.js';

const styles = theme => ({
  instruction: {
    fontSize: 'large',
    margin: '20 20 0 0px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    marginBottom: 25
  },
  placeholder: {
    marginTop: 50,
    height: 80
  }
});

const prepareSubmission = obj =>
  reduce(
    obj,
    (results, value) => {
      results.push(
        reduce(
          value,
          (result, val) => {
            result[val.id] = null;
            return result;
          },
          {}
        )
      );
      return results;
    },
    []
  );

//submitProgress 0: inital 1: sent 2:success 3:retry
class Survey extends Component {
  constructor(props) {
    super();
    this.state = {
      submitProgress: 0,
      selected: prepareSubmission(props.datas),
      numSelected: 0,
      pageID: 0,
      onReasoning: false,
      mTurkCode: ''
    };
  }

  buttonAction() {
    if (this.state.pageID >= 1) {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          submitProgress: 1,
          pageID: 2
        })
      );
      const success = mTurkCode =>
        this.setState(prevState =>
          Object.assign(prevState, { submitProgress: 2, mTurkCode })
        );
      const fail = () =>
        this.setState(prevState =>
          Object.assign(prevState, { submitProgress: 3 })
        );
      submitResponse({ data: this.state.selected }, success, fail);
      //submit selected
    } else if (!this.state.onReasoning) {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          onReasoning: true
        })
      );
    } else {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          pageID: prevState.pageID + 1
        })
      );
    }
  }

  reasoningAction = data => (type, choice) => {
    console.log(data, this.state.selected);

    const pageID = this.state.pageID;
    this.setState(prevState => {
      if ( (has(prevState, ['selected', pageID, data, 'topic']) + has(prevState, ['selected', pageID, data, 'text']) + has(prevState, ['selected', pageID, data, 'title'])) === 2) {
        set(prevState, 'numSelected', prevState.numSelected + 1);
      }
      set(prevState, ['selected', pageID, data, type], choice);

      return prevState;
    });
  };

  selectAction = data => choice => {
    console.log(data, this.state.selected);

    const pageID = this.state.pageID;
    const result = get(this.state, ['selected', pageID, data, 'choice']);

    this.setState(prevState => {
      if (result == null) {
        set(prevState, 'numSelected', prevState.numSelected + 1);
      }
      set(prevState, ['selected', pageID, data, 'choice'], choice);
      return prevState;
    });
  };

  render() {
    const { classes } = this.props;
    const pageID = this.state.pageID;
    const selectable = this.props.datas[pageID] ? (this.state.numSelected < this.props.datas[pageID].length) : false;

    const inSubmissionPage = pageID >= 1;
    const submissionSent = this.state.submitProgress === 1;
    const submissionSucceed = this.state.submitProgress === 2;
    const canRetry = this.state.submitProgress === 3;

    const renderSubmissionState = submitProgress => {
      switch (submitProgress) {
        case 1:
          return (
            <Fade
              in={!submissionSucceed}
              style={{ transitionDelay: submissionSucceed ? '0ms' : '800ms' }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          );
        case 2:
          return (
            <h1 className="App-title">
              {'Success!   MTurk Code: ' + this.state.mTurkCode}
              <br />
              {'Thanks for helping us on this survey!'}
            </h1>
          );
        case 3:
          return (
            <h1 className="App-title">
              {'Oops please try submit the survey again'}
            </h1>
          );
        default:
          return null;
      }
    };

    const conditionalRendering = pageID => {
      switch (pageID) {
        case 0:
          return (
            <div>
              {this.props.datas[0].map(data => (
                <ImgChoiceType
                  onReasoning={this.state.onReasoning}
                  data={data.img}
                  key={`${pageID}.${data.id}`}
                  onClick={this.selectAction(data.id)}
                  reasoning={this.reasoningAction(data.id)}
                />
              ))}
            </div>
          );
        case 1:
          return (
            <div>
              {this.props.datas[1].map(data => (
                <TextChoiceType
                  data={data.content}
                  key={`${pageID}.${data.id}`}
                  onClick={this.selectAction(data.id)}
                />
              ))}
            </div>
          );
        case 2:
          return (
            <div className={classes.placeholder}>
              {renderSubmissionState(this.state.submitProgress)}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div>
        {conditionalRendering(pageID)}
        <Button
          size="large"
          disabled={selectable || submissionSucceed || submissionSent}
          variant="raised"
          color="primary"
          onClick={this.buttonAction.bind(this)}
          className={classes.button}
        >
          {inSubmissionPage ? (canRetry ? 'Resubmit' : 'Submit') : 'Next'}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Survey);
