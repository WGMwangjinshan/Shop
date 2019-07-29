const {Service} = require('egg');
// import {model} from "mongoose";
class RoleService extends Service{
       async insert(role)
       {
        var roleModel = new this.ctx.model.Role(role)
        try {
            await roleModel.save()
            return true;
        } catch (error) {
            return false;
        }
         
       }

       async findAll()
       {
         var roles =  await this.ctx.model.Role.find({});

        try {
             if(roles)
         {
                    return {flag:true,data:roles}
         }
        } catch (error) {
            return {flag:false}
        }

        
       }
       async findById(_id)
       {
        

        try {
             var role =  await this.ctx.model.Role.findById(_id);
             if(role)
         {
                    return {flag:true,data:role}
         }
        } catch (error) {
            return {flag:false}
        }

        
       }

       async update(_id,role){

        try {
            await this.ctx.model.Role.updateOne({_id:_id},role);
            return true;
        } catch (error) {
            return false;
        }
            
       }
       async deleteById(_id)
       {
        

        try {
             var role =  await this.ctx.model.Role.deleteOne({_id:_id});
             
         
                    return true
         
        } catch (error) {
            return false
        }

        
       }
       async insertManyRoleAccess(role_id,roleAccessArray)
       {
            

            try {
                await this.ctx.model.RoleAccess.deleteMany({role_id:role_id})
                await this.ctx.model.RoleAccess.insertMany(roleAccessArray)
                return {flag:true,msg:'角色是授权成功'}
            } catch (error) {
                return{flag:false,msg:'数据异常，角色授权失败'}
            }
       }


}
module.exports =RoleService