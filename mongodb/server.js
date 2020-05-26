var express = require('express');
var path = require('path');
var mongo = require('mongoose');
const util = require('util');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var db = mongo.connect('mongodb://localhost:27017/restaurants', { useNewUrlParser: true }, function (err, response) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connecté à MongoDb avec succès');
        /* console.log(util.inspect(response, { showHidden: false, depth: null })) */
    }
})

var app = express();


app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:4200', 'https://localhost:4200', 'http://192.168.1.91:4200', 'https://192.168.1.91:4200'];
    var origin = req.headers.origin;
    console.log(req.headers.origin);
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use(urlencodedParser);
app.use(bodyParser.json());

var Schema = mongo.Schema;

var RestaurantSchema = new Schema({
    address: Object,
    borough: String,
    cuisine: String,
    grades: Array,
    name: String,
    restaurant_id: Number
})

var model = mongo.model('restaurants', RestaurantSchema, 'restaurants_collection');

app.post('/api/SaveRestaurant', function (req, res) {
    var mod = new model(req.body);
    if (req.body.mode == 'Save') {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({
                    data: "Le restaurant a été sauvegardé avec succes"
                });
            }
        })
    }
    else {
        mod.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({
                        data: "Le restaurant a été mis à jour avec succes"
                    });
                }
            })
    }
})

app.get('/api/DeleteRestaurant', function (req, res) {
    console.log('on est bien en delete');
    console.log(req.query);
    /* model.deleteOne({ restaurant_id: req.params.id }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                data: "Le restaurant a été supprimé avec succes"
            });
        }
    }) */
})

app.get('/api/GetLatestRestaurants', function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                reponse: data
            });
        }
    }).limit(18)
})

app.get('/api/GetNextRestaurants', function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                reponse: data
            });
        }
    }).limit(18)
})

app.post('/api/GetRestaurant', urlencodedParser, function (req, res) {
    let id = JSON.stringify(req.body.params.updates[0].value);
    model.findById({ "restaurant_id": id }, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(JSON.stringify(data));
            res.send({
                reponse: JSON.stringify(data)
            });
        }
    })
})

app.get('/api/GetRestaurantById', urlencodedParser, function (req, res) {
    let id = req.query.id;
    model.findById(id, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(JSON.stringify(data));
            res.send({
                reponse: JSON.stringify(data)
            });
        }
    })
})

app.listen(8080, function () {
    console.log('Serveur en ecoute sur le port 8080');
})