var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION

var AddBookToListOfAllBooks = (bookObj) => {
        console.log("In DAL, adding book: " + bookObj);
        MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.insert(bookObj)
		}
	});
}

module.exports = {
    AddBookToListOfAllBooks: AddBookToListOfAllBooks,
}
