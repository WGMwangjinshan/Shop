const { Service } = require("egg");
const fs = require("fs");
class GoodsService extends Service {
  //详细描述的照片处理
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
  //商品页面显示
  async insert(fromStream) {
    try {
      var body = fromStream.fields;
      if (fromStream && fromStream.filename) {
        var filePath = await this.service.tool.filePath(fromStream.filename); //找到tergetPath目标路径与dbPath相对路径
        var dbPath = filePath.dbPath;
        var targetPath = filePath.targetPath;
        body.goods_img = dbPath;
        await this.ctx.service.tool.uploadFile(fromStream, targetPath);//上传来源流
        await this.ctx.service.tool.jimp(filePath.targetPath); 
      }
      //字符串处理
      body.relate_goods = body.relate_goods.trim().split(",");
      body.relate_gifts = body.relate_gifts.trim().split(",");
      body.relate_parts = body.relate_parts.trim().split(",");
      body.relate_articles = body.relate_articles.trim().split(",");
      var goodsModel = new this.ctx.model.Goods(body);
      var result = await goodsModel.save();
      //处理商品属性值
      var goods_id = result._id;
      var attr_values = body.attr_value_list;
      var attrNewValues = [];
      attr_values.forEach(element => {
        element = element.trim().split("\r\n");
        attrNewValues.push(element);
      });
      var attrArray = body.attr_id_list;
      for (let i = 0; i < attrArray.length; i++) {
        //拆分字段
        var attr_id = attrArray[i];
        var attr_value = attrNewValues[i];
        var typeAttr = await this.ctx.model.GoodsTypeAttr.findById(attr_id);
        var attr_name = typeAttr.attr_name;
        var type_id = typeAttr.type_id;
        var attr_group = typeAttr.attr_group;
        var attr_type = typeAttr.attr_type;
        //拼接存储

        await this.ctx.service.goodsattr.insert({
          goods_id: goods_id,
          type_id: type_id,
          attr_id: attr_id,
          attr_name: attr_name,
          attr_value: attr_value,
          attr_group: attr_group,
          attr_type: attr_type
        });
        // var goodsAttrModel = new this.ctx.model.GoodsAttr({
        //   goods_id: goods_id,
        //   type_id: type_id,
        //   attr_id: attr_id,
        //   attr_name: attr_name,
        //   attr_value: attr_value,
        //   attr_group: attr_group,
        //   attr_type: attr_type
        // });
        // await goodsAttrModel.save();
      }
      //数据库存储完毕后才能取出id
      return { flag: true, msg: "商品保存成功" };
    } catch (error) {
      return { flag: false, msg: "商品保存失败" };
    }
  }
  //分页查找
  async findAllwithPage(page, pageSize) {
    const { ctx } = this;
    try {
      var totleNum = await ctx.model.Goods.count({ data_status: 1 });
      var totalPage = Math.ceil(totleNum / pageSize);
      //？？
      var goodss = await ctx.model.Goods.find({ data_status: 1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return {
        falg: true,
        data: { goodss: goodss, totalPage: totalPage, page: page },
        msg: "获取商品成功 "
      };
    } catch (error) {
      return { flag: false, msg: "数据异常，获取所有商品失败" };
    }
  }
  //findById查找
  async findById(_id) {
    try {
      var goodsFindById = await this.ctx.model.Goods.findById({
        _id: _id
      });
      return {
        flag: true,
        data: goodsFindById,
        msg: "通过商品ID查询商品成功"
      };
    } catch (error) {
      return { flag: false, msg: "通过商品ID查询商品失败" };
    }
  }

  //删除数据库相册
  async deleteImg(goods_id, img_url) {
    try {
      var result = await this.ctx.model.Goods.updateOne(
        { _id: goods_id },
        {
          $pull: {
            relate_gallerys: img_url
          }
        }
      );
      var path1 = "app" + img_url;
      var path2 = this.ctx.helper.url200(path1);
      if (fs.existsSync(path1)) {
        fs.unlinkSync(path1);
      }
      if (fs.existsSync(path2)) {
        fs.unlinkSync(path2);
      }
      if (result.ok == 1) {
        return { flag: true, msg: "删除相册成功" };
      } else {
        return { flag: false, msg: "没有可以删除的相册，删除相册失败" };
      }
    } catch (error) {
      return { flag: false, msg: "数据异常，删除相册失败" };
    }
  }
  //修改更新
  async update(fromStream) {
    try {
      const { ctx } = this;
      var body = fromStream.fields;
      console.log('xxxxxxxx'+JSON.stringify(body));
      
      var _id = body._id;
      if (fromStream && fromStream.filename) {
        console.log('1234');
        
        var filePath = await this.ctx.service.tool.filePath(
          fromStream.filename
        ); //找到tergetPath目标路径与dbPath相对路径
        var dbPath = filePath.dbPath;
        var targetPath = filePath.targetPath;
        await this.ctx.service.tool.uploadFile(fromStream, targetPath); //上传来源流
  //删除
        var path1 = "app" + body.history_img;
        var path2 = this.ctx.helper.url200(path1);
        if (fs.existsSync(path1)) {
          console.log('asdfgh');
          
          fs.unlinkSync(path1);
        }
        if (fs.existsSync(path2)) {
          fs.unlinkSync(path2);
        }
        body.goods_img = dbPath;
      }
      //字符串处理
      body.relate_goods = body.relate_goods.trim().split(",");
      body.relate_gifts = body.relate_gifts.trim().split(",");
      body.relate_parts = body.relate_parts.trim().split(",");
      body.relate_articles = body.relate_articles.trim().split(",");
     // console.log('xxxxxxxxxxxxxx'+_id);
      
     // console.log('================='+JSON.stringify(body));
      
      await ctx.model.Goods.updateOne({_id:_id},body)
      console.log('123456789');
      return { flag: true, msg: "商品保存123456789成功" };
    } catch (error) {
      return { flag: false, msg: "商品保存失败" };
    }
  }
}

module.exports = GoodsService;
