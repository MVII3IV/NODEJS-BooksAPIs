var express = require('express');

var app = express();
var port = process.env.port || 3000;





//Mongo Logic
var Book = require('./models/bookModel.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('we\'re connected!');
});
//end mongo logic







//Routes
var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {
        Book.find(function (err, books) {
            if (err)
                console.log(err);
            else
                res.json(books);
        });


    });

app.use('/api', bookRouter);
//End Routes






app.get('/', function (req, res) {
    res.send('welcome');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});