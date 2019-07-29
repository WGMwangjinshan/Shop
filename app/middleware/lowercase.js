module.exports =()=>{
    return async(ctx,next)=>{
        ctx.request.query.name = ctx.request.query.name&&ctx.request.query.name.toLowerCase();
        console.log('query===='+ctx.request.query.name)
        await next()
    }
}