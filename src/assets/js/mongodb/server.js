var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect('mongodb://localhost:27017/new_york', function(err, response){
    if(err){
        console.log(err);
    }
    else {
        console.log('connecté à : ' + db + ' + ' + response);
    }
})

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

var Schema = mongo.Schema;

var RestaurantSchema = new Schema({
    address: Object,
    borough: String,
    cuisine: String,
    grades: Array,
    name: String,
    restaurant_id: Number
})

var model = mongo.model('restaurants', RestaurantSchema, 'restaurants');

app.post('/api/SaveRestaurant', function(req, res){
    var mod = new model(req.body);
    if(req.body.mode == 'Save'){
        mod.save(function(err, data){
            if(err){
                res.send(err);
            }
            else{
                res.send({
                    data: "Record has been saved"
                });
            }
        })
    }
    else {
        mod.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},
            function(err, data){
            if(err){
                res.send(err);
            }
            else{
                res.send({
                    data: "Record has been updated"
                });
            }
        })
    }
})

app.post('/api/DeleteRestaurant', function(req, res){
    model.remove({ _id: req.body.id }, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send({
                data: "Record has been deleted"
            });
        }
    })
})

app.post('/api/GetRestaurant', function(req, res){
    model.find({}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log('ca marche');
            res.send({
                data: res.send(data)
            });
        }
    })
})

app.listen(8080, function (){
    console.log('Exemple app listening on port 8080');
})
/* var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var restaurantSchema = new mongoose.schema({
        name: String
    });
    var restaurant = mongoose.model('restaurant', restaurantSchema);

    var testRestaurent = new restaurant({
        name: 'Burger King'
    });

    console.log(testRestaurent.name);
}) */