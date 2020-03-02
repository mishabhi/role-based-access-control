const bcrypt = require('bcrypt');
const JWTService = require('jsonwebtoken');
const User = require('../models/User');
const ALLOWED_NON_AUTH_URLS = ["POST:/api/v1/login"
                              //,"POST:/api/v1/user"
                              ]


exports.encodePassword = async (password) => {
  return await bcrypt.hash(password, 8);
}

exports.validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.authenticate = async (req, res, next) => {
  if(ALLOWED_NON_AUTH_URLS.includes(req.method + ":" + req.path)){
    return next();    
  }
  
  if(req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await JWTService.verify(accessToken, process.env.JWT_SECRET);      
      if((exp < Date.now().valueOf() / 1000) || !userId) {
        return res.status(401).json({error: "Token Required."});
      }
      let user = await User.findOne({_id: userId});
      if (!user){
        return res.status(401).json({error: "You need to be logged in to access this url"});
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({error: "You need to be logged in to access this url"});
    }
  } else {
    return res.status(401).json({error: "You need to be logged in to access this url"});
  }
}

exports.generateToken = (user) => {
  return JWTService.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
}

