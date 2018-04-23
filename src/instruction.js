import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import {Bullet, Title, TextSnippet, Topic, stepDescription} from './constant.js';

const styles = theme => ({
	dismissButton: {
		float: 'right'
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
  mainText: {
    fontSize:'20px'
  },
	highlight: {
		color: '#D50000'
	},
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900
  }),
  gridContainer: {
    display: 'grid'
  },
  gridItem: {
    textAlign: 'center',
  },
  steps: {
    fontSize: 'medium',
    color: '#333333'
  },
  page: {
    fontSize: '20px',
    color: '#0091EA'
  },
  formText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 'large',
    fontStyle: 'italic'
  }
});

const getStepContent = (classes, step) => {
	switch (step) {
	case 0:
		return (
			<Typography
				paragraph
				align="left"
				variant="body2"
				component="div"
				className={classes.steps}
			>
				<span className={classes.page}>Page 1. </span>
          There are 4 questions on this page. For each question, we present the <Title/> of the article follow by a <TextSnippet/> of the article to you, like the example below:
				<img
					src={require('./img/example.png')}
					alt={'example'}
					style={{ width: '100%', maxWidth: '500px', display: 'block', margin: 'auto'}}
				/>
				<span className={classes.page}>Instructions:</span> <br />
        <Bullet/>After you read the <Title/> and <TextSnippet/>, tell us whether you will click and read more of the article. <br />
        <Bullet/>Each choice should be independent. <br />
				<Bullet/>The content of the <Title/> and <TextSnippet/> are useful to finish the rest part of the survey, so you need to read them careful enough that you can
        <span className={classes.highlight}> roughly remember </span>them at the Page 3 of this survey. <br />
				<Bullet/>Please click "NEXT" in the bottom after finishing all questions.
			</Typography>
		);
	case 1:
		return (
			<Typography
				paragraph
				align="left"
				variant="body2"
				component="div"
				className={classes.steps}
			>
				<span className={classes.page}>Page 2. </span>
          Based on your choice of whether to read the article or not on page 1, please select how much <Title/>, <TextSnippet/> and the <Topic/> you inferred from the title and text snippet influence your choice.
          We categorize such influence to the five levels below: <br />
          <div className={classes.gridContainer}>
            <div className={classes.gridItem}>Not at all influential</div>
            <div className={classes.gridItem}>Slightly influential</div>
            <div className={classes.gridItem}>Somewhat influential</div>
            <div className={classes.gridItem}>Very influential</div>
            <div className={classes.gridItem}>Extremely influential</div>
          </div>
				<span className={classes.page}>Instructions:</span> <br />
        <Bullet/>Each choice should be independent. <br />

				<Bullet/>Please click "NEXT" in the bottom after finishing all questions.
			</Typography>
		);
	case 2:
		return (
			<Typography
				paragraph
				align="left"
				variant="body2"
				component="div"
				className={classes.steps}
			>
				<span className={classes.page}>Page 3. </span>
        There are 3 questions. For each question, we present you with a text snippet. You need to recall the text snippets you have read in Page 1.<br />
				<span className={classes.page}>Instructions:</span> <br />
				<Bullet/>Please read the text snippet and tell us whether the text snippet has appeared in Page 1. <br />
				<Bullet/>Please click "NEXT" in the bottom after finishing all questions.
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
            You should be able to find your MTurk worker ID on the top of the
            Amazon MTurk Dashboard. You may just enter your name if you are not
            a MTurk worker
				</Typography>
				<Typography
					className={classes.formText}
					align="center"
					variant="body1"
				>
            NOTE: If you do not correctly enter your MTurk worker ID, we cannot
            guarantee the payment to you.
				</Typography>
			</div>
		);
	default:
		return null;
	}
};

class Instruction extends Component {
	render() {
		const { classes, stepID } = this.props;

		return (
			<Paper className={classes.root} elevation={4}>
				<Typography
					align="center"
					variant="headline"
					component="h1"
					className={classes.mainText}
				>
          In this survey, you need to answer 3 pages of questions. It takes less than 5 minutes on average to finish.
					<span className={classes.highlight}> Each page has different instructions; </span>
          so make sure you read the instructions on each page.
				</Typography>
        <Stepper activeStep={stepID} orientation="vertical">
          {stepDescription.map((description, index)=>{
            return (
              <Step key={index}>
                <StepLabel>
                  <Divider/>
                </StepLabel>
                <StepContent>
                  {getStepContent(classes, stepID)}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
			</Paper>
		);
	}
}

export default withStyles(styles)(Instruction);
