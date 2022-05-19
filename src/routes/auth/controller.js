const controller = require('./../controller');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = new (class extends controller{
  async register(req, res){
    let user = await this.User.findOne({email: req.body.email});
    if(user){
      return this.response({
        res, code: 400, message: 'this user already registered'
      })
    }
    const {email, name, password} = req.body;
    user = new this.User({email, name, password});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    this.response({
      res, message: 'the user success fully regestered',
      data: {email, name, password}
    })
  }

  async login(req, res){
    const user = await this.User.findOne({email: req.body.email});
    if(!user){
      return this.response({
        res, code: 401, message: 'invalid email or password'
      });
    }
    const isValid = await bcrypt.compareSync(req.body.password, user.password);
    if(!isValid){
      return this.response({
        res, code: 401, message: 'invalid email or password'
      });
    };
    const token = jwt.sign({_id: user.id}, process.env.jwt_key);
    this.response({res, code:200, message: 'successfuly logged in', data: {token}});
  }
})();