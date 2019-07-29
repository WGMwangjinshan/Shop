module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const GoodsTypeAttrSchema = new Schema({
      type_id:{type:mongoose.ObjectId,required:true}, //商品类型id
      attr_group:{type:String,default:''}, //属性分组
      attr_name:{type:String,default:''}, //属性名称
      attr_input:{type:Number,default:1}, //1 手工录入 2 选择录入  
      attr_type:{type:Number,default:1}, //1 唯一属性 2 单选属性 3 复选属性   
      attr_value:{type:[String],default:[]}, //属性可选值；回车符间隔，一行为一个可选值
      data_sort:{type:Number,default:100}, //数据排序
  })
    return mongoose.model('GoodsTypeAttr', GoodsTypeAttrSchema,'goods_type_attrs')
  }
  