var config = require('config')
var md5 = require('md5')
var SALT = config.SALT


var GetSaltedPassword = (password) => {
    return md5(SALT + password)
}

module.exports = {
    GetSaltedPassword: GetSaltedPassword
}