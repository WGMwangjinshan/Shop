const {Service} = require('egg');
const svgCaptche = require('svg-captcha');
const md5 = require('md5')
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const dateFormat = require('dateformat')
var mkdirp = require('mkdirp');

class ToolService extends Service{
    async captcha(width,height,fontSize){

        let w = width ?width:100;
        let h = height? height:35;
        let f = fontSize ? fontSize:50;
        var captcha  = svgCaptche.create({
            size:4,
            width:w,
            height:h,
            fontSize:f
        })
        return captcha;
    }

    async md5(content){
        return md5(content+"123")
    }
    async md5Secret(content,secret){
        return md5(content+secret)
    }
    async randomNumber()
    {
        Math.floor(Math.random()*9000 +1000);
    }





    //上传文件重命名￥￥目标路径￥￥数据库路径
    async filePath(file_name)
    {
        //创建一个文件夹
     let uploadBaseDir = this.config.uploadbasedir;   
     let dateDir  = dateFormat(new Date(),'yyyymmdd');  
     let baseDir = path.join(uploadBaseDir , dateDir);  
     mkdirp(baseDir);
     //创建上传文件统一名称  不能重复

     const filename = Date.now() + '' + Math.floor((Math.random() * 9000)+1000) + path.extname(file_name);
     const targetPath = path.join(baseDir, filename);
     var dbpath = targetPath.slice(3).replace(/\\/g,'/');
    return{targetPath:targetPath,dbpath:dbpath}
    }


            //上传文件
    async upLoadFile(targetPath,fromStream)
    {
                const writeStream = fs.createWriteStream(targetPath);

                try 
                {
                    await awaitWriteStream(fromStream.pipe(writeStream));         
                } 
                catch (error) {
                    await sendToWormhole(fromStream);  
                    console.log(error);
                    throw error;
                }
                finally
                {
                    await sendToWormhole(fromStream);  
                }
    }

}
module.exports = ToolService;