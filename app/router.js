router = app => {
  // const { router, controller } = app;
  require('./router/admin')(app)
  require('./router/index')(app)
  require('./router/api')(app)

}
module.exports = router;


