var AddToCart = (req, res) => {
        console.log("In ATC, book requested w/ id: " + req.body.id)
        console.log(req.session.cart);

        //TODO: Check that book is on the shelf at the moment
        var desiredBook = {title: "Pale Fire", author: "Nabokov"}//Should be db call w/ logic to remove from available books
        req.session.cart.push(desiredBook)
        console.log(req.session.cart);     
        
        res.sendStatus(200)
    }

module.exports = {
    AddToCart: AddToCart
}

// curl -X PUT -H "Content-Type: application/json" -d '{"id":<hash>}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddToCart