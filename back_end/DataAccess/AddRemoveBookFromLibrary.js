var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION

var AddBookToListOfAllBooks = (req, res, bookId, libraryId, borrower, title, author, owner, available) => {
	var bookObj = {bookId: bookId, libraryId: libraryId, borrower: borrower, title: title, author: author, owner: owner, available: available}
	console.log("In DAL, adding book: " + bookObj);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.insert(bookObj)

			//TODO: Should eventually be unlocking the case so users can put the book in
			console.log("Sending good response")
			res.send({"Response":"Added successfully"});
		}else{
			console.log("Error: " + err);
			res.send({"Response":"Error connecting to db"})
		}
	});
}

var RemoveBookFromListOfAllBooks = (req, res, bookId) => {
	console.log("In DAL, deleting book: " + bookId);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.remove({bookId: bookId})

			res.sendStatus({"Response":"REmoved successfully"});
		}else{
			console.log("Error connecintg: " + err);
			res.sendStatus({"Response":"Error connecting to db"});
		}
	});

}

module.exports = {
	AddBookToLibrary: AddBookToListOfAllBooks,
	RemoveBookFromLibrary: RemoveBookFromListOfAllBooks
}
