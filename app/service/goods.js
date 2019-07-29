const {Service}  =require('egg');
const fs = require('fs')

class Goodservice extends Service{
    async upload(parts)
    {
        try {
            var links = [];
            var fromStream ;
            while((fromStream =await parts())!=null)
            {
       if (fromStream.filename) {
        var filePath =  await this.ctx.service.tool.filePath(fromStream.filename);
        var targetPath = filePath.targetPath;
        var dbpath = filePath.dbpath;
        await this.ctx.service.tool.upLoadFile(targetPath,fromStream)
        links.push(dbpath)
                    
                }
                else{
                    continue;
                }
            }
            console.log(links);
            return{flag:true,data:links,msg:'商品相册添加成功'}
        } catch (error) {
            console.log(error); 
            return{flag:false,data:links,msg:'商品相册添加成功'}
        }
    }
    async findAll()
    {
        try {
            var goods = await this.ctx.model.Goods.find({});
            return{flag:true,data:goods,msg:'获取商品类型成功'}
        } catch (error) {
            return{flag:false,msg:'获取商品类型失败，数据异常'}
            
        }
    }
    async findById(_id)
    {

     try {
          var goodsbrands =  await this.ctx.model.GoodsBrand.findById(_id);
          if(goodsbrands)
      {
                 return {flag:true,data:goodsbrands,msg:'进入修改商品类型成功'}
      }
     } catch (error) {
         return {flag:false,msg:'进入修改商品类型失败'}
     }

     
    }
    async update(_id,goodstype){

        try {
            await this.ctx.model.GoodsType.updateOne({_id:_id},goodstype);
            return true;
        } catch (error) {
            return false;
        }
            
       }

     async deleteById(_id)
       {
        

        try {

            var object = await this.ctx.model.GoodsBrand.findOne({_id:_id},{_id:0,brand_logo:1})
            var brand_logo = object.brand_logo;
            var targetPath = 'app'+brand_logo

            fs.unlinkSync(targetPath)

             await this.ctx.model.GoodsBrand.deleteOne({_id:_id});
             
         
                    return true
         
        } catch (error) {
            console.log(error);
            
            return false
        }

        
       }
}
module.exports = Goodservice;