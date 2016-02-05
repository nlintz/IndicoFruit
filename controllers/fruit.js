var fruitModel = require('../models/fruit');
var indico = require('indico.io');
var indicoConfig = require('../indicoConfig');
indico.apiKey =  indicoConfig["apiKey"];
var appleCollection = indico.Collection('fruit_blog_apple');
var bananaCollection = indico.Collection('fruit_blog_banana');
var orangeCollection = indico.Collection('fruit_blog_orange');
var fruitNameCollections = {
    "apple": appleCollection,
    "banana": bananaCollection,
    "orange": orangeCollection,
}

exports.index = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    fruitModel.find(function (err, fruits){
        res.send(JSON.stringify(fruits));
    });
};

exports.show = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var fruitName = req.params.fruit_name;
    fruitModel.findOne({name : fruitName}, function (err, fruit) {
        res.send(JSON.stringify(fruit));
    });
};

exports.update = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var picture = req.body.picture;

    var fruitName = req.params.fruit_name;
    fruitNameCollections[fruitName].predict(picture).
        then(function(data){
        var p_exists = parseFloat(data["pos"]);    
    
        fruitModel.findOneAndUpdate({name : fruitName},
                                    {p_exists: p_exists},
                                    {upsert:true, new:true},
                                    function(err, fruit) {
                                        res.send(JSON.stringify(fruit));
                                    });
    })
};
