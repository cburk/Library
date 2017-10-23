var SessMan = require('../Utils/SessionManagement')

var Register = (userToPass) => 
    (req, res) => {
        console.log("In Register");
        
        var user = req.body.username;
        var pass = req.body.password;
    
        //If no corresponding user:pass entry exists
        if(userToPass[user] == null){            
            userToPass[user] = pass
            SessMan.EstablishSession(req, user);
            res.send("Registered\n")
        }else{
            res.status(400);
            res.send("Error: Username already taken\n");
        }        
    }

module.exports = {
    Register: (userMap) => Register(userMap)
}
