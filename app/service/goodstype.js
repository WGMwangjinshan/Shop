const {Service}  =require('egg');
class GoodsTypeService extends Service{
    async insert(goodstype)
    {
        try {
            var GoodsTypeModel = new this.ctx.model.GoodsType(goodstype)
            await GoodsTypeModel.save()
            return{flag:true,msg:'增加商品成功'}
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'增加商品失败'}
            
        }
        // await this.ctx.model.GoodsTypeService.save(goodstype)
    }
    async findAll()
    {
        try {
            var goodstypes = await this.ctx.model.GoodsType.find({});
            return{flag:true,data:goodstypes,msg:'获取商品类型成功'}
        } catch (error) {
            return{flag:false,msg:'获取商品类型失败，数据异常'}
            
        }
    }
    async findById(_id)
    {

     try {
          var goodstype =  await this.ctx.model.GoodsType.findById(_id);
          if(goodstype)
      {
                 return {flag:true,data:goodstype,msg:'进入修改商品类型成功'}
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
             var goodstype =  await this.ctx.model.GoodsType.deleteOne({_id:_id});
             
         
                    return true
         
        } catch (error) {
            return false
        }

        
       }
}
module.exports = GoodsTypeService;