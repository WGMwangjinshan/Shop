const BaseController = require("./base");
class GoodsController extends BaseController {
  //list页面
  async list() {
    var goodss = await this.ctx.model.Goods.find({});
    //console.log(JSON.stringify(goodss));
    
    await this.ctx.render("admin/goods/list", { goodss });
  }
  //小型测试
  async upload() {
    await this.ctx.render("admin/goods/upload");
  }

  //商品相册多文件上传
  // async doUpload(){
  //      //多文件上传
  //      var parts = await this.ctx.multipart({autoFields:true});//多文件查找流文件
  //       var result = await this.ctx.service.goods.upload(parts);
  //       if (result.flag) {
  //         await this.success("/admin/goods", result.msg);
  //       } else {
  //         await this.fail("/admin/goods",result.msg);
  //       }
  // }

  //增加，查找商品品牌，分类，类型的id将商品信息渲染到页面
  async add() {
    const { ctx } = this;
    var typeResult = await ctx.service.goodstype.findAll();
    var brandResult = await ctx.service.goodsbrand.findAll();
    var cateResult = await ctx.service.goodscategory.findAll();
    if (typeResult.flag && cateResult.flag && brandResult.flag) {
      var types = typeResult.data;
      var brands = brandResult.data;
      var cates = cateResult.data;
      await ctx.render("admin/goods/add", { types, cates, brands });
    } else {
      await this.fail("/admin/goods", "增加显示页面失败");
    }
  }
  // async doAdd(){
  //   var parts = await this.ctx.multipart({autoFields:true});//多文件查找流文件
  //   var result = await this.ctx.service.goods.add(parts);
  //   if (result.flag) {
  //     await this.success("/admin/goods", result.msg);
  //   } else {
  //     await this.fail("/admin/goods",result.msg);
  //   }
  // }
//商品增加处理
  async doAdd() {
   var fromStream = await this.ctx.getFileStream({ requireFile: false });
    var result = await this.ctx.service.goods.insert(fromStream)
    if(result.flag){
      await this.success('/admin/goods',result.msg)
    }else{
      await this.fail('/admin/goods/add',result.msg)
    }
  }
  //详细描述图片处理
  async doUpload() {
    var parts = await this.ctx.multipart({ autoFields: true }); //多文件查找流文件
    var result = await this.ctx.service.goods.upload(parts);
    if (result.flag) {
      var links = result.data;
      //插件规范必须使用link传值，使用多文件上传返回数组需要具体的对象
      this.ctx.body = { link: links[0] };
    } else {
      var msg = result.mag;
      this.ctx.body = { msg: msg };
    }
  }
  //页面处理获取type_id，
  async change() {
    var _id = this.ctx.request.query.type_id;
    var result = await this.ctx.service.goodstypeattr.findAllByTypeId(_id);
    if (result.flag) {
      var data = result.data;
      this.ctx.body = { data: data };
    } else {
      this.ctx.body = "12345678";
    }
  }
}
module.exports = GoodsController;
