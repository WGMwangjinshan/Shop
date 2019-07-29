const { Controller } = require('egg')
// const md5 = require('md5')
var BaseController = require('./base')

class loginController extends BaseController {

    //渲染
    async index() {
        await this.ctx.render('login', { _csrf: this.ctx.csrf })
    }
    async doLogin() {
        //获取用户密码
            //加密
        //数据验证
            //账号密码数据库查询
                //没有提示用户密码错误
                //登陆成功 session储存
                //如果session 直接登录
                //如果session 跳转登录，session超时
        let login_name = this.ctx.request.body.username;
        // let randomNum = await this.ctx.service.tool.randomNumber()
        // let login_pwd = await this.ctx.service.tool.md5Secret(this.ctx.request.body.password,randomNum);
        let login_pwd = await this.ctx.service.tool.md5(this.ctx.request.body.password);
        let code = this.ctx.request.body.code;

        var result = await this.ctx.service.login.find(login_name,login_pwd,code);
        if(result.flag){
            await this.success('/admin',result.msg)
        }else{
            await this.fail('/admin/login',result.msg)
        }
       
    
    }


    async verifyCode(){
        //生成验证码
        //存储验证码 seesion
        //返回浏览器
        var captcha =await this.ctx.service.tool.captcha(100,35,40);
        console.log(captcha.text);
        this.ctx.session.code = captcha.text;
        this.ctx.response.type = 'image/svg+xml'
        this.ctx.body = captcha.data
        
    }
    async logout()
    {
        this.ctx.session.userinfo = null;
        this.ctx.redirect('/admin/login')
    }
}
module.exports = loginController;