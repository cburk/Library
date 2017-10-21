var Register = (userToPass) => 
    (req, res) => {
        console.log("In Register");
        
        var user = req.body.username;
        var pass = req.body.password;
    
        //If no corresponding user:pass entry exists
        if(userToPass[user] == null){
            //TODO: Login, add session management stuff, etc
            
            userToPass[user] = pass
            res.send("Registered\n")
        }else{
            res.status(400);
            res.send("Error: Username already taken\n");
        }        
    }

module.exports = {
    Register: (userMap) => Register(userMap)
}
