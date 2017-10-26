var express = require('express');
var app = express();
var bodyParser = require('body-parser');






var port = process.env.port || 80;
app.listen(port, function () {
    console.log('Running on port: ' + port);
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




//Mongo Logic
var Book = require('./models/bookModel.js');

var mongoose = require('mongoose');

if(process.env.ENV == 'Test')
    mongoose.connect('mongodb://localhost/bookAPI_test', {useMongoClient: true});
else
    mongoose.connect('mongodb://localhost/bookAPI', {useMongoClient: true});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we\'re connected!');
});
//end mongo logic





//Routes
var bookRouter = require('./Routes/bookRoutes.js')(Book);
app.use('/api/books', bookRouter);
//End Routes





app.get('/', function (req, res) {
    res.send('welcome');
});


module.exports = app;