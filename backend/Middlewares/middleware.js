const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const query = req.query?.single;
  const token = req.headers?.authentication;
  if (!query) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(401);
        res.send({ msg: "login required" });
        console.log(err);
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = authentication;
