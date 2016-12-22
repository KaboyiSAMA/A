/**
 * Created by Kaboyi on 2016/12/22.
 */
var mongoose=require('mongoose')
var Schema=mongoose.Schema
var UserSchema=new Schema({
    email:String,
    password:String,
    token:String
})
module.exports=mongoose.model('User',UserSchema)