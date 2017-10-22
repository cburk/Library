
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = "mongodb://localhost:27017"
var ALL_BOOKS_COLLECTION = "AllBooks"

//Working connection
/*
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
*/

var AddBookToListOfAllBooks = (bookObj) => {
        console.log("In DAL, adding book: " + bookObj);
        MongoClient.connect(BASE_URI + "/Library", function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.insert(bookObj)
		}
	});
    }

var GetAllBooksList = () => {
        console.log("In Get All books");
        MongoClient.connect(BASE_URI + "/Library", function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.find().toArray((err, res) => {
				if(err){ console.log("Query returned error: " + err ) }
				console.log("Query res: ")
				res.forEach((el) => {
					console.log("{id: " + el.id + "}")
				})
				return res
			})
		}
	});
    }

module.exports = {
    AddBookToListOfAllBooks: AddBookToListOfAllBooks,
    GetAllBooksList: GetAllBooksList
}
