var BaseController = require('./base')


class UserController extends BaseController {


      async list(){
          const {ctx} = this
        var result =await ctx.service.user.findAll();
        // console.log("result===="+JSON.stringify(result));
        
        if(result.flag){
            var users = result.data;
            await ctx.render('admin/user/list',{users:users})
        }else{
            await this.fail(ctx.locals.lastPage,result.msg)
        }
    }
    async edit(){
        const {ctx} = this;
      var user_id = ctx.request.query._id;
      var result = await ctx.service.user.findById(user_id);

      
      if(result.flag){
          var user = result.data;
          await ctx.render('admin/user/edit',{user});
      }else{
          await this.fail('/admin/user',result.msg)
      }
  }

  async doEdit(){
    var body = this.ctx.request.body;
    var _id = body._id;
    

    
    var result = await this.ctx.service.user.update(_id,body)
    // console.log('==='+JSON.stringify(result));
    
    if(result.flag){
        await this.success('/admin/user',result.msg)
    }else{
        await this.fail(this.ctx.locals.lastPage,result.msg)
    }

}

async delete(){
  const {ctx} = this;
  var _id = ctx.request.query._id;

  var result = await ctx.service.staff.delete(_id);
  if(result){
      await this.success(ctx.locals.lastPage,'删除用户成功')
  }else{
      await this.fail(ctx.locals.lastPage,'访问异常，删除用户失败')
  }

}

}
module.exports = UserController;