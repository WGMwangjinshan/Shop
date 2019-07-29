const {Service}  =require('egg');
const fs = require('fs')

class GoodsBrandService extends Service{
    async insert(fromStream)
    {
        try {
        var body = fromStream.fields;
        var filePath =  await this.ctx.service.tool.filePath(fromStream.filename);
       body.brand_logo = filePath.dbpath;
      await this.ctx.service.tool.upLoadFile(filePath.targetPath,fromStream)
            console.log('baba============='+JSON.stringify(body));
            var goodsBrandModel = new this.ctx.model.GoodsBrand(body)
            await goodsBrandModel.save()
            return{flag:true,msg:'增加商品品牌成功'}
        } catch (error) {
            console.log(error); 
            return{flag:false,msg:'增加商品品牌失败'}
        }
    }
    async findAll()
    {
        try {
            var brands = await this.ctx.model.GoodsBrand.find({});
            return{flag:true,data:brands,msg:'获取商品类型成功'}
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
        console.log('sda'+goodsbrands);

                 return {flag:true,data:goodsbrands,msg:'进入修改商品类型成功'}
      }
     } catch (error) {
         console.log('sss'+error);
         
         return {flag:false,msg:'进入修改商品类型失败'}
     }

     
    }
    async update(fromStream){
        try {
            var  body = fromStream.fields;
            var _id = body._id;
                    if (fromStream.filename)
                    {
                    var filePath =  await this.ctx.service.tool.filePath(fromStream.filename);
                    body.brand_logo = filePath.dbpath
                    await this.ctx.service.tool.upLoadFile(filePath.targetPath,fromStream)
                    console.log("jhjhjhjhjhjjhhjjhhjjhjhhjhjhjjhjhh"+filePath.dbpath);

                    var object = await this.ctx.model.GoodsBrand.findOne({_id:_id},{_id:0,brand_logo:1});
                    var brand_logo = object.brand_logo;
                            if (brand_logo) {
                            var targetPath = "app"+brand_logo
                            fs.unlinkSync(targetPath)
                            }
                    
                    await this.ctx.model.GoodsBrand.update({_id:_id},body)
                    return true;
                    }
        } catch (error) {
            console.log(error);
            
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
module.exports = GoodsBrandService;