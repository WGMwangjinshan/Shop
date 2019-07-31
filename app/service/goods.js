const { Service } = require("egg");
const fs = require("fs");
class GoodsService extends Service {
  async upload(parts) {
    try {
      var fromStream;
      var links = [];
      while ((fromStream = await parts()) != null) {
        if (fromStream.filename) {
          var filePath = await this.service.tool.filePath(fromStream.filename); //找到tergetPath目标路径与dbPath相对路径
          //filePath：{ targetPath: 'app/public/admin/upload/20190726/1564110932558.jpg',   dbPath: '/public/admin/upload/20190726/1564110932558.jpg' }
          await this.ctx.service.tool.uploadFile(
            fromStream,
            filePath.targetPath
          ); //上传来源流
          links.push(filePath.dbPath);
        } else {
          continue;
        }
      }
      return { flag: true, data: links, msg: "商品保存成功" };
    } catch (error) {
      return { flag: false, msg: "商品保存失败" };
    }
  }
  async insert(fromStream) {
    try {
      var body = fromStream.fields;


      //字符串处理
      body.relate_goods = body.relate_goods.trim().split(',')
      body.relate_gifts = body.relate_gifts.trim().split(',')
      body.relate_parts = body.relate_parts.trim().split(',')
      body.relate_articles = body.relate_articles.trim().split(',')


      if (fromStream && fromStream.filename) {
        var filePath = await this.service.tool.filePath(fromStream.filename); //找到tergetPath目标路径与dbPath相对路径
        var dbPath = filePath.dbPath;
        var targetPath = filePath.targetPath;
        body.goods_img = dbPath;
        await this.ctx.service.tool.uploadFile(fromStream, targetPath); //上传来源流
      }
      var goodsModel = new this.ctx.model.Goods(body);
      var result = await goodsModel.save();
      console.log(JSON.stringify('xxxxxx'+result));
      //处理商品属性值
      var goods_id = result._id
      var attr_values  = body.attr_value_list
      var attrNewValues = []
      attr_values.forEach(element => {
          element = element.trim().split('\r\n')
          attrNewValues.push(element)
      });
      var attrArray = body.attr_id_list
      for (let i = 0; i < attrArray.length; i++) {
        //拆分字段
        var attr_id = attrArray[i];
        var attr_value = attrNewValues[i]
        var typeAttr =await this.ctx.model.GoodsTypeAttr.findById(attr_id)
        var attr_name =typeAttr.attr_name
        var type_id = typeAttr.type_id
        var attr_group = typeAttr.attr_group
        var attr_type = typeAttr.attr_type
        //拼接存储
        var goodsAttrModel = new this.ctx.model.GoodsAttr({
          goods_id:goods_id,
          type_id:type_id,
          attr_id:attr_id,
          attr_name:attr_name,
          attr_value:attr_value,
          attr_group:attr_group,
          attr_type:attr_type,
        })
        await goodsAttrModel.save()
      }
      //数据库存储完毕后才能取出id
      return { flag: true, msg: "商品保存成功" };
    } catch (error) {
      console.log(error);
      
      return { flag: false, msg: "商品保存失败" };
    }
  }
}

module.exports = GoodsService;
