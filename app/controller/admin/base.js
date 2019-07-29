const {Controller} =require('egg');
class BaseController extends Controller{
        async success(redirectUrl,msg)
        {
            var msg = msg || '操作成功'
            // var redirectUrl = msg || '操作成功'；

            await this.ctx.render('/common/success',{redirectUrl,msg})
        }
        async fail(redirectUrl,msg)
        {
            var msg = msg || '操作失败'
            // var redirectUrl = msg || '操作失败'；

            await this.ctx.render('/common/fail',{redirectUrl,msg})
        }
}
module.exports = BaseController;