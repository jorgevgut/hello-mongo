var express = require('express');
var router = express.Router();
var mongodb = require('express');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var mdb = req.mdb;
    mdb((err, db) => {
        var collection = db.collection('users');
        collection.find().toArray((err, result) => {
            console.log(err,result);
            db.close();
            res.send({data:result});
        });
    });
});

router.post('/', function (req, res, next) {
    var mongoClient = req.mdb;
    var user = req.body;
    addUser(
        JSON.parse(user),
        req.mdb,
        (result) => req.send(result));
});

var addUser = function (user, mdb, next) {
    mdb((err, db) => {
        var collection = db.collection('users');
        collection.insert(user, (err, result) => {
            console.log(err,result);
            db.close();
            //next(result);
        });
    });
};

module.exports = router;
