var BaseController = require('./base')


class GoodsCategoryController extends BaseController{
    async list()
    {
      var result = await this.ctx.service.goodscategory.findAll();
      if (result.flag) {
          var categorys = result.data;
          await this.ctx.render('admin/goodscategory/list',{categorys})
      }
      else{
          this.ctx.body = result.msg
      }
    }
    async add()
    {
      var result=  await this.ctx.service.goodscategory.findAllTopCates();

      if (result.flag) {

        var topCategorys = result.data
        
        await this.ctx.render('/admin/goodscategory/add',{topCategorys});
      }
       
        
    }
    async doAdd()
    {
            var body = this.ctx.request.body;
            var cate_pid = body.cate_pid
            console.log(cate_pid)
            if (cate_pid!=0) {
              body.cate_pid = this.app.mongoose.Types.ObjectId(cate_pid)
            }
             var result =  await this.ctx.service.goodscategory.insert(body);
             if (result.flag) {
                 await this.success('/admin/goodscategory?_id='+cate_pid,result.msg)
             }
             else
             {
                await this.fail('/admin/goodscategory/add?_id='+cate_pid,result.msg)

             }
             
    }
    async edit()
    {
      const {ctx} = this;
      var cate_id = ctx.request.query._id;
      var cateResult = await ctx.service.goodscategory.findById(cate_id);
      var cateTopResult=  await this.ctx.service.goodscategory.findAllTopCates();
      if(cateResult.flag&&cateTopResult.flag)
      {
          var cate = cateResult.data
          var topcates = cateTopResult.data
          await this.ctx.render('admin/goodscategory/edit',{cate, topcates})
      }
      else
      {
        await this.fail('/admin/goodscategory','访问异常')
      }
    }
    async doEdit()
    {
        const {ctx} = this;
        var body  = ctx.request.body;
        var _id = body._id
        var cate_pid = body.cate_pid
        if (cate_pid!=0) {
          body.cate_pid = this.app.mongoose.Types.ObjectId(cate_pid)
        }
      var result =   await this.ctx.service.goodscategory.update(_id,body);
      if(result)
      {
          await this.success('/admin/goodscategory','修改成功')
      }
      else
      {
        await this.fail('/admin/goodscategory/edit?_id='+_id,'访问异常')

      }
    }
    async delete()
    {

        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.goodscategory.delete(_id);
        if(result)
        {
            await this.success(this.ctx.locals.lastPage,'删除成功？？？？？？？')
        }
        else
        {
          await this.fail(this.ctx.locals.lastPage,'访问异常')
        }

    }
}
module.exports = GoodsCategoryController;