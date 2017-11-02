var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var oracledb = require('oracledb')
var db = require('../database/db');
var user = db.user;
var game = db.game;
// mongoose.connect(process.env.MONOGODBPORT || 'localhost:27017')
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: '伏魔录O'});
});
router.post('/authenticate', function (req, res) {
	user.findOne(
		{email: req.body.email, password: req.body.password},
		function (err, user) {
			if (err) {
				res.json({
					type: false,
					data: err || '登录失败'
				})
			} else if (user) {
				res.json({
					type: true,
					data: user,
					token: user.token
				})
			} else {
				res.json({
					type: false,
					data: '密码错误'
				})
			}
		})
});
router.post('/signup', function (req, res) {
	user.findOne({email: req.body.email, password: req.body.password},
		function (err, user) {
			console.log('UP', user);
			if (err) {
				res.json({
					type: false,
					data: err || '注册失败'
				})
			} else {
				var user$ = new user();
				user$.email = req.body.email;
				user$.password = req.body.password;
				user$.save(function (err, user) {
					user.token = jwt.sign(user, process.env.JWT_SECRET || 'ZZZCCCVVV');
					user.save(function (err, user1) {
						res.json({
							type: true,
							data: user1,
							token: user1.token
						})
					})
				})
			}
		})
});
router.get('/me', ensureAuthorized, function (req, res) {
	user.findOne({token: req.token}, function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: err
			})
		} else {
			res.json({
				type: true,
				data: user
			})
		}
	})
});
router.get('/updateGame', ensureAuthorized, function (req, res) {
	console.log('uG');
	game.save({
		_id: req._id,
		title: req.title,
		desc: req.desc
	}, function (err, game) {
		if (err) {
			res.json({
				type: false,
				data: err
			})
		} else {
			res.json({
				type: true,
				data: game
			})
		}
	})
});

function ensureAuthorized(req, res, next) {
	var bearerToken;
	//TODO 需要解决这个问题了
	var bearerHeader = req.header['authoriation'];
	if (typeof bearerToken !== 'undefined') {
		var bearer = bearerHeader.split(' ');
		bearerToken = bearer[1];
		req.token = bearerToken;
		next()
	} else {
		res.send(403)
	}
}

process.on('uncaughtException', function (err) {
	console.log(err)
});
module.exports = router;
