const express = require('express');
const app = express();
const jsonParser = require('body-parser').json();

const MongoClient = require('mongodb').MongoClient;
const sampleSize = require('lodash/sampleSize');
const shuffle = require('lodash/shuffle');
const has = require('lodash/has');

const questionsFrom = (samples) => {
  q1 = [];
  q2 = [];
  for (const s of samples){
    if (q1.length < 2){
        q1.push({
          id: `${s.id}_0`,
          img: s.firstSentenceImg
        })
        if (q2.length < 1){
          q2.push({
            id: `${s.id}_0`,
            content: s.firstSentence
          })
        }
    }else if (q1.length < 4){
      q1.push({
        id: `${s.id}_1`,
        img: s.topHighlightImg
      })
      if (q2.length < 3){
        q2.push({
          id: `${s.id}_1`,
          content: s.topHighlight
        })
      }
    }else{
      q2.push({
        id: `${s.id}_0`,
        content: s.firstSentence
      })
    }
  }

  return [shuffle(q1), shuffle(q2)];
}


app.get('/loadquestions', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;

    client.db('highlight-survey').collection('images').find({}).toArray( (err, result) => {
      if (err) throw err;
      samples = sampleSize(result, 5);
      res.json(questionsFrom(samples));
    });
    client.close();
  })}
);

const validate = (response)=>{
  const label = response.data[0];
  const answer = response.data[1];
  var error = 0;
  for (const key in answer){
    if (answer[key].choice === 1){
      error += !has(label, key);
    }else{
      error += has(label, key);
    }
  }
  return error === 0;
}

const saveResponse = (response, valid, success, fail)=>{
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err

    client.db('highlight-survey').collection('responses').insertOne({answer: response.data, valid})
    .then(() => success())
    .catch(() => fail());
    client.close();
  })
}

app.post('/submit', jsonParser, (req, res) => {
  const success = () => res.json({
      status: 'success',
      mTurkCode : '666666'
    })
  const fail = (msg) => () => res.json({
      status: 'failed',
      msg
  })
  saveResponse(req.body, validate(req.body), success, fail('save not sucessful'));

})
app.use('/static', express.static('static'));
app.listen(8888, () => console.log('Server listening on port 8888!'))
