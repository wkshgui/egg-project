const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    // ctx.body = 'hi, egg';

    const userInfo = await this.app.model.User.find();
    this.ctx.body = userInfo;
  }
}

module.exports = HomeController;
