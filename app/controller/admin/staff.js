// const { Controller } = require('egg')
var BaseController = require('./base')
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const dateFormat = require('dateformat')
var mkdirp = require('mkdirp');




class StaffController extends BaseController {
    async add(){
      var object = await this.ctx.service.role.findAll();
      if(object.flag)
      {
        var roles = object.data;
        await this.ctx.render('admin/staff/add',{roles})
      }

    }
    
    async doAdd(){
      var body = this.ctx.request.body;
      body.login_pwd =await this.ctx.service.tool.md5(body.login_pwd);
      
      console.log("body==="+JSON.stringify(body));
      //依据账号查询 用户是否存在
      var login_name =  body.login_name
      
      var user_result = await this.ctx.service.staff.findByLoginName(login_name);
      if(user_result){
          var result = await this.ctx.service.staff.insert(body)
          if(result){
              await this.success('/admin/staff','添加用户成功')
          }else{
              await this.fail('/admin/staff/add','添加用户失败')
          }
      }else{
          await this.fail('/admin/staff/add','账户名 已经存在，增加失败')
      }
      
  }
      async welcome(){
         this.ctx.body = '欢迎'
      }
      async index(){
        var result =await this.ctx.service.staff.findAll();
        // console.log("result===="+JSON.stringify(result));
        
        if(result.flag){
            var staffs = result.data;
            await this.ctx.render('admin/staff/list',{staffs})
        }else{
            await this.fail('/admin/staff','数据异常')
        }
    }
    async edit(){
      var _id = this.ctx.request.query._id;
      var result1 = await this.ctx.service.staff.findById(_id);
      var result2 = await this.ctx.service.role.findAll();
      console.log('roles:==='+result1.data);
      
      if(result1.flag&&result2.flag){
          var staff = result1.data;
          var roles = result2.data;
          await this.ctx.render('admin/staff/edit',{staff,roles});
      }else{
          await this.fail('/admin/staff','数据异常')
      }
  }
  async doEdit(){
    var body = this.ctx.request.body;
    var _id = body._id;
    var pwd = body.login_pwd;
    console.log('body:=='+JSON.stringify(body));

    if(pwd){
        var staff = {
            login_name:body.login_name,
            login_pwd:await this.ctx.service.tool.md5(body.login_pwd),
            staff_name:body.staff_name,
            staff_no:body.staff_no,
            staff_phone:body.staff_phone,
            role_id:body.role_id,
            staff_status:body.staff_status
        }
        
    }else{
        var staff = {
            login_name:body.login_name,
            staff_name:body.staff_name,
            staff_no:body.staff_no,
            staff_phone:body.staff_phone,
            role_id:body.role_id,
            staff_status:body.staff_status
        }
    }

    
    var result = await this.ctx.service.staff.updateById(_id,staff)
    console.log('==='+JSON.stringify(result));
    
    if(result.flag){
        await this.success('/admin/staff',result.msg)
    }else{
        await this.fail(this.ctx.locals.lastPage,result.msg)
    }

}
async delete(){
  const {ctx} = this;
  var _id = ctx.request.query._id;

  var result = await ctx.service.staff.deleteById(_id);
  if(result){
      await this.success(ctx.locals.lastPage,'删除角色成功')
  }else{
      await this.fail(ctx.locals.lastPage,'访问异常')
  }

}
async upload()
{
   
    await this.ctx.render('admin/staff/upload');
    
		            
}
async doUpload()
{
     //获取文件流
     const stream  = await this.ctx.getFileStream();
     //创建一个文件夹
 
     let uploadBaseDir = this.config.uploadbasedir;   
     let dateDir  = dateFormat(new Date(),'yyyymmdd');  
     let baseDir = path.join(uploadBaseDir , dateDir);  
     mkdirp(baseDir);
 
 
     //创建上传文件统一名称  不能重复
     const filename = Date.now() + '' + Math.floor((Math.random() * 9000)+1000) + path.extname(stream.filename);
     const target = path.join(baseDir, filename);
     const writeStream = fs.createWriteStream(target);
 
     try {
         await awaitWriteStream(stream.pipe(writeStream));
     } catch (error) {
     await sendToWormhole(stream);  
         console.log(error);
     }
    this.ctx.body = '轻松'
}
}
module.exports = StaffController;