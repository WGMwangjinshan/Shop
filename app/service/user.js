const {Service} = require('egg');
// import {model} from "mongoose";
class UserService extends Service{


       async findAll()
       {
        

        try {
       var users =  await this.ctx.model.User.find({});

            // users.forEach(user => {
            //     var score = user.user_totalScore
            //     var rank_name = this.ctx.service.userrank.getUserrankByscore(score);
            //     user.user_rank = rank_name
            // });

            for (const user of users) {
                var score = user.user_totalscore
                // console.log('asdasdadadadasd+++++++++'+score);
                var rank_name = await this.ctx.service.userrank.getUserrankByscore(score);
                user.user_rank = rank_name
            }

       return{flag:true,data:users,msg:'查询所有会员成功'}
        } catch (error) {
            return {flag:false,msg:'查询所有会员失败'}
        }
       }
       async findById(user_id)
       {
        

        try {
             var user =  await this.ctx.model.User.findById(user_id);
             if(user)
         {
                    return {flag:true,data:user,msg:'依据id查询会员成功'}
         }
        } catch (error) {
            return {flag:false,msg:'数据异常，依据id查询会员失败'}
        }

        
       }

       async update(_id,user){

        try {
            await this.ctx.model.User.updateOne({_id:_id},user);
            return {flag:true,msg:'会员更新成功'};
        } catch (error) {
            return {flag:false,msg:'会员更新失败'};
        }
            
       }
       async delete(_id)
       {
        

        try {
             var user =  await this.ctx.model.User.deleteOne({_id:_id});
             
         
                    return true
         
        } catch (error) {
            return false
        }

        
       }



}
module.exports = UserService