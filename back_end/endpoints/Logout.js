
var Logout = (req, res) => {
    console.log("In logout");
    
    var user = req.body.username
    var pass = req.body.password

    console.log(req.body);

    //TODO: Delete session

    res.send('asdf');
}


module.exports = {
    Logout: Logout
}