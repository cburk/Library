var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION

var GetAllBooksList = (callbackFunc) => {
        console.log("In Get All books");
        MongoClient.connect(BASE_URI + "/Library", function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
			AllBooksCollection.find().toArray((err, res) => {
				if(err){ console.log("Query returned error: " + err ) }
				console.log("Query res: ")
				var results = []
				res.forEach((el) => {
					//console.log("{id: " + el.id + "}")
					results.push(el)
				})
				callbackFunc(results)
			})
		}
	});
}

module.exports = {
    GetAllBooksList: GetAllBooksList
}

