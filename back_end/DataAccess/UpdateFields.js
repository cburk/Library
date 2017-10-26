var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var GetDAL = require('./GetAllBooks')
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION
var NO_BORROWER = cfgManager.NO_BORROWER

var ChangeAvailability = (givenBookId, availabilityStatus) => {
	console.log("In Invert Availability (check in/out)");
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			var BookIdMatch = {bookId: givenBookId}
			AllBooksCollection.update(BookIdMatch, { $set: {available: availabilityStatus} }, (err, res) => {
				if (err) throw err;
				console.log("1 document updated");
				db.close();
			})
		}
	});
}

var ChangeBorrower = (givenBookId, personId) => {
	console.log("Changing borrower of book: " + givenBookId + " to: " + personId)
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			var BookIdMatch = {bookId: givenBookId}
			AllBooksCollection.update(BookIdMatch, { $set: {borrower: personId} }, (err, res) => {
				if (err) throw err;
				console.log("1 document updated");
				db.close();
			})
		}
	});
}


module.exports = {
	ChangeAvailability: ChangeAvailability,
	ChangeBorrower: ChangeBorrower
}

