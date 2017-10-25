var DataAccess = require('../DataAccess/GetAllBooks')

var GetAllBooksEndpoint = (req, res) => {
    console.log("DA: " + DataAccess)
    DataAccess.GetAllBooksList((bookList) => {
        res.send(bookList)
    })
}

module.exports = {
    GetAllBooksEndpoint: GetAllBooksEndpoint
}
