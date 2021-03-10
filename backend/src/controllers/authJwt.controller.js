const jwt = require("jsonwebtoken");
const secret = "fater04-is-the-secret-key";
const authJwt = {};
authJwt.secret = secret;
authJwt.verifyToken = function (req, res, next) {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};


module.exports = authJwt;
