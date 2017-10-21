/*eslint-env node*/
var Login = require('./endpoints/Login')
var AddToCart = require('./endpoints/AddToCart')
var Register = require('./endpoints/Register')
var Logout = require('./endpoints/Logout')
var express = require('express')
var bodyParser = require('body-parser')

var SessionManagement = require('./Utils/SessionManagement')
var session = require('express-session');
var FileStore = require('session-file-store')(session)
//session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});

var app = express()
app.use(bodyParser.json())

//TODO: Use unversioned config for secret
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

var usersToPass = {}
usersToPass["java"] = "script"

app.put('/Register', 
    Register.Register(usersToPass)
)

app.put('/AddToCart',
    SessionManagement.VerifyLoggedIn,
    AddToCart.AddToCart
)

app.put('/Login', 
    Login.Login(usersToPass)
)

app.put('/Logout', 
    Logout.Logout
)

app.listen(8080)
console.log("Library backend listening on 8080")

