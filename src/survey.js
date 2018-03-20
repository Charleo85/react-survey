import React, { Component } from 'react';
import Choice from './choice.js';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { set, reduce } from 'lodash';

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
    marginTop: 20,
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
            result[val.id] = false;
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
      pageID: 0
    };
  }

  buttonAction() {
    if (this.state.pageID === 1) {
      this.setState(prevState =>
        Object.assign(prevState, { numSelected: 0, submitProgress: 1 })
      );
      //submit selected
      setTimeout(() => {
        this.setState(prevState =>
          Object.assign(prevState, {
            submitProgress: Math.random() > 0.5 ? 2 : 3
          })
        );
      }, 3000);
    } else {
      this.setState(prevState =>
        Object.assign(prevState, {
          numSelected: 0,
          pageID: prevState.pageID + 1
        })
      );
    }
  }

  selectAction = data => () => {
    // console.log(data, this.state.selected);
    const selectionCap = this.props.needSelected[this.state.pageID];
    const selectable = this.state.numSelected < selectionCap;
    const curSelected = this.state.selected[this.state.pageID];
    if (curSelected[data]) {
      this.setState(prevState => {
        set(prevState, ['selected', this.state.pageID, data], false);
        set(prevState, 'numSelected', prevState.numSelected - 1);
        return prevState;
      });
    } else {
      if (selectable) {
        this.setState(prevState => {
          set(prevState, ['selected', this.state.pageID, data], true);
          set(prevState, 'numSelected', prevState.numSelected + 1);
          return prevState;
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const pageID = this.state.pageID;
    const selectionCap = this.props.needSelected[pageID];
    const selectable = this.state.numSelected < selectionCap;
    const dataOnPage = this.props.datas[pageID];

    const inSubmissionPage = pageID === 1;
    const inSurvey = this.state.submitProgress === 0;
    const submissionSucceed = this.state.submitProgress === 2;
    const canRetry = this.state.submitProgress === 3;

    return (
      <div>
        {inSurvey && (
          <Typography component="h1" className={classes.instruction}>
            {inSubmissionPage
              ? `Select the ${selectionCap} article decriptions you have seen in the last page`
              : `Select exactly ${selectionCap} articles you want to read mostly`}
          </Typography>
        )}
        {inSurvey ? (
          dataOnPage.map(data => (
            <Choice
              selectable={selectable}
              isMedia={!inSubmissionPage}
              data={data.img}
              key={`${pageID}.${data.id}`}
              onClick={this.selectAction(data.id)}
            />
          ))
        ) : (
          <div className={classes.placeholder}>
            {submissionSucceed ? (
              <Typography>{'Success!   MTurk Code: 123456'}</Typography>
            ) : (
              !canRetry && (
                <Fade
                  in={!submissionSucceed}
                  style={{
                    transitionDelay: !submissionSucceed ? '800ms' : '0ms'
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              )
            )}
          </div>
        )}
        {inSurvey && (
          <Typography className={classes.instruction}>
            {'You have selected ' + this.state.numSelected}
          </Typography>
        )}
        <Button
          size="large"
          disabled={selectable && !canRetry}
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
