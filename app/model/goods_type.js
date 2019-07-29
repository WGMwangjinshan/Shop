module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const GoodsTypeSchema = new Schema({
      type_name:{type:String,default:'',required:true},//类型名称
      attr_group:{type:[String]},//属性分组
      type_status:{type:Number,default:1}//类型状态 1启动 0关闭
      
    });
    return mongoose.model('GoodsType', GoodsTypeSchema,'goods_types')
  }
  