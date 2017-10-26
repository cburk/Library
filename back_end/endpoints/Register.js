var SessMan = require('../Utils/SessionManagement')
var config = require('config')
var USERS_COLLECTION_LOCATION = config.USERS_LIST
var md5 = require('md5')
var SALT = config.SALT
var UsersDataAccessLayer = require('../DataAccess/Users')
var PasswordManager = require('../Utils/PasswordManagement')

var ConditionalPerformRegistration = (userObjFound, user, pass, req, res) => {
    // Valid username, Create
    if(userObjFound == null){
        // Store a salted password for security
        var saltedPassword = PasswordManager.GetSaltedPassword
        UsersDataAccessLayer.AddUser(user, saltedPassword)

        // Initialize shopping cart and associate user's name w/ session
        SessMan.EstablishSession(req, user);
        res.send("Registered\n")
    }else{
        // Otherwise, username is taken
        res.status(400);
        res.send("Error: Username already taken\n");
    }
}

var Register = (req, res) => {
        console.log("In Register");
        
        var user = req.body.username;
        var pass = req.body.password;

        GetUserByUserName(user, (userObjFound) => {ConditionalPerformRegistration(userObjFound, user, pass, req, res)})        
    }

module.exports = {
    Register: Register
}
