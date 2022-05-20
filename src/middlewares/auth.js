const jwt = require('jsonwebtoken');
const User = require('./../models/user');

async function isLoggined(req, res, next){
  const token = req.header('x-auth-token');
  if(!token) res.status(401).send('access denied');
  try{
    const decoded = jwt.verify(token, process.env.jwt_key);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  }catch(ex){
    res.status(400).send('invalid token');
  }
}

async function isAdmin(req, res, next){
  try{
    if(!req.user.isadmin) throw {status: 403, message: 'access denied'}; // res.status(403).send('access denied');
    next();
  }catch(error){
    next(error)
  }
}
module.exports = {
  isLoggined, isAdmin
}