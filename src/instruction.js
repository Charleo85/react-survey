import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
    fontSize: '28px',
    color: '#111111'
  },
  highlight: {
    fontSize: '28px',
    fontStyle: 'italic',
    color: '#D50000'
    // backgroundColor: 'transparent',
    // backgroundImage:
      // 'linear-gradient(to bottom,rgba(255, 111, 0,.2),rgba(255, 111, 0,.2))'
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

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography
          align="left"
          variant="headline"
          component="h1"
          className={classes.instruction}
        >
            This task is composed of several questions over three pages. <span className={classes.highlight}>For questions in each page, instructions are different. </span> Please carefully read instructions on each page.
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Instruction);
