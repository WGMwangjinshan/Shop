var BaseController = require('./base')


class GoodsTypeController extends BaseController{
    async list()
    {
            var result = await this.ctx.service.goodstype.findAll();
            if (result.flag) {
                var goodstypes = result.data;
                // console.log("klalalalalal")
                await this.ctx.render('admin/goodstype/list',{goodstypes})
            }
            else{
                this.ctx.body = result.msg
            }
    }
    async add()
    {
        await this.ctx.render('/admin/goodstype/add')
        
    }
    async doAdd()
    {
            var body = this.ctx.request.body;
             var attrString =body.attr_group;
            //  console.log(attr_group);
             var attr_group = attrString.split('\r\n')
             var goodstype = 
             {
                 type_name:body.type_name,
                 attr_group:attr_group,
             }
             var result =  await this.ctx.service.goodstype.insert(goodstype);
             if (result.flag) {
                 await this.success('/admin/goodstype',result.msg)
             }
             else
             {
                await this.fail('/admin/goodstype/add',result.msg)

             }
             
    }
    async edit()
    {
      const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.goodstype.findById(_id);
        // console.log(result);


        if(result.flag)
        {
            var goodstype = result.data
            await this.ctx.render('admin/goodstype/edit',{goodstype})
        }
  
        else
        {
          await this.fail('/admin/goodstype','访问异常')
  
        }

        // await this.ctx.render()
    }
    async doEdit()
    {
        const {ctx} = this;
        var body  = ctx.request.body;
        console.log(body)
        var _id = body._id
        var status = body.type_status;
        var attrGroupString = body.attr_group;
        var attr_group = attrGroupString.trim().split('\r\n')
        if(status == '1')
        {
          body.type_status = 1
        }
        else{
          body.type_status = 0;
        }
        var goodstype =
        {
            type_name : body.type_name,
            attr_group : attr_group,
            type_status : body.type_status
        }
        

      var result =   await this.ctx.service.goodstype.update(_id,goodstype);

      if(result)
      {
          await this.success('/admin/goodstype','修改成功')
      }

      else
      {
        await this.fail('/admin/goodstype/edit','访问异常')

      }
    }
    async delete()
    {
    //   const {ctx} = this;
        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.goodstype.deleteById(_id);
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
module.exports = GoodsTypeController;