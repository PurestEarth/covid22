const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Country = new Schema({
    country:{
        type: String
    },
    population:{
      type: Number
    },
    region:{
      type: String
    },
    area:{
      type: String
    },
    popDensity:{
      type: String
    },
    coastline:{
      type: String
    },
    netMigration:{
      type: String
    },
    infantMortality:{
      type: String
    },
    gdpPerCapita:{
      type: String
    },
    literacy:{
      type: String
    },
    phones:{
      type: String
    },
    arable:{
      type: String
    },
    crops:{
      type: String
    },
    other:{
      type: String
    },
    climate:{
      type: String
    },
    birthrate:{
      type: String
    },
    deathrate:{
      type: String
    },
    agriculture:{
      type: String
    },
    industry:{
      type: String
    },
    service:{
      type: String
    },
    infected:{
      type: Number
    },
    recovered:{
      type: Number
    },
    deceased:{
      type: Number
    },
    sourceUrl:{
      type: String
    },
    infectedClass:{
      type: String
    },
    recoveredClass:{
      type: String
    },
    deceasedClass:{
      type: String
    }
},{
    collection: 'country'
    }
);

module.exports = mongoose.model('country', Country);
