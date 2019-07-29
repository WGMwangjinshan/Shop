module.exports =app=>{
  const { router, controller } = app;

    // router.get('/admin/user/:id', controller.admin.user.info)
    //登陆
  router.get('/admin/login', controller.admin.login.index)
  router.post('/admin/doLogin', controller.admin.login.doLogin)
  router.get('/admin/verify', controller.admin.login.verifyCode)
  router.get('/admin/logout', controller.admin.login.logout)
  router.get('/admin', controller.admin.home.index)


    //用户
  router.get('/admin/staff/add',controller.admin.staff.add)
  router.post('/admin/staff/doAdd',controller.admin.staff.doAdd)
  router.get('/admin/staff',controller.admin.staff.index)
  router.get('/admin/welcome',controller.admin.staff.welcome)
  router.get('/admin/staff/edit',controller.admin.staff.edit)
  router.post('/admin/staff/doEdit',controller.admin.staff.doEdit)
  router.get('/admin/staff/delete',controller.admin.staff.delete) 
  router.get('/admin/staff/upload',controller.admin.staff.upload)
  router.post('/admin/staff/doUpload',controller.admin.staff.doUpload)
  


    //角色
  router.get('/admin/role/add',controller.admin.role.add)
  router.post('/admin/role/doAdd',controller.admin.role.doAdd)
  router.get('/admin/role/edit',controller.admin.role.edit)
  router.post('/admin/role/doEdit',controller.admin.role.doEdit)
  router.get('/admin/role/delete',controller.admin.role.delete)
  router.get('/admin/role',controller.admin.role.list)
  router.get('/admin/role/auth',controller.admin.role.auth)
  router.post('/admin/role/doAuth',controller.admin.role.doAuth)

 


    //权限
  router.get('/admin/access/add',controller.admin.access.add)
  router.post('/admin/access/doAdd',controller.admin.access.doAdd)
  router.get('/admin/access',controller.admin.access.list)
  router.get('/admin/access/edit',controller.admin.access.edit)
  router.post('/admin/access/doEdit',controller.admin.access.doEdit)
  router.get('/admin/access/delete',controller.admin.access.delete)


    //会员等级
  router.get('/admin/userrank',controller.admin.userrank.list)
  router.get('/admin/userrank/add',controller.admin.userrank.add)
  router.post('/admin/userrank/doAdd',controller.admin.userrank.doAdd)
  router.get('/admin/userrank/edit',controller.admin.userrank.edit)
  router.post('/admin/userrank/doEdit',controller.admin.userrank.doEdit)
  router.get('/admin/userrank/delete',controller.admin.userrank.delete)

    //会员管理
  router.get('/admin/user',controller.admin.user.list)
  router.get('/admin/user/edit',controller.admin.user.edit)
  router.post('/admin/user/doEdit',controller.admin.user.doEdit)
  router.get('/admin/user/delete',controller.admin.user.delete)


  //商品
  router.get('/admin/goodstype',controller.admin.goodstype.list)
  router.get('/admin/goodstype/add',controller.admin.goodstype.add)
  router.post('/admin/goodstype/doAdd',controller.admin.goodstype.doAdd)
  router.get('/admin/goodstype/edit',controller.admin.goodstype.edit)
  router.post('/admin/goodstype/doEdit',controller.admin.goodstype.doEdit)
  router.get('/admin/goodstype/delete',controller.admin.goodstype.delete)

  //商品分类
  router.get('/admin/goodscategory',controller.admin.goodscategory.list)
  router.get('/admin/goodscategory/add',controller.admin.goodscategory.add)
  router.post('/admin/goodscategory/doAdd',controller.admin.goodscategory.doAdd)
  router.get('/admin/goodscategory/edit',controller.admin.goodscategory.edit)
  router.post('/admin/goodscategory/doEdit',controller.admin.goodscategory.doEdit)
  router.get('/admin/goodscategory/delete',controller.admin.goodscategory.delete)



  // router.get('/admin/goodscategory',controller.admin.good.list)
  // router.get('/admin/goods',controller.admin.good.list)
  // router.get('/admin/goodsbrand',controller.admin.good.list)
  // router.get('/admin/goodsreview',controller.admin.good.list) 


  //商品类型属性

  router.get('/admin/goodstypeattr',controller.admin.goodstypeattr.list)
  router.get('/admin/goodstypeattr/add',controller.admin.goodstypeattr.add)
  router.post('/admin/goodstypeattr/doAdd',controller.admin.goodstypeattr.doAdd)
  router.get('/admin/goodstypeattr/edit',controller.admin.goodstypeattr.edit)
  router.post('/admin/goodstypeattr/doEdit',controller.admin.goodstypeattr.doEdit)
  router.get('/admin/goodstypeattr/delete',controller.admin.goodstypeattr.delete)



  router.get('/admin/goodsbrand',controller.admin.goodsbrand.list)
  router.get('/admin/goodsbrand/add',controller.admin.goodsbrand.add)
  router.post('/admin/goodsbrand/doAdd',controller.admin.goodsbrand.doAdd)
  router.get('/admin/goodsbrand/edit',controller.admin.goodsbrand.edit)
  router.post('/admin/goodsbrand/doEdit',controller.admin.goodsbrand.doEdit)
  router.get('/admin/goodsbrand/delete',controller.admin.goodsbrand.delete)


    //相册管理测试
  router.get('/admin/gallery/upload',controller.admin.gallery.upload)
  router.post('/admin/gallery/doUpload',controller.admin.gallery.doUpload)

  //商品管理
  
  router.get('/admin/goods',controller.admin.goods.list)
  router.get('/admin/goods/upload',controller.admin.goods.upload)
  router.post('/admin/goods/doUpload',controller.admin.goods.doUpload)
  router.get('/admin/goods/add',controller.admin.goods.add)
  router.post('/admin/goods/doAdd',controller.admin.goods.doAdd)
  router.get("/admin/goods/getTypeAttrs",controller.admin.goods.change)














}