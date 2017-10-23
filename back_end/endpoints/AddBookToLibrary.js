var md5 = require('md5')
var datetime = require('node-datetime')
var DataAccessLayer = require('../Utils/DataAccess')

//TODO: Maybe refactor to be LibaryEndpoints, and include the gets, posts, and dels/rems?

var AddToLibrary = (req, res) => {
	console.log("Adding book to library w/ id: " + req.body.id);
	//TODO: Flesh out book object more
	var bookUID = md5(req.body.title + datetime.create().now())
	var book = {bookId: bookUID, title: req.body.title, author: req.body.author, owner: req.username}
	DataAccessLayer.AddBookToListOfAllBooks(book)
	console.log(book)

	DataAccessLayer.GetAllBooksList((elementsFound) => {
		console.log("In callback, query returned: " + elementsFound)
		elementsFound.forEach((el) => {
			console.log(el.author)
			console.log(el.owner)
		})
	})
	
	//TODO: Should eventually be unlocking the case so users can put the book in
	res.sendStatus(200)
}

module.exports = {
    AddBookToLibrary: AddToLibrary
}


// curl -X POST -H "Content-Type: application/json" -d '{title":"Pale Fire", "author":" Vladimir Nabokov"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddBookToLibrary
