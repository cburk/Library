var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION
var NO_BORROWER = cfgManager.NO_BORROWER

var GetAllBooksList = (callbackFunc) => {
        console.log("In Get All books");
        MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.find().toArray((err, res) => {
				if(err){ console.log("Query returned error: " + err ) }
				console.log("Query res: ")
                var results = []
                //TODO: Why not just pass back all?  Was that just debugging?
				res.forEach((el) => {
					//console.log("{id: " + el.id + "}")
					results.push(el)
                })
                
                console.log(results);
                
				callbackFunc(results)
			})
		}
	});
}

GetBookById = (bookId, callbackFunc) => {
    console.log("In Get single book: " + bookId);
    MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
        if(!err) {
            console.log("We are connected");
            
            var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);

            AllBooksCollection.findOne({bookId: bookId}, (err, res) => {
                if(err){ console.log("Query returned error: " + err ); return }
                console.log("Found results: " + res)
                callbackFunc(res)
            })
        }
    });

}

GetBooksByUsername = (bookId, callbackFunc) => {
    console.log("In Get single book: " + bookId);
    MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
        if(!err) {
            console.log("We are connected");
            
            var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);

            AllBooksCollection.findOne({bookId: bookId}, (err, res) => {
                if(err){ console.log("Query returned error: " + err ); return }
                console.log("Found results: " + res)
                callbackFunc(res)
            })
        }
    });

}

var AddBookToListOfAllBooks = (bookId, libraryId, borrower, title, author, owner, available, callbackFunc) => {
	var bookObj = {bookId: bookId, libraryId: libraryId, borrower: borrower, title: title, author: author, owner: owner, available: available}
	console.log("In DAL, adding book: " + bookObj);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.insert(bookObj)

			//TODO: Should eventually be unlocking the case so users can put the book in
			console.log("Sending good response")
			callbackFunc({"Response":"Added successfully"});
		}else{
			console.log("Error: " + err);
			callbackFunc({"Response":"Error connecting to db"})
		}
	});
}

var RemoveBookFromListOfAllBooks = (bookId, callbackFunc) => {
	console.log("In DAL, deleting book: " + bookId);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.remove({bookId: bookId})

			callbackFunc({"Response":"REmoved successfully"});
		}else{
			console.log("Error connecintg: " + err);
			callbackFunc({"Response":"Error connecting to db"});
		}
	});

}

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
	ChangeBorrower: ChangeBorrower,
	AddBookToLibrary: AddBookToListOfAllBooks,
	RemoveBookFromLibrary: RemoveBookFromListOfAllBooks,
	GetAllBooksList: GetAllBooksList,
    GetBookById: GetBookById,
    GetBooksByUsername: GetBooksByUsername
}

