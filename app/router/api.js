module.exports = app =>{
    
    app.router.get('/api/goods',app.middlewares.lowercase(),app.controller.api.goods.goodsList)
}