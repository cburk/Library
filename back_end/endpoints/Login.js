var PasswordManager = require('../Utils/PasswordManagement')
var UsersDataAccessLayer = require('../DataAccess/Users')
var SessMan = require('../Utils/SessionManagement')

var ConditionalPerformLogin = (userObjFound, user, pass, req, res) => {
    // Valid username, Create
    if(userObjFound.secret == PasswordManager.GetSaltedPassword(pass)){
        // Initialize cart, associate session w/ user
        SessMan.EstablishSession(req, user)
        console.log(user + " logged in")

        res.send("Login successful\n");
    }else{
        // Otherwise, username is taken
        res.sendStatus(401)
    }
}

var Login = (req, res) => {
        console.log("In Login");
        
        var user = req.body.username;
        var pass = req.body.password;

        UsersDataAccessLayer.GetUserByUserName(user, (userObjFound) => {
            ConditionalPerformLogin(userObjFound, user, pass, req, res)
        })
    }

module.exports = {
    Login: Login
}

// curl -X PUT -H "Content-Type: application/json" -d '{"username":"ian", "password":"curtis"}' -b mySessionStore.txt -c mySessionStore.txt localhost:8080/Login