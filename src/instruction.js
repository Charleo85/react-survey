import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Collapse from 'material-ui/transitions/Collapse';

const styles = theme => ({
  // root: {
  //   width: '90%',
  // },
  dismissButton: {
    float: 'right'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  instruction: {
    fontSize: 'large',
    color: '#000000',
    fontWeight: 'bolder'
  },
  steps: {
    fontSize: 'large',
    color: '#111111'
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 800
  })
});

class Instruction extends Component {
  state = {
    activeStep: 0,
    isDismissed: false
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleDismiss = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        isDismissed: !prevState.isDismissed,
        activeStep: 0
      });
    });
  };

  render() {
    const { classes } = this.props;
    const steps = [
      'Choose the article of your interest',
      'Feedback on your choice',
      'Impression of the articles'
    ];
    const { activeStep } = this.state;

    const getStepContent = step => {
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
              Page 1. Each question consists of a block with the title and a
              text snippet of an article, like the following example:
              <img
                src={require('./img/example.jpg')}
                style={{ width: '100%', maxWidth: '500px', display: 'block' }}
              />
              - Make sure you read through each of them carefully and you will
              need to roughly remember the content of these snippets to answer
              questions in the next page.
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
              - Please select to what extent your choice of whether to read the
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
              Page 2. Each question consists of a block with a text snippet from
              an article block which may or may not appear in Page 1
              <br />
              - Please select whether the text snippet has appeared in Page 1 or
              not. If this text snippet appeared in the first page, please
              select "Appeared". Otherwise, please select "Not Appeared".
              <br />
              - Each decision should be independent.
              <br />
              - Please click "SUBMIT" in the bottom of the page to submit your
              results.
            </Typography>
          );
        default:
          return 'Unknown step';
      }
    };

    return (
      <Paper className={classes.root} elevation={4}>
        <Typography
          align="left"
          variant="headline"
          component="h1"
          className={classes.instruction}
        >
          {
            'This task is composed of two pages each with several questions, make sure you read and follow our instructions below to make choices:'
          }
        </Typography>
        <Collapse in={!this.state.isDismissed} timeout={'auto'}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {getStepContent(index)}
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography
                align="left"
                variant="body2"
                className={classes.steps}
              >
                Then you reach the end of the task and you will have your code
                generated to use on Amazon Mechanical Turk
              </Typography>
              <Button
                onClick={this.handleReset}
                variant="raised"
                className={classes.button}
              >
                Read Again
              </Button>
            </Paper>
          )}
        </Collapse>
        {this.state.isDismissed ? (
          <Button
            onClick={this.handleDismiss}
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.dismissButton}
          >
            <Icon>add</Icon>
          </Button>
        ) : (
          <Button
            onClick={this.handleDismiss}
            variant="fab"
            aria-label="dismiss"
            className={classes.dismissButton}
          >
            <Icon>close</Icon>
          </Button>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(Instruction);
