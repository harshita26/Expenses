const mongoose = require('mongoose')

var PostMessage = mongoose.model('PostMessage',
{
    title : {type:String},
    amount : {type:Number},
    note : {type:String},
    date : {type:Date},
},'postMessages')

module.exports = { PostMessage}