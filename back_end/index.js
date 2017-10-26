/*eslint-env node*/
var Login = require('./endpoints/Login')
var AddToCart = require('./endpoints/AddToCart')
var AddBookToLibrary = require('./endpoints/AddBookToLibrary')
var Register = require('./endpoints/Register')
var Logout = require('./endpoints/Logout')
var GetBooks = require('./endpoints/GetAllBooks')
var CheckInOut = require('./endpoints/CheckInOut')
var express = require('express')
var bodyParser = require('body-parser')

// TODO: Remove for prod, 
var DropCollections = require('./DataAccess/DropCollections')
var UsersDAL = require('./DataAccess/Users')

var SessionManagement = require('./Utils/SessionManagement')
var session = require('express-session');
var FileStore = require('session-file-store')(session)
//session = new NodeSession({secret: ‘Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});

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


Register.NextUserId = [1,2 ,3].length

/* TODO: Maybe use configs for endpoints instead, for consistency? */
// POST Add to?  Semantically correct?
app.post("/AddBookToLibrary", 
    SessionManagement.VerifyLoggedIn,
    AddBookToLibrary.AddBookToLibrary
)

//TODO: Is registration more of a post?
app.put('/Register', 
    Register.Register
)

// Semantics?
app.put('/AddToCart',
    SessionManagement.VerifyLoggedIn,
    AddToCart.AddToCart
)

app.put('/Login', 
    Login.Login
)

app.put('/Logout', 
    SessionManagement.VerifyLoggedIn,
    Logout.Logout
)

app.get('/BookList',
    GetBooks.GetAllBooksEndpoint
)

//TODO: Definitely needs to leave code for production
app.put('/DropCollections',
    DropCollections.DropAllCollections
)

app.put('/CheckIn',
    SessionManagement.VerifyLoggedIn,
    CheckInOut.CheckIn
)

app.put('/CheckOut',
    SessionManagement.VerifyLoggedIn,
    CheckInOut.CheckOut
)

//TODO: Debugging purpsoses only, like drop tables
app.get('/Users',
    UsersDAL.getallusersEndpoint
)

app.listen(8080)
console.log("Library backend listening on 8080")

/*
curl -X PUT -H "Content-Type: application/json" -d '{"username":"ian", "password":"curtis"}' -b mySessionStore.txt -c mySessionStore.txt localhost:8080/Register
curl -X POST -H "Content-Type: application/json" -d '{"title":"Pale Fire", "author":" Vladimir Nabokov"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
curl -X PUT -H "Content-Type: application/json" -d '{"id":<hash>}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddToCart
curl -X GET localhost:8080/BookList

curl -X PUT -H "Content-Type: application/json" localhost:8080/DropCollections
*/