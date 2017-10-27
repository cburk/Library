var md5 = require('md5')
var datetime = require('node-datetime')
var AddRemoveDAL = require('../DataAccess/AddRemoveBookFromLibrary')
var QueryDAL = require('../DataAccess/GetAllBooks')
var config = require('config');
var NO_BORROWER = config.NO_BORROWER

//TODO: Maybe refactor to be LibaryEndpoints, and include the gets, posts, and dels/rems?

var AddToLibrary = (req, res) => {
	console.log("Adding book to library w/ id: " + req.body.id);
	//TODO: Flesh out book object more
	var bookUID = md5(req.body.title + datetime.create().now())
	AddRemoveDAL.AddBookToLibrary(bookUID, NO_BORROWER, req.body.title, req.body.author, req.username, true)

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

// curl -X POST -H "Content-Type: application/json" -d '{"bookId":"64c37170ddcd1709c0cb6ad76041f94f"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/RemoveBookFromLibrary

// curl -X POST -H "Content-Type: application/json" -d '{"borrower":"Proust", "title":"Pale Fire", "author":" Vladimir Nabokov"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
// curl -X POST -H "Content-Type: application/json" -d '{"borrower":"Proust", "title":"V", "author":"Thomas Pynchon"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
