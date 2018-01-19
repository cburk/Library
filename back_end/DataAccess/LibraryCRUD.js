var cfgManager = require('config');
var MongoClient = require('mongodb').MongoClient;
var BASE_URI = cfgManager.BASE_URI
var ALL_LIBRARIES_COLLECTION = cfgManager.ALL_LIBRARIES_COLLECTION
var ALL_BOOKS_COLLECTION = cfgManager.ALL_BOOKS_COLLECTION
var DB_LOCATION = cfgManager.DB_LOCATION

// A note about the data model for libraries and books as of
// 12/31/17:
// Although the typical model for mongo dbs is to use embedded data
// models (https://docs.mongodb.com/manual/core/data-model-design/)
// (i.e. the list of books would be contained in the library object)
// I'm not using that model b/c I want the flexibility for a book to
// exist outside of a library (for ease of moving between/possibly for
// just checking a book out normally) and I don't think the performance
// hit for a small number of libraries/users would outweigh the dev
// costs of not doing so.

var CreateLibrary = (id, name, location, callbackFunc) => {
	var libraryObj = {id, name, location, isLocked: true, contents: []}
	console.log("In DAL, adding book: " + libraryObj);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllLibrariesCollection = db.collection(ALL_LIBRARIES_COLLECTION);
            AllLibrariesCollection.insert(libraryObj)
            
            // Needs to return the library id so that the frontend knows how to refer to it
            callbackFunc({"Response":id});
		}else{
            callbackFunc({"Response":"Error connecting to db"});
        }
	});
}

/*
var RemoveBookFromListOfAllBooks = (bookId) => {
	console.log("In DAL, deleting book: " + bookId);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllLibrariesCollection = db.collection(ALL_LIBRARIES_COLLECTION);
			AllLibrariesCollection.remove({bookId: bookId})
		}
	});

}
*/

/*
TODO: Could do a join of sorts here, but it makes more sense in terms of cost
and semantics to just have the client do it
*/
GetAllLibraries = (callbackFunc) => {
    console.log("In DAL");
    MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
        if(!err) {
            console.log("We are connected");

            // Get the list of all libraries
            var AllLibrariesCollection = db.collection(ALL_LIBRARIES_COLLECTION);
            AllLibrariesCollection.find().toArray((err, res) => {
                if(err){
                    console.log("Error getting all libraries: " + err);
                    callbackFunc(err);
                    return;
                }
                var allLibraries = res;
                console.log("All libraries: ");
                console.log(allLibraries);
                callbackFunc(allLibraries);
            })
        } else {
            console.log("Error connecting: " + err);
            callbackFunc(err);
        }
    })
}

var ChangeLibraryLockStatus = (libraryId, shouldBeLocked, callbackFunc) => {
    console.log("In DAL, changing lock for lib: " + libraryId);
	MongoClient.connect(BASE_URI + DB_LOCATION, function(err, db) {
		if(!err) {
			console.log("We are connected");
			
			var AllLibrariesCollection = db.collection(ALL_LIBRARIES_COLLECTION);
			AllLibrariesCollection.update({id: libraryId}, { $set: {isLocked: shouldBeLocked} }, (err, res) => {
                if (err) throw err;
                console.log("Update lock to " + shouldBeLocked + " attempted, res: " + res)
			})

			console.log("Sending good response")
			callbackFunc({"Response":"Locked/Unlocked successfully"});
		}else{
			console.log("Error: " + err);
			callbackFunc({"Response":"Error connecting to db"})
		}
	});
}

var UnlockLibrary = (libraryId, callbackFunc) => {
    console.log("Unlocking library");
    ChangeLibraryLockStatus(libraryId, false, callbackFunc);
}

var LockLibrary = (libraryId, callbackFunc) => {
    console.log("Locking library");
    ChangeLibraryLockStatus(libraryId, true, callbackFunc);
}

//                 // Get the list of all books in libraries to associate w/ libraries
//                 var AllBooksCollection = db.collection(ALL_BOOKS_COLLECTION);
//                 AllBooksCollection.find( { libraryId: { $in: allLibraries } } ).toArray((err, res) => {
//                     if(err){
//                         console.log("Error getting all libraries: " + err);
//                         callbackFunc(err);
//                         return;
//                     }

//                     var allBooks = res;
//                     console.log("All books: ")
//                     console.log(res)

//                     // Return libraries and books as separate lists, clients can do the more expensive combination
//                     allBooks.forEach(book => {

//                     })

//                     // Map libraries to a list of all books
//                     callbackFunc(resultsArray)
//                 });
//             });
//         } else {
//             console.log("Error connecting: " + err);
//             callbackFunc(err);
//         }
//     })
// }

module.exports = {
    CreateLibrary: CreateLibrary,
    GetAllLibraries: GetAllLibraries,
    UnlockLibrary: UnlockLibrary,
    LockLibrary: LockLibrary
}
