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
            
            SessMan.EstablishSession(req, res)
            
            res.send("Login successful\n");
        }
    
    }

module.exports = {
    Login: (userMap) => Login(userMap)
}

// curl -X PUT -H "Content-Type: application/json" -d '{"username":"java", "password":"script"}' -b myJar -c myJar localhost:8080/Login