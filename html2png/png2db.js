const fs = require('fs');
const reduce = require('lodash/reduce');
const MongoClient = require('mongodb').MongoClient
const crypto = require('crypto');

const img_dir = './html2png/output/img/';
const new_img_dir = './static/';
const db_url = 'mongodb://localhost:27017';
const label_filname = './html2png/input/selected.json';

function generateHash(content){
  var hash = crypto.createHash('md5');
  hash.update(content);
  return hash.digest('hex');
}

const hashImg = (filename) => {
  const hashname = generateHash(filename);
  const src_filename = img_dir+filename+'.png';
  const dest_filename = new_img_dir+hashname+'.png';
  fs.copyFile(src_filename, dest_filename, (err) => {
    if (err) throw err;
    console.log('copy img '+ src_filename +' to '+ dest_filename);
  });
  return hashname;
}

fs.readFile(label_filname, (err, json) => {
  if (!err){
    data = JSON.parse(json);

    MongoClient.connect(db_url, (err, client) => {
      if (err) throw err
      client.db('highlight-survey').collection('images').insertMany(
        reduce(data, (res, val, key)=>{
          res.push({
            ...val,
            firstSentenceImg: hashImg(key+'_0'),
            topHighlightImg: hashImg(key+'_1'),
            id: parseInt(key)
          })
          return res;
        }, [])
      ).then( () => client.close())
    })
  }else console.log(err);
});
