import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Survey from './survey.js';

// get [[{image, id}...], ...]
// post [[{id, bool}...], ...]
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Thanks for helping us on this survey!</h1>
        </header>
        <Survey
          needSelected={[2, 4]}
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

export default App;