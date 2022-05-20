const controller = require('./../controller');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = new (class extends controller{
  async dashboard(req, res){
    res.send('user dashboard')
  }
  
  async me(req, res){
    const {name, email} = req.body;
    this.response({res, data: {name, email}});
   }

})();