const controller = require('./../controller');
const bcrypt = require('bcrypt');

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
    await user.save();
    this.response({
      res, message: 'the user success fully regestered',
      data: {email, name, password}
    })
  }

  async login(req, res){
    res.send('login');
  }
})();