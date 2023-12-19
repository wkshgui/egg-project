const user = require('../model/user');

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
    this.ctx.validate({
      email: {type: 'string'},
      password: {type: 'string'}
    },userBody);

    const user = await this.service.user.findEmail(userBody.email);
    if(!user) {
      this.ctx.throw(422, "用户未注册");
    }
    if(this.ctx.helper.md5(userBody.password) !== user.password){
      this.ctx.throw(422, "密码不正确");
    }

    const token = this.service.user.createToken({user});
    const userInfo = user._doc;
    delete userInfo.password;
    this.ctx.body = {
      ...userInfo,
      token
    }
  }

  async userInfo() {
    const registerUserid = this.ctx.user ? this.ctx.user._id : null;
    const userid = this.ctx.params.userid;
    const { Subscribe, User } = this.app.model;
    let isSubscribe = false;
    if(registerUserid) {
      const subscribe = await Subscribe.findOne({
        user: registerUserid,
        channel: userid
      });
      if(subscribe) {
        isSubscribe = true;
      }
    }

    const userInfoDb = await User.findById(userid);
    const userInfo = userInfoDb._doc;
    userInfo.isSubscribe = isSubscribe;

    this.ctx.body = userInfo;
  }
}

module.exports = UserController;