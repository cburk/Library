var md5 = require('md5')
var datetime = require('node-datetime')
var AddRemoveDAL = require('../DataAccess/AddRemoveBookFromLibrary')
var QueryDAL = require('../DataAccess/GetAllBooks')
var config = require('config');
var NO_BORROWER = config.NO_BORROWER

//TODO: Maybe refactor to be bookEndpoints/booksCRUD, and include the gets, posts, and dels/rems?
// Big TODO: sanitize all input
var AddToLibrary = (req, res) => {
	console.log("Adding book to library w/ id: " + req.body.id);
	//TODO: Flesh out book object more
	var bookUID = md5(req.body.title + datetime.create().now())
	AddRemoveDAL.AddBookToLibrary(bookUID, req.body.LibraryId, NO_BORROWER, req.body.title, req.body.author, req.username, true)

	//TODO: Should eventually be unlocking the case so users can put the book in
	res.sendStatus(200)
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
			AddRemoveDAL.RemoveBookFromLibrary(req.body.bookId)
			res.sendStatus(200)
		}
	})

	//TODO: Trigger unlock eventually i guess
}

module.exports = {
	AddBookToLibrary: AddToLibrary,
	RemoveBookFromLibrary: RemoveBookFromLibrary
}

// curl -X POST -H "Content-Type: application/json" -d '{"title":"the sun also rises", "libraryId":"fa0c2bc424699149a97f1efd6d9b604b", "author":"Hemingway", "username":"ian"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary

// curl -X POST -H "Content-Type: application/json" -d '{"borrower":"Proust", "title":"Pale Fire", "author":" Vladimir Nabokov"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
// curl -X POST -H "Content-Type: application/json" -d '{"borrower":"Proust", "title":"V", "author":"Thomas Pynchon"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
