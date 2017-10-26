var MongoClient = require('mongodb').MongoClient;
var config = require('config')
var USERS_COLLECTION = config.ALL_USERS_COLLECTION
var LOCATION = config.DB_LOCATION
var BASE_URI = config.BASE_URI
var md5 = require('md5')
var SALT = config.SALT

//Note: Usernames will be unique

var getallusersEndpoint = (req, res) => {
    GetAllUsersList((usersList) => {res.send(usersList)})
}

GetAllUsersList = (callbackFunc) => {
    console.log("In get all users");
    MongoClient.connect(BASE_URI + LOCATION, function(err, db) {
        if(!err) {
            console.log("We are connected");
            
            var AllUsersCollection = db.collection(USERS_COLLECTION);
            AllUsersCollection.find().toArray((err, res) => {
                if(err){ console.log("Query returned error: " + err ) }
                console.log("Query res: ")
                var results = []
                //TODO: Why not just pass back all?  Was that just debugging?
                res.forEach((el) => {
                    //console.log("{id: " + el.id + "}")
                    results.push(el)
                })
                callbackFunc(results)
            })
        }
    });
}

GetUserByUserName = (username, callbackFunc) => {
    console.log("In users DAL, getting user: " + username);
    MongoClient.connect(BASE_URI + LOCATION, function(err, db) {
        if(!err) {
            console.log("We are connected");
            
            var AllUsersCollection = db.collection(USERS_COLLECTION);
            var userQuery = {username: username }
            AllUsersCollection.findOne(userQuery, (err, res) => {
                if(err){console.log("Error or user not found: " + err)}
                else{
                    console.log("Got user obj: " + res)
                }
                callbackFunc(res)
            })
        }
    });
}

AddUser = (username, saltedPassword) => {
    console.log("In Users, adding: " + username);
    MongoClient.connect(BASE_URI + LOCATION, function(err, db) {
        if(!err) {
            console.log("We are connected");
            
            var AllUsersCollection = db.collection(USERS_COLLECTION);
            var userObj = {username: username, secret: saltedPassword }
            AllUsersCollection.insert(userObj)
        }
    });
}

module.exports = {
    GetAllUsersList: GetAllUsersList,
    GetUserByUserName: GetUserByUserName,
    AddUser: AddUser,
    getallusersEndpoint: getallusersEndpoint
}