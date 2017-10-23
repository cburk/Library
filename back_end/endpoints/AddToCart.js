


var AddToCart = (req, res) => {
        console.log("In ATC, id requested: " + req.body.id);
        console.log(req.session.cart);
        req.session.cart.push(req.body.id)
        console.log(req.session.cart);     
        
        res.sendStatus(200)
    }

module.exports = {
    AddToCart: AddToCart
}

// curl -X PUT -H "Content-Type: application/json" -d '{"id":"1"}'  -b mySessionStore.txt -c mySessionStore.txt localhost:8080/AddToCart