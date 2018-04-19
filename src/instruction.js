import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Collapse from 'material-ui/transitions/Collapse';

const styles = theme => ({
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
    fontSize: 'medium',
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

  render() {
    const { classes } = this.props;
    const steps = [
      'Choose the article of your interest',
      'Feedback on your choice',
      'Impression of the articles'
    ];

    return (
      <Paper className={classes.root} elevation={0}>
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
      </Paper>
    );
  }
}

export default withStyles(styles)(Instruction);
