var BaseController = require('./base')

//相册批量上传测试！！！！！
//相册批量上传测试！！！！！
//相册批量上传测试！！！！！
//相册批量上传测试！！！！！
//相册批量上传测试！！！！！
//相册批量上传测试！！！！！


class GalleryController extends BaseController{
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
    async upload()
    {
        await this.ctx.render('/admin/goods/uploadajax')
        
    }
    async doUpload()
    { 
       //获取文件流
     const parts  = await this.ctx.multipart({autoFields:true})
    //  var parts = await this.ctx.multipart({autoFields:t

      
      var result = await this.ctx.service.goods.upload(parts)
     
             if (result.flag) {
                 await this.success('/admin/goodsbrand',result.msg)
             }
             else
             {
                await this.fail('/admin/goodsbrand/add',result.msg)

             }
             
    }
}
module.exports = GalleryController;