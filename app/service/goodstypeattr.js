const {Service}  =require('egg');
class GoodsTypeAttrService extends Service{
    async insert(goodstypeattr)
    {
        try {
            var GoodsTypeAttrModel = new this.ctx.model.GoodsTypeAttr(goodstypeattr)
            await GoodsTypeAttrModel.save()
            return{flag:true,msg:'增加商品属性成功'}
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'增加商品属性失败'}
            
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
    async findAllByTypeId(type_id)
    {
     try {
        var allAttrs = await this.ctx.model.GoodsTypeAttr.find({type_id:type_id}).sort({data_sort:1})
        return {flag:true,data:allAttrs,msg:'根据typeid查询所有类型属性成功'}

     } catch (error) {
         console.log(error);
         
         return {flag:false,msg:'根据typeid查询所有类型属性失败'}
     }

     
    }
    async findAttrWithType(attr_id)
    {
        var attr_id = this.app.mongoose.Types.ObjectId(attr_id);

        try {
            var attrWithType =  await this.ctx.model.GoodsTypeAttr.aggregate([
                
                {
                    $match:{
                        '_id':attr_id
                             }
                },
                {
                $lookup:{
                    
                        from:"goods_types",
                        localField:'type_id',
                        foreignField:'_id',
                        as:'goodstype'
                    
                        }
                 }
            
        ])
        return{flag:true,data:attrWithType[0],msg:'属性关联类型查询成功'}
        } catch (error) {
            console.log(error);
        return{flag:false,msg:'属性关联类型查询失败'}
            
        }
          
    }
    async update(_id,goodstypeattr){

        try {
            await this.ctx.model.GoodsTypeAttr.updateOne({_id:_id},goodstypeattr);
            return true;
        } catch (error) {
            return false;
        }
            
       }
     async deleteById(_id)
       {
        

        try {
              await this.ctx.model.GoodsTypeAttr.deleteOne({_id});
            //   console.log('啦啦啦啦啦啦啦啦');
              
                    return true
         
        } catch (error) {
            return false
        }

        
       }
}
module.exports = GoodsTypeAttrService;