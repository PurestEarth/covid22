
https = require('https')

function getCurrentSummary(){
  https.get('https://api.covid19api.com/summary ', (res) =>
  {
    let data = '';
    res.on('data', chunk => { data += chunk})
    res.on('end', () => {
      let summary = JSON.parse(data);
      Object.keys(summary).forEach(function(key) {
          console.log(key)

      });
     })
  }, error => { console.log(error) }
);
}

function saveDataToDB(json){
  Object.keys(json).forEach(function(key) {
    console.log(json[key].infected + ' ' + json[key].country)
  });
}


