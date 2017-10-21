//Middleware to verify that user is logged in
VerifyLogin = (req, res, next) => {
    console.log("Session: \n")
    console.log(req.session)
    if(req.session.loggedIn == null || req.session.loggedIn == false){
        console.log("No session found, returning unauthorized");
        res.sendStatus(401)
    }else{
        console.log("In logged in/authorized path");
        next()
    }
}

Establish = (req, res) => {
    req.session.cart = []
    req.session.loggedIn = true
    console.log("New valid session established")
    req.session.save()
}

module.exports = {
    EstablishSession: Establish,
    VerifyLoggedIn: VerifyLogin
}