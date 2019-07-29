const BaseController =require('./base');

class RoleController extends BaseController{
    async add()
    {
        await this.ctx.render('admin/role/add')
    }
    async doAdd()
    {
        const {ctx} = this;
        var body  = ctx.request.body;
        // var eole = {
        //     role_name:'body.role_name',
        //     role_desc:'body.role_desc',

        // }
      var result =   await this.ctx.service.role.insert(body);

      if(result)
      {
          await this.success('/admin/role/list','添加成功')
      }

      else
      {
        await this.fail('/admin/role/add','添加失败')

      }
    }
    async list()
    {
        var result = await this.ctx.service.role.findAll();
        // console.log(result);
        
        if(result.flag)
        {
            var roles = result.data
            await this.ctx.render('admin/role/list',{roles})
        }
  
        else
        {
          await this.fail('/admin/role','角色列表数据出错')
  
        }
        // await this.ctx.render('admin/role')
    }
    async edit()
    {
      const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.role.findById(_id);
        // console.log(result);


        if(result.flag)
        {
            var role = result.data
            await this.ctx.render('admin/role/edit',{role})
        }
  
        else
        {
          await this.fail('/admin/role','访问异常')
  
        }

        // await this.ctx.render()
    }
    async doEdit()
    {
        const {ctx} = this;
        var body  = ctx.request.body;
        console.log(body)
        var _id = body._id
        var status = body.data_status;
        if(status == 'on')
        {
          body.data_status = 1
        }
        else{
          body.data_status = 0;
        }

      var result =   await this.ctx.service.role.update(_id,body);

      if(result)
      {
          await this.success('/admin/role','修改成功')
      }

      else
      {
        await this.fail('/admin/role/edit','访问异常')

      }
    }
    async auth(){
      const {ctx} = this;
      var role_id = ctx.request.query._id;

      var result =  await ctx.service.access.findAllwithChecked(role_id);
      if (result.flag) {
        var accessArray =result.data
        await this.ctx.render('admin/role/auth',{accessArray,role_id})
      }
      else
      {
        await this.fail('/admin/role',result.msg)
      }

     
  }



  async doAuth()
  {
  const {ctx} =this;
  var body =  ctx.request.body;
  console.log(body);
  
  var role_id = body.role_id;

  if (body.access_checked) {
    var accessCheckedArray = body.access_checked
  }else
  {
    var accessCheckedArray =[];
  }
  var role_access_array = []
  accessCheckedArray.forEach(access_id => {
    var roleAccess = {
      role_id:role_id,
      access_id:access_id
    }
    role_access_array.push(roleAccess)
  });

  var result = await ctx.service.role.insertManyRoleAccess(role_id,role_access_array);
  if (result.flag) {
    await this.success('/admin/role',result.msg)
  }
  else
  {
    await this.fail('/admin/role/auth',result.msg)
  }
  }



    async delete()
    {
      const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.role.deleteById(_id);
        // console.log(result);


        if(result)
        {
            await this.success(ctx.locals.lastPage,'删除成功')
        }
  
        else
        {
          await this.fail(ctx.locals.lastPage,'访问异常')
  
        }

        // await this.ctx.render()
    }
        
}
module.exports = RoleController;