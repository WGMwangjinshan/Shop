const {Service} = require('egg');
// import {model} from "mongoose";*-
class StaffService extends Service{
       async insert(staff)
       {
        var staffModel = new this.ctx.model.Staff(staff)
        try {
            await staffModel.save();
            return true;
        } catch (error) {
            return false;
        }
         
       }

       async find(login_name,login_pwd){

        try {
            var result  = await this.ctx.model.Staff.findOne(
                {login_name:login_name,login_pwd:login_pwd},
                {staff_name:1,staff_status:1,role_id:1,is_super:1,_id:0})
                console.log(JSON.stringify(result));
                console.log(login_name);
                console.log(login_pwd);

                
                
            return {flag:true,data:result,msg:'登录成功'};
        } catch (error) {
            return {flag:false,data:result,msg:'登录失败'};
            
        }

       
    }
       async findAll(){
        
        try {
            var staffs  = await this.ctx.model.Staff.aggregate([
                {
                   $lookup:{
                        from: 'roles', 
                        localField: 'role_id', 
                        foreignField: '_id', 
                        as: 'role'
                    } 
                },
            ]
            )

            
            if(staffs){
                return {flag:true,data:staffs}
            }

        } catch (error) {
            return  {flag:false};
        }
            
    }

    //依据id查询staff
    async findById(_id){
        
        try {
            var staff = await this.ctx.model.Staff.findById(_id);
            
            if(staff){
                return {flag:true,data:staff}
            }
        } catch (error) {
            return  {flag:false};
        }
    }

       async findByLoginName(login_name){
        var result  = await this.ctx.model.Staff.findOne({login_name:login_name});
       
        if(result){
            return false;
        }else{
            return true;
        }
    }
    async updateById(_id,staff){
        try {
            //console.log(staff);
           await this.ctx.model.Staff.update({_id:_id},staff);
            return {flag:true,msg:'更新用户信息成功'};
        } catch (error) {
            return {flag:false,msg:'数据异常，更新用户信息失败'};
        }
    }
    async deleteById(_id){
        try {
             await this.ctx.model.Staff.deleteOne({_id:_id});
             return {flag:true,msg:'删除用户成功'};       
        } catch (error) {
            return {flag:false,msg:'数据异常，删除用户失败'};   
        }
    }
        //检测当前用户访问权限
    async checkAuth(role_id,path)
    {

        var ignoreUrl = ['/admin/login','/admin/doLogin','/admin/verify','/admin/logout','/admin',"/admin/welcome"]
        var is_super = this.ctx.locals.userinfo.is_super;
        if (ignoreUrl.indexOf(path)!=-1 ||  is_super==1) {
            return{flag:true,msg:'拥有访问权限'}
            
        }
       var result1 = await this.ctx.service.access.findByRoleId(role_id)
       var result2 =  await this.ctx.service.access.findByUrl(path)
       if(result1.flag && result2.flag)
       {
           var accessArray = result1.data;
           var access = result2.data;
           var accessAll =[];
           accessArray.forEach(element => {
            accessAll.push(element.access_id.toString())
           });
           console.log(accessAll);
           console.log(access);
           console.log('+++++++'+accessArray)

           
           if (accessAll.indexOf(access._id.toString())!=-1) {
               return{flag:true,msg:'拥有访问权限'}
           } else {
            return{flag:false,msg:'没有拥有访问权限，请联系管理员'}
               
           }
       }

    }
}
module.exports =StaffService