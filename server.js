const express = require('express');
const app = express();
const jsonParser = require('body-parser').json();

const MongoClient = require('mongodb').MongoClient;
const sampleSize = require('lodash/sampleSize');
const shuffle = require('lodash/shuffle');
const has = require('lodash/has');
const path = require('path');
const https = require('https');
const fs = require('fs');

const questionsFrom = (samples) => {
  q1 = [];
  q2 = [];
  for (const s of samples){
    if (q1.length < 3){
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
    }else if (q1.length < 6){
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

    client.db('highlight-survey').collection('images').find({id: { $lt: 10 }}).toArray( (err, result) => {
      if (err) throw err;
      samples = sampleSize(result, 7);
      res.json(questionsFrom(samples));
    });
    client.close();
  })}
);

const validate = (response)=>{
  const label = response.data[0];
  const answer = response.data[1];
  var error = 0;
  // console.log(response);
  for (const key in answer){
    if (answer[key].choice === 1){
      error += !has(label, [key]);
    }else{
      error += has(label, [key]);
    }
  }
  return error === 0;
}

const saveResponse = (response, completionid, valid, success, fail)=>{
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err

    client.db('highlight-survey').collection('responses').insertOne(
      {answer: response.data, workerid: response.workerid, completionid, valid, timestamp: Date.now()}
    )
    .then(() => {
      if (valid) success();
      else fail();
    })
    .catch(() => fail());
    client.close();
  })
}

const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);

const generateCode = () => {
  return S4() + S4();
}

app.post('/submit', jsonParser, (req, res) => {
  const mTurkCode = generateCode();
  const success = () => res.json({
      status: 0,
      mTurkCode
    })
  const fail = () => res.json({
      status: 1,
  })
  saveResponse(req.body, mTurkCode, validate(req.body), success, fail);

})
app.use('/static', express.static('static'));

app.use('/', express.static(path.join(__dirname, 'build')))

const PATH_TO_CERT_CHAIN = '/etc/ssl/certs/cs.virginia.edu.interm.cer'
const PATH_TO_CERT = '/etc/ssl/certs/cs.virginia.edu.cert.cer'
const PATH_TO_KEY = '/etc/ssl/private/cs.virginia.edu.key'

const options = {
  cert: fs.readFileSync(PATH_TO_CERT),
  key: fs.readFileSync(PATH_TO_KEY)
};

const server = https.createServer(options, app);

server.listen(8088, () => console.log('Server listening on port 8088!'))
