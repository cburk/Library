//TODO: To user id instead, and add db call to store user info like name and email
// w/ unique id 
var sessIdToUsername = {}

//Middleware to verify that user is logged in
VerifyLogin = (req, res, next) => {
    if(sessIdToUsername[req.session.id] == null){
        console.log("No session found, returning unauthorized");
        res.sendStatus(401)
    }else{
        console.log("User logged in as: " + sessIdToUsername[req.session.id])
        req.username = sessIdToUsername[req.session.id]
        next()
    }
}

Establish = (req, username) => {
    //Initialize session
    req.session.cart = []
    //TODO: Set session to expire after a certain amount of time
    //Note which user this session belongs to
    sessIdToUsername[req.session.id] = username

    //req.session.save()
}

module.exports = {
    EstablishSession: Establish,
    VerifyLoggedIn: VerifyLogin
}

/*
curl -X PUT -H "Content-Type: application/json" -d '{"username":"diff", "password":"ers"}' -b other.txt -c other.txt localhost:8080/Register
curl -X PUT -H "Content-Type: application/json" -d '{"id":2}' -b other.txt -c other.txt localhost:8080/AddToCart
*/