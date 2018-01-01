var md5 = require('md5')
var datetime = require('node-datetime')
var LibraryCRUD_DAL = require('../DataAccess/LibraryCRUD')
var QueryDAL = require('../DataAccess/GetAllBooks')
var config = require('config');
var NO_BORROWER = config.NO_BORROWER

var CreateLibrary = (req, res) => {
	console.log("Creating library called: " + req.body.name);

    var id = md5(req.body.name + datetime.create().now())
	LibraryCRUD_DAL.CreateLibrary(id, req.body.name, req.body.location)
	res.sendStatus(200)
}

var GetAllLibrariesEndpoint = (req, res) => {
    console.log("Get all books request,");
    LibraryCRUD_DAL.GetAllLibraries((librariesAndBooks) => {
        res.send(librariesAndBooks)
    })
}

module.exports = {
    CreateLibrary: CreateLibrary,
    GetAllLibrariesEndpoint: GetAllLibrariesEndpoint
}

// curl -X PUT -H "Content-Type: application/json" -d '{"name": "Christians Library", "location": "600 W Chicago Ave"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/Libraries

// curl localhost:8080/Libraries
