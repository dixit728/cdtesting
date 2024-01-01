//Require module
var jwt = require('jsonwebtoken');

class JWT {

    generateAccessToken(UserData) {
        var tk = jwt.sign(UserData, process.env.TOKEN_SECRET, { expiresIn: '180000000000s' });
        return tk;
    }

    getUID(token) {
        var output2 = jwt.verify(token, process.env.TOKEN_SECRET);
        return output2;
    }

}

module.exports = JWT;