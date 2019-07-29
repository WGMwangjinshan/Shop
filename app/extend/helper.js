var dateFormat = require('dateformat')
module.exports = {
    dateFormat(timestamp){
        return dateFormat(new Date(timestamp),"yyyy-mm-dd HH:MM:ss")
    }
}