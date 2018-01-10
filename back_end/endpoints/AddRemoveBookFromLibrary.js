var md5 = require('md5')
var datetime = require('node-datetime')
var AddRemoveDAL = require('../DataAccess/AddRemoveBookFromLibrary')
var QueryDAL = require('../DataAccess/GetAllBooks')
var config = require('config');
var NO_BORROWER = config.NO_BORROWER

//TODO: Maybe refactor to be bookEndpoints/booksCRUD, and include the gets, posts, and dels/rems?
// Big TODO: sanitize all input
var AddToLibrary = (req, res) => {
	console.log("Req.body: " + req.body)
	console.log("Adding book to library w/ id: " + req.body.libraryId);
	//TODO: Flesh out book object more
	var bookUID = md5(req.body.title + datetime.create().now())
	//TODO: Maybe start out w/ requester having the book checked out
	AddRemoveDAL.AddBookToLibrary(req, res, bookUID, req.body.libraryId, NO_BORROWER, req.body.title, req.body.author, req.username, true)
}

var RemoveBookFromLibrary = (req, res) => {
	console.log("Trying to remove book: " + req.body.bookId)
	QueryDAL.GetBookById(req.body.bookId, (foundBook) => {
		if(foundBook == null){
			res.sendStatus(404)
			return
		}
		if(foundBook.owner != req.username){
				console.log("Error, requester" + req.username + " vs owner: " + foundBook.owner)
				res.sendStatus(403)
				return
		}
		if(!foundBook.available){
			console.log("Book unavailable currently")
			res.send(400)
			return
			//TODO: Maybe make it so that no one else can take it?
		}else{
			AddRemoveDAL.RemoveBookFromLibrary(req, res, req.body.bookId)
		}
	})

	//TODO: Trigger unlock eventually i guess
}

module.exports = {
	AddBookToLibrary: AddToLibrary,
	RemoveBookFromLibrary: RemoveBookFromLibrary
}

// curl -X POST -H "Content-Type: application/json" -d '{"title":"the sun also rises", "LibraryId":"fa0c2bc424699149a97f1efd6d9b604b", "author":"Hemingway", "username":"ian"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary

// curl -X POST -H "Content-Type: application/json" -d '{"borrower":"Proust", "title":"Pale Fire", "author":" Vladimir Nabokov"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
// curl -X POST -H "Content-Type: application/json" -d '{"borrower":"Proust", "title":"V", "author":"Thomas Pynchon"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
