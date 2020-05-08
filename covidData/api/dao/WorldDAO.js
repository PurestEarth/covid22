const fs = require('fs')
const csv = require('csv-parser');
let Country = require('../models/Country')
let country = Country()

function setCountries(){

  var countries = []
  fs.createReadStream('./assets/cow.csv').pipe(csv()).on('data', (row) => {
    countries.push(row)
  }).on('end', () => {
    Object.keys(summary).forEach(function(key) {
      saveCountry(summary[key]).then( console.log(summary[key] + ' added') )

  });
  })
}

function updateCountryCorona() {
  var world = require('../assets/world.json')
  const countries = JSON.parse(JSON.stringify(world));
  Object.keys(countries).forEach(function(key) {
    updateCoronaStats(countries[key])
  });
}

function setClassesForStats(){
  this.getCountries().then( res => {
    infected = {}
    recovered = {}
    deceased = {}
    res.forEach( elem => {
      if(elem.infected){
        infected[elem._id] = elem.infected
      }
      if(elem.recovered){
        recovered[elem._id] = elem.recovered
      }
      if(elem.deceased){
        deceased[elem._id] = elem.deceased
      }
    })
    medianInfected = getMedian(Object.values(infected))
    medianRecovered = getMedian(Object.values(recovered))
    medianDeceased = getMedian(Object.values(deceased))
    console.log(medianInfected)
    // temporary, ugly solution
    Object.keys(infected).forEach( key => {
      Country.updateOne({_id: key}, { $set: { infectedClass: getClassForScoreNMedian(medianInfected, infected[key])} }, {upsert:true}).then( _ => {
        console.log(key + ' has been updated');
      }, err => console.log('Something went wrong with ' + key + " " + err))
    })

    Object.keys(recovered).forEach( key => {
      Country.updateOne({_id: key}, { $set: { recoveredClass: getClassForScoreNMedian(medianRecovered, recovered[key])} }, {upsert:true}).then( _ => {
        console.log(key + ' has been updated');
      }, err => console.log('Something went wrong with ' + key + " " + err))
    })

    Object.keys(deceased).forEach( key => {
      Country.updateOne({_id: key}, { $set: { deceasedClass: getClassForScoreNMedian(medianDeceased, deceased[key])} }, {upsert:true}).then( _ => {
        console.log(key + ' has been updated');
      }, err => console.log('Something went wrong with ' + key + " " + err))
    })

  })
}

function getClassForScoreNMedian(median, num){
  let scoreArr = {0.3: 1, 0.6: 2, 0.9: 3, 1.2: 4, 1.5: 5, 1.8: 6, 2.1:7, 2.4: 8}
  const div = num/median;
  let out = 0;
  Object.keys(scoreArr).forEach( key => {if( out === 0 && div < key ) return out = scoreArr[key];});
  return out === 0 ? 9 : out;
}

function getMedian(arr){
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
    console.log(nums)
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function archiveCountry(){

}

function getCountries(){
  return Country.find({}, {
    "_id": 0,
    "country": 1,
    "infected": 1,
    "recovered": 1,
    "deceased": 1,
    "infectedClass": 1,
    "recoveredClass": 1,
    "deceasedClass": 1
  });
}

function getCountry(country){
  return Country.find({country: country});
}

// Generates Random Data for show off purpose when API fails
function fillCountryWithRandomData() {
  getCountries().then( countries => {
    countries.forEach(country => {
      if( !country.infected ) {
        country.infected = parseInt(country.population * 0.003)
      }
      if( !country.recovered ) {
        country.recovered = parseInt(country.infected * 0.5)
      }
      if( !country.deceased ) {
        country.deceased = parseInt(country.infected * 0.005)
      }
      country.infectedHistory = getHalfArray(country.infected, 40)
      country.recoveredHistory = getHalfArray(country.recovered, 40)
      country.deceasedHistory = getHalfArray(country.deceased, 40)
      Country.updateOne({_id: country._id}, { $set: { infected: country.infected, recovered: country.recovered, deceased: country.deceased,
        infectedHistory: country.infectedHistory, deceasedHistory: country.deceasedHistory, recoveredHistory: country.recoveredHistory } }, {upsert:true} ).then( _ => {
        console.log(country.country + ' has been updated');
      }, err => console.log('Something went wrong with ' + country.country + " " + err))
    });
  });
}

function getHalfArray(n, size) {
  out = [];
  for (let i = 0; i < size; i++) { out.push(parseInt(n/2*i)) }
  return out;
}

function updateCoronaStats(element){
  console.log(element)
  Country.updateOne({country: element.country}, { $set: { tested: naToNull(element.tested), recovered: naToNull(element.recovered), deceased: naToNull(element.deceased),
    infected: naToNull(element.infected), sourceUrl: naToNull(element.sourceUrl)} }).then( _ => {
    console.log(element.country + ' has been updated');
  }, err => console.log('Something went wrong with ' + element.country + " " + err))
}

function naToNull(value){
  return value === ("NA") ? null : value;
}

function saveCountry(element) {
  country.country = element.Country.trim();
  country.region = element.Region.trim();
  country.population = element.Population;
  country.area = element.Area;
  country.popDensity = element.PopDensity;
  country.coastline = element.Coastline;
  country.netMigration = element.Net_migration;
  country.infantMortality = element.Infant_mortality;
  country.gdpPerCapita = element.GDP;
  country.literacy = element.Literacy;
  country.phones = element.Phones;
  country.arable = element.Arable;
  country.crops = element.Crops;
  country.other = element.Other;
  country.climate = element.Climate;
  country.birthrate = element.Birthrate;
  country.deathrate = element.Deathrate;
  country.agriculture = element.Agriculture;
  country.industry = element.Industry;
  country.service = element.Service;
  country.infected = null;
  country.recovered = null;
  country.deceased = null;
  country.sourceUrl = null;
  return country.save();
}

// updateCountryCorona()

module.exports = {
  getCountries: getCountries,
  getCountry: getCountry,
  fillCountryWithRandomData: fillCountryWithRandomData,
  setClassesForStats: setClassesForStats
}
