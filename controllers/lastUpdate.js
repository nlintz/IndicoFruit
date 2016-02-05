var lastUpdateModel = require('../models/lastUpdate');
var fruitModel = require('../models/fruit');


exports.index = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    lastUpdateModel.findOne({}, function(err, update) {
        if (err) {
            console.log(err)
        }
        res.send(JSON.stringify(update));
    })
};

exports.update = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    lastUpdateModel.findOneAndUpdate({},
                                {updatedAt: Date.now()},
                                {upsert:true, new:true},
                                function(err, lastUpdate) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    res.send(JSON.stringify(lastUpdate));
                                });
};
