const controller = require('./../controller');

module.exports = new (class extends controller{
  async register(req, res){
    console.log(this)
    res.send('register');
  }
  async login(req, res){
    res.send('login');
  }
})();