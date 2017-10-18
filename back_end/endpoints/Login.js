
var Login = (userToPass) => 
    (req, res) => {
        console.log("In Login");
        
        var user = req.body.username;
        var pass = req.body.password;
    
        console.log(userToPass);
        userToPass[user] = pass
    
        res.send("login");
    }

module.exports = {
    Login: (userMap) => Login(userMap)
}

// curl -X PUT -H "Content-Type: application/json" -d '{"username":"jim", "password":"bob"}' localhost:8080/Login