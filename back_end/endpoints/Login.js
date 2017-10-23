var SessMan = require('../Utils/SessionManagement')

var Login = (userToPass) => 
    (req, res) => {
        console.log("In Login");
        
        var user = req.body.username;
        var pass = req.body.password;

        
        if(userToPass[user] != pass){
            res.sendStatus(401)
        }else{
            console.log(userToPass);        
            
            SessMan.EstablishSession(req, user)

            res.send("Login successful\n");
        }
    
    }

module.exports = {
    Login: (userMap) => Login(userMap)
}

// curl -X PUT -H "Content-Type: application/json" -d '{"username":"memes", "password":"tbh"}' -b mySessionStore.txt -c mySessionStore.txt localhost:8080/Login