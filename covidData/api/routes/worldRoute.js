const express = require('express'),
      app = express(),
      worldRoutes = express.Router(),
      WorldDAO = require('../dao/WorldDAO');

  worldRoutes.route('/').get(function(req,res){
    WorldDAO.getCountries().then(countries => {
      res.json(countries), err => console.log(err)
    });
  })

  worldRoutes.route('/:country').get(function(req,res){
    WorldDAO.getCountry(req.params.country).then(data => {
      res.json(data), err => console.log(err)
    });
  })

module.exports = worldRoutes;

// todo put it jsons up in case no DB is connected
// todo make a script
