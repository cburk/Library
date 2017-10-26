var GetDAL = require('../DataAccess/GetAllBooks')
var UpdateDAL = require('../DataAccess/UpdateFields')
var config = require("config")
var NO_BORROWER = config.NO_BORROWER

var CheckOutBook = (RelevantBook, bookId, Name, res) => {
	if(RelevantBook.available){
        UpdateDAL.ChangeAvailability(bookId, false)
        UpdateDAL.ChangeBorrower(bookId, Name)
		return res.sendStatus(200)
    }
    else{
        res.sendStatus(400)        
    }
}

var CheckInBook = (RelevantBook, bookId, Name, res) => {
    console.log("A" + RelevantBook != null)
    console.log("Name: " + Name)
    console.log("B" + RelevantBook.borrower == Name)
    console.log("C" + RelevantBook.available == false)
	if(RelevantBook != null && RelevantBook.borrower == Name && RelevantBook.available == false){
        UpdateDAL.ChangeAvailability(bookId, true)
        UpdateDAL.ChangeBorrower(bookId, NO_BORROWER)
		res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
}

module.exports = {
    CheckOut: (req, res) => {
        GetDAL.GetBookById(req.body.BookId, (bookFound) => {
            CheckOutBook(bookFound, req.body.BookId, req.username, res)
        })
    },
    CheckIn: (req, res) => {
        GetDAL.GetBookById(req.body.BookId, (bookFound) => {
            CheckInBook(bookFound, req.body.BookId, req.username, res)
        })
    }
}

// curl -X PUT -H "Content-Type: application/json" -d '{"BookId":"2f0c62e721ef3ca890fc917013bab0e0"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/CheckIn
// curl -X PUT -H "Content-Type: application/json" -d '{"BookId":"f4785bd80fdd082525ac6fd34aea73d8"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/CheckOut

