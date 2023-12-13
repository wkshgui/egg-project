const Controller = require('egg').Controller;
class UserController extends Controller {
  async create() {
    const { ctx } = this;
    ctx.validate({
      username: {type: 'string'},
      email: {type: 'string'},
      password: {type: 'string'},
    });

    const userBody = ctx.request.body;
    if(await this.service.user.findEmail(userBody.email)) {
      ctx.throw(422, "邮箱已经存在");
    }
    const user = await this.service.user.createUser(userBody);

    ctx.body = user;
  }

  async login() {
    const userBody = this.ctx.request.body;
    this.ctx.validate({})
  }
}

module.exports = UserController;
