var alertModel = require('../models/alert');

exports.index = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    alertModel.find(function (err, alerts){
        res.send(JSON.stringify(alerts));
    });
};

exports.create = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var alert = new alertModel({email: req.body.email})
    alert.save(function (err, alert) {
        res.send(JSON.stringify(alert));
    })
};

exports.destroy = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    alertModel.findOneAndRemove({email: req.body.email}, function(err, alert){
        res.send(JSON.stringify(alert));
    })
};
