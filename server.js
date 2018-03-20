const express = require('express')
const app = express()

var MongoClient = require('mongodb').MongoClient

const fetchData = () => {
  MongoClient.connect('mongodb://localhost:27017/highlight-survey', (err, db) => {
    if (err) throw err

    db.collection('image').find().toArray( (err, result) => {
      if (err) throw err
      console.log(result)
    })
  })
}


app.get('/get-image', (req, res) => res.send(
  fetchData()
))

app.post('/submit', (req, res) => {
  const valid = checkvalid(req.data)
  if (valid){
    res.send(sucess)
  }else{
    res.send(fail)
  }
  save(valid)
  save(req.data);


})

app.listen(8888, () => console.log('Server listening on port 8888!'))
