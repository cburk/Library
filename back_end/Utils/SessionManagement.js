var md5 = require('md5')
var datetime = require('node-datetime')

var sessIdToUsername = {"a":"B"}

//Middleware to verify that user is logged in
VerifyLogin = (req, res, next) => {
    console.log("Session: \n")
    console.log(req.session.id)
    console.log(sessIdToUsername)
    if(sessIdToUsername[req.session.id] == null){
        console.log("No session found, returning unauthorized");
        res.sendStatus(401)
    }else{
        console.log("In logged in/authorized path");
        console.log("Logged in as: " + sessIdToUsername[req.session.id])
        req.username = sessIdToUsername[req.session.id]
        console.log("usr: ", req.username)
        next()
    }
}

Establish = (req, username) => {
    console.log("This really should work" + req.sessionID);
    req.session.cart = []
    console.log("session map before: " + sessIdToUsername)
    console.log("Session before: " + req.session)

    sessIdToUsername[req.session.id] = username

    console.log("Id after: " + req.session.id)
    console.log("session map after: " + sessIdToUsername)    
    console.log(req.session)
    console.log("New valid session established")
    req.session.save()
}

module.exports = {
    EstablishSession: Establish,
    VerifyLoggedIn: VerifyLogin
}

/*
curl -X PUT -H "Content-Type: application/json" -d '{"username":"diff", "password":"ers"}' -b other.txt -c other.txt localhost:8080/Register
curl -X PUT -H "Content-Type: application/json" -d '{"id":2}' -b other.txt -c other.txt localhost:8080/AddToCart
*/