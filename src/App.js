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
            {'This task is composed of 2 steps:'}
          </Typography>
          <Typography paragraph align='left' variant="body2" component="p" className={classes.instruction}>
            {'Step 1. Please r'}

            {'Step 1. Please select whether you will read this article or not, after reading the title of this article and a snippet of this article. If you will read this article, please select "Interested". If you will not read this article, please select "Not Interested" test react.'}
          </Typography>
          <Typography paragraph align='left' variant="body2" component="p" className={classes.instruction}>
            {' As the following example shows, "Why Even Ambitious People Rarely Become Successful" is the <em>title</em> of an article. And "Success is not extrinsic" is a <em>snippet</em> of this article.'
            }
          </Typography>
          <img src={require('./img/0_0.png')} />
          <Typography paragraph align='left' variant="body2" component="p" className={classes.instruction}>
            {'Step 2. Please choose which snippet of text has appeared in the first step, no matter whether you selected "Yes" or "NO" in the first step for the article which this snippet of text belongs to.'}
          </Typography>
        
        </Paper>

        <Survey
          needSelected={[4, 6]}
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
                id: '4_0',
                img:
                  'My list is incredibly short. But it’s also incredibly non-negotiable.'
              },
              {
                id: '6_0',
                img:
                  'Every Frame a Painting is officially dead. Nothing sinister; we just decided to end it, rather than keep on making stuff.'
              },
              {
                id: '2_1',
                img:
                  'Which is why Bitcoin is an excellent idea. It fulfills the needs of the complex system, not because it is a cryptocurrency, but precisely because it has no owner, no authority that can decide on its fate. It is owned by the crowd, its users. And it has now a track record of several years, enough for it to be an animal in its own right.'
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
