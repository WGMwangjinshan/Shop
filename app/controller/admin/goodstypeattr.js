var BaseController = require('./base')


class GoodsTypeAttrController extends BaseController{
    async list()
    {
             var type_id = this.ctx.request.query._id;
             var typeResult = await this.ctx.service.goodstype.findById(type_id)
            var allAttrResult = await this.ctx.service.goodstypeattr.findAllByTypeId(type_id);
            if (allAttrResult.flag&&typeResult.flag) {
                var allattrs = allAttrResult.data;
                var goodstype = typeResult.data
                await this.ctx.render('admin/goodstypeattr/list',{goodstype,allattrs})
            }
            else{
                this.ctx.body = result.msg
            }
    }
    async add()
    {
      const {ctx} = this;
      var type_id = ctx.request.query._id;
      var goodstypeResult = await ctx.service.goodstype.findById(type_id);
      var goodstypesResult = await ctx.service.goodstype.findAll();
      if ( goodstypeResult.flag && goodstypesResult.flag ) {
        var fromgoodstype  = goodstypeResult.data;
        var goodstypes = goodstypesResult.data

       await this.ctx.render('/admin/goodstypeattr/add',{fromgoodstype,goodstypes});
        
      }
      else
      {
        await this.fail('/admin/goodstypeattr','数据异常，显示增加失败')
      }
        
    }
    async doAdd()
    {
            var body = this.ctx.request.body;
            var type_id = body.type_id
 
             console.log(body);
             var attrValueAttr = body.attr_value.trim().split('\r\n')
            body.attr_value = attrValueAttr
             var result =  await this.ctx.service.goodstypeattr.insert(body);
             if (result.flag) {
                 await this.success('/admin/goodstypeattr?_id='+type_id,result.msg)
             }
             else
             {
                await this.fail('/admin/goodstypeattr/add?_id='+type_id,result.msg)

             }
             
    }
    async edit()
    {
      const {ctx} = this;
        var attr_id = ctx.request.query._id;
        // await
        var attrResult = await ctx.service.goodstypeattr.findAttrWithType(attr_id)
        var goodstypeResult = await ctx.service.goodstype.findAll()
        if (attrResult.flag&&goodstypeResult.flag) {
          var attr = attrResult.data;
          var alltypes = goodstypeResult.data;
          console.log('attr++++++++++'+JSON.stringify(attr) );
          console.log('alltypes++++++++++'+alltypes);

          
          await ctx.render('/admin/goodstypeattr/edit',{attr,alltypes})
        }
        else
        {
            await this.fail('/admin/goodstypeattr?_id='+attr_id,'数据异常，显示修改页面失败')
        }
    }
    async doEdit()
    {
        const {ctx} = this;
        var body  = ctx.request.body;
        console.log(body)
        var _id = body._id
        var attrValuetring = body.attr_value;
        var attr_value = attrValuetring.trim().split('\r\n')
        body.attr_value = attr_value



      var result =   await this.ctx.service.goodstypeattr.update(_id,body);

      if(result)
      {
          await this.success('/admin/goodstypeattr?_id='+body.type_id,'修改成功')
      }

      else
      {
        await this.fail('/admin/goodstypeattr/edit?_id='+_id,'访问异常')

      }
    }
    async delete()
    {
    //   const {ctx} = this;
        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.goodstypeattr.deleteById(_id);
        // console.log(result);


        if(result)
        {
            await this.success(this.ctx.locals.lastPage,'删除成功？？？？？？？')
        }
  
        else
        {
          await this.fail(this.ctx.locals.lastPage,'访问异常')
  
        }

        // await this.ctx.render()
    }
}
module.exports = GoodsTypeAttrController;