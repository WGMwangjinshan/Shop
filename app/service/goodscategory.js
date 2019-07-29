const {Service}  =require('egg');
class GoodsCategoryService extends Service{
    async insert(goodscategory)
    {
        try {
            var GoodsCategoryModel = new this.ctx.model.GoodsCategory(goodscategory)
            await GoodsCategoryModel.save()
            return{flag:true,msg:'增加商品分类成功'}
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'增加商品分类失败'}
            
        }
        // await this.ctx.model.GoodsTypeService.save(goodstype)
    }
    async findAll()
    {
        try {
            var goodscategorys = await this.ctx.model.GoodsCategory.aggregate([
                
                {
                    $match:{
                       cate_pid:'0'
                             }
                },
                {
                $lookup:{
                    
                                from:'goods_categorys',
                                localField:'_id',
                                foreignField:'cate_pid',
                                as:'subcates'
                    
                        }
                 }
            
        ])
            console.log(goodscategorys.subcates);
            
            return{flag:true,data:goodscategorys,msg:'获取所有商品分类成功'}
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'获取所有商品分类失败，数据异常???????'}
            
        }
    }
        //查询所有顶级分类
    async findAllTopCates(){
        try {
           var topCates= await this.ctx.model.GoodsCategory.find({cate_pid:'0'})
           console.log('+++++++'+topCates);
           
            return{flag:true,data:topCates,msg:'查询所有等级分类成功'}

        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'数据异常，查询所有等级分类失败'}
        }
    }
    async findById(_id)
    {
        console.log('asdadad');
        
            var result= await this.ctx.model.GoodsCategory.findById({_id})
            if (result) {
                return{flag:true,data:result,msg:'查询成功'}
                
            }
    }
    async update(_id,goodscategory)
    {

        try {
            await this.ctx.model.GoodsCategory.updateOne({_id:_id},goodscategory);
            return true;
        } catch (error) {
            return false;
        }
            
     }
     async delete(_id)
       {
            try {
                // await this.ctx.model.GoodsCategory
                
            } catch (error) {
                
            }
       }
}
module.exports = GoodsCategoryService;