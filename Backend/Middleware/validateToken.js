/* 
To show the current user data we will require the the access token of the uer and then validate that toke and then give access
*/
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(400);
          throw new Error("User is not autorized");
        }
        req.user = decoded; //so now the req.user will contain the current user data
        next();
      });
    } catch (error) {
      res.status(401);
      throw new Error("User is not authorized token failed");
    }
    if (!token) {
      res.status(400);
      throw new Error("user is not authorized");
    }
  } else {
    res.status(400);
    throw new Error("enter the access token");
  }
});
module.exports = validateToken;

/* 
here we first login get the access token then in another thunderclient request with url contianing current and get req , put the access token
in auth bearer and we will basically get the user info in return 
*/
