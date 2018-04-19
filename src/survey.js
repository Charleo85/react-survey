import React, { Component } from 'react';
import { ImgChoiceType, TextChoiceType } from './choice.js';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { has, get, set, reduce } from 'lodash';
import { submitResponse } from './action.js';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';

const styles = theme => ({
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
  },
  formControl: {
    marginTop: 10,
    marginBottom: 50,
    maxWidth: 200,
    display: 'flex',
    margin: 'auto'
  },
  formText:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 'large',
    fontStyle: 'italic',
  },
  highlight: {
    fontSize: 'large',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
    backgroundImage:
      'linear-gradient(to bottom,rgba(255, 111, 0,.2),rgba(255, 111, 0,.2))'
  },
  steps: {
    fontSize: 'medium',
    color: '#333333'
  },
  instruction: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 800
  })
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

const getStepContent = (classes, step) => {
    switch (step) {
      case 0:
        return (
          <Typography
            paragraph
            align="left"
            variant="body2"
            component="p"
            className={classes.steps}
          >
            Step 1. Each question consists of a block with the title and a
            text snippet of an article, like the following example:
            <img
              src={require('./img/example.jpg')}
              style={{ width: '100%', maxWidth: '500px', display: 'block' }}
            />
            - Make sure you{' '}
            <span className={classes.highlight}>read through</span> each of
            them carefully and you will need to roughly{' '}
            <span className={classes.highlight}>remember</span> the content of
            these snippets to answer questions in the next page.
            <br />
            - Please select whether you will read this article or not, after
            reading its title and text snippet.
            <br />
            - If you will read the article, please select "Interested".
            Otherwise, select "Not Interested".
            <br />
            - Each decision must be independent.
            <br />
            - Please click "Next" in the bottom of the page to finish the rest
            questions on Page 1.
          </Typography>
        );
      case 1:
        return (
          <Typography
            paragraph
            align="left"
            variant="body2"
            component="p"
            className={classes.steps}
          >
            Step 2. Please select to what extent your choice of whether to read the
            article or not is affected by the article title, text snippet as
            well as the article topic you infer from the text.
            <br />
            - 0 represents for 'has not effect at all'
            <br />
            - 1 represents for 'has a little effect'
            <br />
            - 2 represents for 'is somewhat affected'
            <br />
            - 3 represents for 'has considerable effect'
            <br />
            - 4 represents for 'is completely affected'
            <br />
            - Please click "NEXT" in the bottom of the page to enter Page 2.
          </Typography>
        );
      case 2:
        return (
          <Typography
            paragraph
            align="left"
            variant="body2"
            component="p"
            className={classes.steps}
          >
            Step 3. Each question consists of a block with a text snippet from
            an article block which may or may not appear in Page 1
            <br />
            - Please select whether the text snippet has appeared in Page 1 or
            not. If this text snippet appeared in the first page, please
            select <span className={classes.highlight}>"Appeared"</span>.
            Otherwise, please select{' '}
            <span className={classes.highlight}>"Not Appeared"</span>.
            <br />
            - Each decision should be independent.
            <br />
            - Please click "SUBMIT" in the bottom of the page to submit your
            results.
          </Typography>
        );
      case 3:
        return (
          <div>
            <Typography
              paragraph
              align="left"
              variant="body2"
              component="p"
              className={classes.steps}
            >
              You should be able to find your MTurk worker ID on the top of the Amazon MTurk Dashboard. You may just enter your name if you are not a MTurk worker
            </Typography>
            <Typography className={classes.formText} align="center" variant="body1">
              NOTE: If you do not correctly enter your MTurk worker ID, we cannnot guarantee to pay you.
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

//submitProgress 0: initial 1: sent 2:success 3:retry
class Survey extends Component {
  constructor(props) {
    super();
    this.state = {
      submitProgress: 0,
      selected: prepareSubmission(props.datas),
      numSelected: 0,
      pageID: 0,
      stepID: 0,
      onReasoning: false,
      msg: '',
      workerid: '',
    };
  }

  buttonAction() {
    if (this.state.pageID >= 2) {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          submitProgress: 1,
          pageID: 3
        })
      );
      const success = msg =>
        this.setState(prevState =>
          Object.assign(prevState, { submitProgress: 2, msg })
        );
      const fail = msg =>
        this.setState(prevState =>
          Object.assign(prevState, { submitProgress: 3, msg })
        );
      submitResponse(
        { data: this.state.selected, workerid: this.state.workerid },
        success,
        fail
      );
      //submit selected
    } else if (!this.state.onReasoning) {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          onReasoning: true,
          stepID: prevState.stepID + 1
        })
      );
    } else {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          pageID: prevState.pageID + 1,
          stepID: prevState.stepID + 1
        })
      );
    }
    window.scrollTo(0,0);
  }

  reasoningAction = data => (type, choice) => {
    // console.log(data, this.state.selected);

    const pageID = this.state.pageID;
    this.setState(prevState => {
      if (
        has(prevState, ['selected', pageID, data, 'topic']) +
          has(prevState, ['selected', pageID, data, 'text']) +
          has(prevState, ['selected', pageID, data, 'title']) ===
        2 && !has(prevState, ['selected', pageID, data, type])
      ) {
        set(prevState, 'numSelected', prevState.numSelected + 1);
      }
      set(prevState, ['selected', pageID, data, type], choice);

      return prevState;
    });
  };

  selectAction = data => choice => {
    // console.log(data, this.state.selected);

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

  handleChange = event => {
    this.setState({ workerid: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {pageID, stepID} = this.state;
    const selectable = this.props.datas[pageID]
      ? this.state.numSelected < this.props.datas[pageID].length
      : false;
    const inSubmissionPage = pageID >= 2;
    const submissionSent = this.state.submitProgress === 1;
    const submissionSucceed = this.state.submitProgress === 2;
    const failed = this.state.submitProgress === 3;

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
              {'Success!   MTurk Code: ' + this.state.msg}
              <br />
              {'Thanks for helping us on this survey!'}
            </h1>
          );
        case 3:
          return (
            <h1 className="App-title">
              {'You did not follow the instruction and your response is not valid. We are sorry that we cannot pay you:('}
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
            <div>
            <FormControl className={classes.formControl} aria-describedby="name-helper-text">
              <InputLabel htmlFor="name-helper">MTURK Work ID</InputLabel>
              <Input id="name-helper" value={this.state.workerid} onChange={this.handleChange} />
              <FormHelperText id="name-helper-text" style={{cursor: 'pointer'}} onClick={()=>{window.open('https://worker.mturk.com', '_blank');}}>
                Here is a shortcut to your Amazon MTurk Dashboard
              </FormHelperText>
            </FormControl>
          </div>
          );
        case 3:
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
        <Paper className={classes.instruction} elevation={4}>
          {getStepContent(classes, stepID)}
        </Paper>
        {conditionalRendering(pageID)}
        <Button
          size="large"
          disabled={selectable || submissionSucceed || submissionSent || failed}
          variant="raised"
          color="primary"
          onClick={this.buttonAction.bind(this)}
          className={classes.button}
        >
          {inSubmissionPage ? 'Submit' : 'Next'}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Survey);
