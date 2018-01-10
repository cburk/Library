var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION

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

module.exports = {
    GetAllBooksList: GetAllBooksList,
    GetBookById: GetBookById,
    GetBooksByUsername: GetBooksByUsername
}

