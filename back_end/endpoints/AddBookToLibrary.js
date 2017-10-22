var DataAccessLayer = require('../Utils/DataAccess')

//TODO: Maybe refactor to be LibaryEndpoints, and include the gets, posts, and dels/rems?

var AddToLibrary = (req, res) => {
	//TODO: Need to be associating user w/ session so we know who’s doing what actions
	console.log("Adding book to library w/ id: " + req.body.id);
	DataAccessLayer.AddBookToListOfAllBooks({id: req.body.id})

	console.log("back in endpoint, found all: " + DataAccessLayer.GetAllBooksList())
        
        res.sendStatus(200)
    }

module.exports = {
    AddBookToLibrary: AddToLibrary
}


// curl -X POST -H "Content-Type: application/json"  -b mySessionStore.txt -c mySessionStore.txt -d '{"id":"3"}' localhost:8080/AddBookToLibrary
