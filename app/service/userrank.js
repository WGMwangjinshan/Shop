const {Service} = require('egg');
// import {model} from "mongoose";
class UserrankService extends Service{
       async insert(userrank)
       {
        var userrankModel = new this.ctx.model.Userrank(userrank)
        try {
            await userrankModel.save()
            return {flag:true,msg:'增加等级成功'};
        } catch (error) {
            
            return {flag:false,msg:'增加等级失败'};

        }
         
       }

       async findAll()
       {

        try {
         var userranks =  await this.ctx.model.Userrank.find({}).sort({data_sort:-1});

             if(userranks)
         {
                    return {flag:true,data:userranks,msg:'查询所有会员等级成功'}
         }
        } catch (error) {
            // console.log(error);
            
            return {flag:false,data:userranks,msg:'查询会员失败'}
        }

        
       }
       async findById(_id)
       {
        

        try {
             var userrank =  await this.ctx.model.Userrank.findById(_id);
             if(userrank)
         {
                    return {flag:true,data:userrank,msg:'依据id查询成功'}
         }
         
        } catch (error) {
            return {flag:false,msg:'依据id查询失败'}
        }

        
       }

       async update(_id,userrank){

        try {
            await this.ctx.model.Userrank.updateOne({_id:_id},userrank);
            return true;
        } catch (error) {
            return false;
        }
            
       }
       async deleteById(_id)
       {
        

        try {
             var userrank =  await this.ctx.model.Userrank.deleteOne({_id:_id});
             
         
                    return true
         
        } catch (error) {
            return false
        }

        
       }
       async getUserrankByscore(score)
       {
           
    var userrank =    await this.ctx.model.Userrank.findOne({start_score:{$lte:score},end_score:{$gt:score}})
            // console.log('lalalalalalal'+userrank);

        return userrank.rank_name;
        
    }
    

       
    


}
module.exports =UserrankService