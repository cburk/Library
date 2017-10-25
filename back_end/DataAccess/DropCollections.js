var config = require('config');

//var cfgManagerSelector = cfgManager.addConfig("Config")
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = config.BASE_URI
var ALL_BOOKS_COLLECTION = config.ALL_BOOKS_COLLECTION
var AVAILABLE_BOOKS_COLLECTION = config.AVAILABLE_BOOKS_COLLECTION
var DB_LOCATION = config.DB_LOCATION

var DropTables = (req, res) => {
        console.log("In drop all tables");
        console.log("All collection table name from conf: " + config.ALL_BOOKS_COLLECTION)
        MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
            if(!err) {
                console.log("Connected to db");
                
                [ALL_BOOKS_COLLECTION, AVAILABLE_BOOKS_COLLECTION].forEach((collection) => {
                    db.collection(collection).drop()
                    console.log("Dropping collection: " + collection)
                })

            }
        });
        res.send("Dropped")
    }

module.exports = {
    DropAllCollections: DropTables
}
