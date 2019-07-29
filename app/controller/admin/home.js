// const { Controller } = require('egg')
var BaseController = require('./base')

const md5 = require('md5')


class HomeController extends BaseController {
    //显示主页面
    async index() {
         var userinfo = this.ctx.session.userinfo;
        // if (userinfo != null) {
            // this.ctx.body = "home page===username:" + userinfo.staff_name
        // } else {
            // this.ctx.redirect('/admin/login')
        // }
        await this.ctx.render('/home/home')
        // console.log(userinfo);


    }
}
module.exports = HomeController;