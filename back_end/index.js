/*eslint-env node*/
var Login = require('./endpoints/Login')
var Logout = require('./endpoints/Logout')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

var usersToPass = {}
usersToPass["java"] = "script"

app.put('/Login', 
    Login.Login(usersToPass)
)

app.put('/Logout', 
    Logout.Logout
)

app.listen(8080)
console.log("Library backend listening on 8080")

