const { Controller } = require('egg')
const md5 = require('md5')


class HomeController extends Controller {
    //显示主页面
    async index() {
        //  var userinfo = this.ctx.session.userinfo;
        await this.ctx.render('index')
     


    }
}
module.exports = HomeController;