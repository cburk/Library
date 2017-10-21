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
    //TODO: Do this w/ a hidden config file or something
    //session.startSession(req, res, () => {})
    req.session.cart = []
    req.session.loggedIn = true
    
    req.session.save()
    console.log("in setup, req has cart? : ", req.session.cart)
}

module.exports = {
    EstablishSession: Establish,
    VerifyLoggedIn: VerifyLogin
}