var BaseController = require('./base')

//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！
//商品品牌模块！！！！！！！！！！！

class GoodsBrandController extends BaseController{
    async list()
    {
            var result = await this.ctx.service.goodsbrand.findAll();
            if (result.flag) {
                var brands = result.data;
                // console.log("klalalalalal")
                await this.ctx.render('admin/goodsbrand/list',{brands})

            }
            else{
                this.ctx.body = result.msg
            }
    }
    async add()
    {
        await this.ctx.render('/admin/goodsbrand/add')
        
    }
    async doAdd()
    { 
       //获取文件流
     const fromStream  = await this.ctx.getFileStream();
    //  var parts = await this.ctx.multipart({autoFields:true});
    //  console.log(parts);
     
    //   var fromStream = await parts()
    //   console.log(fromStream);


    //  while( fromStream!=null)
    //  {
    //    if (fromStream&&fromStream.filename)
    //     {
          
    //     }
    //    else
    //    {
    //       continue
    //    }
    //  }

    //  var body = parts.fields
    //  Object.assign(target,);
     

      
      var result = await this.ctx.service.goodsbrand.insert(fromStream)
     
             if (result.flag) {
                 await this.success('/admin/goodsbrand',result.msg)
             }
             else
             {
                await this.fail('/admin/goodsbrand/add',result.msg)

             }
             
    }
    async edit()
    {
      const {ctx} = this;
        var _id = ctx.request.query._id;
        var brandResult = await ctx.service.goodsbrand.findById(_id);
          console.log(brandResult);
            var brands = brandResult.data
            await this.ctx.render('admin/goodsbrand/edit',{brands})
        // await this.ctx.render()
    }
    async doEdit()
    {
        const {ctx} = this;
        var fromStream = await ctx.getFileStream();
        var _id = fromStream.fields._id
        
      var result = await ctx.service.goodsbrand.update(fromStream);
      console.log(result);
      
      if(result)
      {
          await this.success('/admin/goodsbrand','修改成功')
      }
      else
      {
        await this.fail('/admin/goodsbrand/edit?_id='+_id,'访问异常')
      }
    }
    async delete()
    {
    //   const {ctx} = this;
        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.goodsbrand.deleteById(_id);
        // console.log(result);


        if(result)
        {
            await this.success(this.ctx.locals.lastPage,'删除成功')
        }
  
        else
        {
          await this.fail(this.ctx.locals.lastPage,'访问异常')
  
        }

        // await this.ctx.render()
    }
}
module.exports = GoodsBrandController;