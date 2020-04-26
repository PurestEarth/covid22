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

function archiveCountry(){

}

function getCountries(){
  return Country.find();
}

function updateCoronaStats(element){
  console.log(element)
  Country.updateOne({country: element.country}, { $set: { tested: naToNull(element.tested), recovered: naToNull(element.recovered), deceased: naToNull(element.deceased),
    infected: naToNull(element.infected), sourceUrl: naToNull(element.sourceUrl)} }).then( _ => {
    console.log(element.country + ' has been updated');
  }, err => console.log('Bad ending for ' + element.country + " " + err))
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
  getCountries: getCountries
}
