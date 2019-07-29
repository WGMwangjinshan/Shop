const { Controller } = require('egg')



class GoodsController extends Controller {
    //显示主页面
    async goodsList() {
    
      let goodsList =[


        {
            name:'apple',
            price:1
        }
      ]
          this.ctx.body =goodsList;
    }
}
module.exports = GoodsController;