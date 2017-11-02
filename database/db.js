/**
 * Created by Kaboyi on 2016/12/22.
 */
var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONOGODBPORT || 'mongodb://localhost:27017');
var Schema = mongoose.Schema;//创建模型
var UserSchema = new Schema({
	email: String,
	password: String,
	token: String
});//定义了一个新的模型,但是此模式还未和users集合有关联
var gameSchema = new Schema({
	_id: String,
	title: String,
	desc: String
});//定义了一个新的模型,但是此模式还未和games集合有关联
module.exports.user = db.model('users', UserSchema);//与users集合关联
module.exports.game = db.model('games', gameSchema);//与games集合关联
