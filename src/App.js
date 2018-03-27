import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Survey from './survey.js';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  instruction: {
    fontSize: 'large',
    color: '#000000',
    fontWeight: 'bolder'
  },
  steps: {
    fontSize: 'large',
    color: '#111111',
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

// get [[{image, id}...], ...]
// post [[{id, bool}...], ...]
class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Paper className={classes.root} elevation={4}>
          <Typography align='left' variant="headline" component="h1" className={classes.instruction}>
            {'This task is composed of two pages each with 4 questions, make sure you follow our instructions to make choices:'}
          </Typography>
          <Typography paragraph align='left' variant="body2" component="p" className={classes.steps}>
            Page 1. Each question consists of a block with the title and a text snippet of an article, like the following example:
            <img src={require('./img/example.jpg')} style={{maxWidth:'500px', display:'block'}}/>
            - Make sure to read through each of them carefully and you will need to roughly remember the content of these snippets to answer in the next page.
            <br/>
            - Please select whether you will read this article or not, based on its title and text snippet.
            <br/>
            - If you will read the article, please select "Interested". Otherwise, select "Not Interested".
            <br/>
            - Each decision must be independent.
            <br/>
            - Please click "NEXT" in the bottom of the page to enter the second page.
          </Typography>
          <Typography paragraph align='left' variant="body2" component="p" className={classes.steps}>
            Page 2. Each question consists of a block with a text snippet from an article may or may not appear in Page 1.
            <br/>
            - Please select whether the text snippet has appeared in Page 1 or not. If this text snippet appeared in the first page, please select "Appeared". Otherwise, please select "Not Appeared".
            <br/>
            - Each decision should be independent.
            <br/>
            - Please click "SUBMIT" in the bottom of the page to submit your results.
            <br/>
            - Then you reach the end of the task and you will have your code generated to use on Amazon Mechanical Turk
          </Typography>
        </Paper>

        <Survey
          needSelected={[4, 4]}
          datas={[
            [
              { id: '1', img: '1_0.png' },
              { id: '2', img: '2_1.png' },
              { id: '3', img: '3_1.png' },
              { id: '4', img: '4_0.png' }
            ],
            [
              {
                id: '5_1',
                img:
                  'If we hope to create something of lasting value, we need to start with what people want — not just with what’s technically possible.'
              },
              {
                id: '6_0',
                img:
                  'Every Frame a Painting is officially dead. Nothing sinister; we just decided to end it, rather than keep on making stuff.'
              },
              {
                id: '3_1',
                img:
                  'Being a designer means fighting the presumptive reflex, which takes disciplined reasoning and self awareness in order to truly understand the context of a problem'
              },
              {
                id: '1_0',
                img:
                  'Last week a personal email I wrote was retweeted over 7,000 times, and liked by almost 30k people.'
              }
            ]
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
