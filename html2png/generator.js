const fs = require('fs');
const cheerio = require('cheerio')
const webshot = require('webshot');

const options = {
  screenSize: {
    width: 980,
    height: 700
  },
  shotSize: {
    width: 480,
    height: 200
  },
  shotOffset:{
    left: 0,
    top: 170,
    bottom: 0,
    right: 0
  },
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
  siteType: 'html',
  quality: 100
};

let getCheerio = new Promise((resolve, reject) => {
  fs.readFile('./html2png/index.html', (err, data) => {
    if (!err){
      resolve(cheerio.load(data));
    }else reject(err);
  });
});

// const output_html_filename = output_html_dir+filename
// fs.writeFile(output_html_filename, $.html(), (err) => {
//   console.log(output_html_filename,  ' has been saved!');
// });

const output_img_dir = './html2png/output/img/'
const output_html_dir = './html2png/output/html/'

const label_filname = './html2png/input/selected.json'
const waterfall = require('async/waterfall');
const everySeries = require('async/everySeries');
var idx = 0
getCheerio.then(($)=>{
  // console.log('resolved');
  fs.readFile(label_filname, (err, json) => {
    if (!err){
      data = JSON.parse(json)
      keys = Object.keys(data)

      function savepng(idx,finish){
        const title = data[idx].articleTitle
        const subtitle = data[idx].firstSentence
        const highlight = data[idx].topHighlight
        waterfall([
          function(callback){
            $('#prerendered > div.homeContainer.u-clearfix.js-homepage > div.js-homeStream > div > section > div.heroGrid-largeCard.js-trackedPost.uiScale.uiScale-ui--regular.uiScale-caption--small > div > div.heroGrid-postContent > div.heroGrid-titleClamp.u-marginBottom16 > div > a > h3').text(title)
            callback(null);
          },
          function(callback){
            $('#prerendered > div.homeContainer.u-clearfix.js-homepage > div.js-homeStream > div > section > div.heroGrid-largeCard.js-trackedPost.uiScale.uiScale-ui--regular.uiScale-caption--small > div > div.heroGrid-postContent > div.heroGrid-titleClamp.u-marginBottom16 > a > div').text(subtitle)
            callback(null);
          },
          function(callback){
            $('#prerendered > div.homeContainer.u-clearfix.js-homepage > div.js-homeStream > div > section > div.heroGrid-largeCard.js-trackedPost.uiScale.uiScale-ui--regular.uiScale-caption--small > div > div.heroGrid-postContent > div.ui-caption.u-flex.u-paddingBottom2').remove()
            callback(null);
          },
          function(callback){
            webshot($.html(), output_img_dir+`${idx}_0.png`, options, (err) => {callback(null)});
          },
          function(callback){
            $('#prerendered > div.homeContainer.u-clearfix.js-homepage > div.js-homeStream > div > section > div.heroGrid-largeCard.js-trackedPost.uiScale.uiScale-ui--regular.uiScale-caption--small > div > div.heroGrid-postContent > div.heroGrid-titleClamp.u-marginBottom16 > a > div').text(highlight)
            callback(null);
          },
          function(callback){
            webshot($.html(), output_img_dir+`${idx}_1.png`, options, (err) => {callback(null)});
          }
        ], ()=>{
          console.log(idx);
          finish(null, idx)
        });
      }

      everySeries(keys, savepng, (err, result)=>{console.log(result)})

    }else console.log(err);
  })
}).catch((reason)=>{console.log(reason)})
