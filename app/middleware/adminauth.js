module.exports= options=>{

    return async (ctx,next)=>{
        var userinfo = ctx.session.userinfo;
        var pathname = ctx.request.path;
        ctx.locals.lastPage = ctx.request.header.Referer
        ctx.locals.csrf = ctx.csrf;
        ctx.locals.userinfo = userinfo;
        if(userinfo!=null){
          var authResult = await   ctx.service.staff.checkAuth(userinfo.role_id,pathname)
          if (authResult.flag) {
              var result = await ctx.service.access.findAllwithChecked(userinfo.role_id)
                if (result.flag) {
                    ctx.locals.authList = result.data;
                    // console.log(ctx.locals.authList);
                    
                    await next()
                }
                else{
                    ctx.redirect('/admin/login')
                }
          }
          else{
              ctx.body = authResult.msg;
          }
        
        }else{
            if(pathname=='/admin/login' || pathname=='/admin/doLogin' || pathname=='/admin/verify'){
                await next(); 
            }else{
                ctx.redirect('/admin/login')
            }
        }
    }
}