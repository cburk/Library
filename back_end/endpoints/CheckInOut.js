var BookCRUD = require('../DataAccess/BookCRUD')
var config = require("config")
var NO_BORROWER = config.NO_BORROWER


var CheckOutBook = (RelevantBook, bookId, Name, res) => {
    console.log("Attempting to check out book w/ id: " + bookId)

	if(RelevantBook.available){
        BookCRUD.ChangeAvailability(bookId, false)
        BookCRUD.ChangeBorrower(bookId, Name)
		res.send({"Response":"Successfully checked out book"})
    }
    else{
        res.send({"Response":"Error: Book not available"})       
    }
}

var CheckInBook = (RelevantBook, bookId, Name, res) => {
    console.log("A" + RelevantBook != null)
    console.log("Name: " + Name)
    console.log("B" + RelevantBook.borrower == Name)
    console.log("C" + RelevantBook.available == false)
	if(RelevantBook != null && RelevantBook.borrower == Name && RelevantBook.available == false){
        BookCRUD.ChangeAvailability(bookId, true)
        BookCRUD.ChangeBorrower(bookId, NO_BORROWER)
		res.send({"Response":"Successfully checked book back in"})
    }else{
        // TODO: Make better error messages
        res.send({"Response":"Error"})
    }
}

module.exports = {
    CheckOut: (req, res) => {
        console.log("Req.body: " + req.body)
        console.log("Req.book: " + req.body.BookId)
        console.log("Req.username: " + req.body.Username)
        BookCRUD.GetBookById(req.body.BookId, (bookFound) => {
            CheckOutBook(bookFound, req.body.BookId, req.Username, res)
        })
    },
    CheckIn: (req, res) => {
        BookCRUD.GetBookById(req.body.BookId, (bookFound) => {
            CheckInBook(bookFound, req.body.BookId, req.Username, res)
        })
    }
}

// curl -X PUT -H "Content-Type: application/json" -d '{"BookId":"f4785bd80fdd082525ac6fd34aea73d8"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/CheckIn
// curl -X PUT -H "Content-Type: application/json" -d '{"BookId":"f4785bd80fdd082525ac6fd34aea73d8"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/CheckOut

