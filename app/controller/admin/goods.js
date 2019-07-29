var BaseController = require('./base')


class GoodsController extends BaseController{
    async list()
    {
            var result = await this.ctx.service.goods.findAll();
            console.log(result);
            
            if (result.flag) {
                var goodss = result.data;
                // console.log("klalalalalal")
                await this.ctx.render('admin/goods/list',{goodss})
            }
            else{
                this.ctx.body = result.msg
            }
    }
    async upload()
    {
        await this.ctx.render('/admin/goods/upload')
        
    }
    //图片上传
    async doUpload()
    {
            console.log('lalalalalala');
            
            var parts = await this.ctx.multipart({autoFields:true})
          
             var result =  await this.ctx.service.goods.upload(parts);
             
             
             if (result.flag) {
                var links = result.data
                this.ctx.body = {link:links[0]}
             }
             else
             
             {
                this.ctx.body = result.msg
             }
             
    }
    //显示添加商品  
    async add()
    { 

        const {ctx} = this;
        var typeResult = await ctx.service.goodstype.findAll();
        var cateResult = await ctx.service.goodscategory.findAll();
        var brandResult = await ctx.service.goodsbrand.findAll();
        if (typeResult.flag&&cateResult.flag&&brandResult.flag)
         {
        var types = typeResult.data
        var cates = cateResult.data    
        var brands = brandResult.data    
        await ctx.render('admin/goods/add',{types,cates,brands})

        }
        else
        {
                await this.fail('/admin/goods','首页显示增加页面失败')
        }


    }
    async change(){
        var _id = this.ctx.request.query.type_id
        console.log('111111');
        
        console.log(_id);
        
        var result = await this.ctx.service.goodstypeattr.findAllByTypeId(_id)
        console.log(JSON.stringify(result));
        
        if(result.flag){
          var data = result.data
          this.ctx.body = {data:data}
        }else{
          this.ctx.body = '12345678'
        }
      
      
      }
    
    async doAdd()
    {
        
    }

}
module.exports = GoodsController;