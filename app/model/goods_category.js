module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const GoodsCategorySchema = new Schema({
      cate_name:{type:String,default:''}, //商品类型id
      cate_icon:{type:String,default:''}, //属性分组
      cate_keys:{type:String,default:''}, //属性名称
      cate_desc:{type:String,default:''}, //1 手工录入 2 选择录入  
      cate_url:{type:String,default:''}, //1 唯一属性 2 单选属性 3 复选属性   
      cate_template:{type:String,default:''}, //属性可选值；回车符间隔，一行为一个可选值
      cate_pid:{type:Schema.Types.Mixed}, //数据排序
      cate_status:{type:Number,default:1},
      data_sort:{type:Number,default:50},
      data_status:{type:Number,default:1},
  })
    return mongoose.model('GoodsCategory', GoodsCategorySchema,'goods_categorys')
  }
  