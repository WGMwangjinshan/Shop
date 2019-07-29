module.exports = app=>{
  app.router.get('/', app.controller.index.home.index)

}