 module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const GoodsSchema = new Schema({
      category_id: {type: mongoose .ObjectId, requied:true}, //商品分类
      idbrand_id: {type :mongoose.ObjectId, required:true}, //商品品牌
      idtype_id: {type :mongoose.ObjectId, required:true}, //商品类型
      goods_sn: {type:String, required:true}, //商品编号
      goods_title:{type:String, required:true}, //商品名称
      good_brief:{type:String,default:''}, //商品简介
      goods_desc: {type: String, default:""}, //商品详情描述
      goods_img: {type:String, required:true}, //商品图片
      goods_keys: {type:String,default:''}, //商品关键词 seo 
      goods_weight : {type :Number , default:0}, //商品重量
      goods_unit: {type: String, default:''}, //商品单位
      price_market: {type :Number , required:true}, //市场价格
      price_selling: {type :Number , required:true}, //销售价格
      price_promote: {type :Number , default:0}, //促销价格
      stock_number: {type :Number , default:0}, //库存数量
      stock_warn: {type:Number,default:0},//预警数量
      is_sale: {type:Number,default:1}, //1上架0下架
      is_real: {type:Number ,default:1}, //1实物0虚拟
      is_hot: {type :Number ,default:0},//热销 1是0否
      is_best: {type:Number,default:0}, //精品1是0否
      is_new: {type:Number , default:0}, //新品1是0否
      is_promote: {type:Number , default:0},//促销1是0否
      click_number: {type :Number , default:0},//商品点击数量
      data_status :{type:Number , default:1},  //1正常0删除
      data_sort: {type :Number , default:100},//排序
      create_time: {type:Number , default:Date.now()},//创建时间})
      is_promote: {type:Number,default:0}, 
      relate_gallerys:{type: [String] , default:[]}, //关联相册  [相册图片地址]
      relate_goods: {type: [mongoose. ObjectId],default: []},//关联商品  [goods_id]
      relate__parts: {type: [mongoose .ObjectId] ,default: []},//关联配件  [goods_ id]
      relate_articles:{type: [mongoose.ObjectId] , default:[]}, //关联文章[acticle_ _id]
      click_number: {type :Number, default:0},//商品点击数量
      attr_colors:{type:[String],default:[]},//属性颜色
      attr_sizes:{type:[String],default:[]},//属性尺寸
      attr_other:{type:[String],default:[]},//其他属性
      attr_version:{type:[mongoose.Mixed],default:[]}//属性版本
    });
    return mongoose.model('Goods', GoodsSchema,'Goods')
  }
  