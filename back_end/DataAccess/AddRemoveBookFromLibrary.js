var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION

var AddBookToListOfAllBooks = (bookId, borrower, title, author, owner, available) => {
	var bookObj = {bookId: bookId, borrower: borrower, title: title, author: author, owner: owner, available: available}
	console.log("In DAL, adding book: " + bookObj);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.insert(bookObj)
		}
	});
}

var RemoveBookFromListOfAllBooks = (bookId) => {
	console.log("In DAL, deleting book: " + bookId);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.remove({bookId: bookId})
		}
	});

}

module.exports = {
	AddBookToLibrary: AddBookToListOfAllBooks,
	RemoveBookFromLibrary: RemoveBookFromListOfAllBooks
}
