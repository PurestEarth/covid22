const express = require('express'),
      app = express(),
      worldRoutes = express.Router(),
      WorldDAO = require('../dao/WorldDAO');

  worldRoutes.route('/').get(function(req,res){
    WorldDAO.getCountries().then(countries => {
      res.json(countries), err => console.log(err)
    });
})

module.exports = worldRoutes;
