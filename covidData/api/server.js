
const express = require('express'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
bearerToken = require('express-bearer-token'),
config = require('./DB');
const worldRoute = require('./routes/worldRoute');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err)}
);
const app = express();
app.use(cors());
app.use('/world', worldRoute);

app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));



const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
console.log('Listening on port ' + port);
});


