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
    color: '#000000'
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 600
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
          <Typography align='left' variant="headline" component="h3" className={classes.instruction}>
            {'Instruction: this task is composed of 6 steps and you need to go through two pages. Step 1, step 2 and step 3 are required to finish in the first page. And step 4, step 5 and step 6 are required to finish in the second page.'}
          </Typography>
          <Typography paragraph align='left' variant="body2" component="p" className={classes.instruction}>
          Step 1. Please read the title of an article and a snippet of text of this article. In this page, we will show you 4 articles and their snippets of text. Please read everyone carefully and you will need the content of these snippets to finish step 4, step 5 and step 6. 
          <br />
          As the following example shows, "Why Even Ambitious People Rarely Become Successful" is the title of an article. And "Success is not extrinsic" is a snippet of this article.
            <img src={require('./img/0_0.png')} /><br />
            Step 2. Please select whether you will read this article or not, after reading the title of an article and its snippet of text. If you will read the article, please select "Interested". If you will not read the article, please select "Not Interested". Decisions for these 4 articles are independent.<br />
            Step 3. Please click "NEXT" in the bottom of the page to switch to the second page.<br />
            Step 4. Please read a snippet of text from an article. In this page, we will show you 6 snippets and these snippets are from different articles. Please read everyone.<br />
             Step 5. Please select whether the snippet of text has appeared in the first page or not. If this snippet of text has appeared in the first page, please select "Appeared". Otherwise, please select "Not Appeared". Each decision is independent.<br />
             Step 6. Please click "SUBMIT" in the bottom of the page to submit your results. That is all.<br />
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
