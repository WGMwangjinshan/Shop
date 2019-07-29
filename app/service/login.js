const {Service}  =require('egg');
class LoginService extends Service{
    async find(login_name,login_pwd,code){
        var sessionCode = this.ctx.session.code;
        if(code.toUpperCase()==sessionCode.toUpperCase()){
            var result  = await this.ctx.service.staff.find(login_name,login_pwd);
            if(result.flag){
                var staff = result.data;
                console.log('staff==='+JSON.stringify(staff));
                
                if(staff.staff_status==1){
                    this.ctx.session.userinfo = staff;
                    return {flag:true,msg:result.msg};
                }else{
                    return {flag:false,msg:'该用户异常，请联系管理员'};
                }
            }else{
                return {flag:false,msg:'用户名或密码错误'};
            }
        }else{
            return {flag:false,msg:'验证码错误'}
        }
    }

    // async login(username,password,code){
    //     if (code.toUpperCase() == sessionCode.toUpperCase()) {
    //         var result = await this.ctx.service.login.find(login_name,login_pwd);
    //         if(result)
    //         {
    //             // this.ctx.redirect('/admin')
    //             await this.success('/admin','登陆成功')
    //         }
    //         else
    //         {
    //             // this.ctx.body = '用户名或密码错误'
    //             await this.fail('/admin/login','用户名或密码错误')

    //         }
            
    //     }
    //     else
    //         {
    //             await this.fail('/admin/login','验证码错误')
    //         }
    // }
}
module.exports = LoginService;