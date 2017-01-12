var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../model/User')
mongoose.connect(process.env.MONOGODBPORT || 'localhost:27017')
var jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '伏魔录O'});
});
router.post('/authenticate', function (req, res) {
    User.findOne(
        {email: req.body.email, password: req.body.password},
        function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: err||'登录失败'
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
})
router.post('/signup', function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password},
        function (err, user) {
            console.log('UP', user)
            if (err) {
                res.json({
                    type: false,
                    data: err||'注册失败'
                })
            } else {
                var user$ = new User()
                user$.email = req.body.email
                user$.password = req.body.password
                user$.save(function (err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET || 'ZZZCCCVVV')
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
})
router.get('/me', ensureAuthorized, function (req, res) {
    User.findOne({token: req.token}, function (err, user) {
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
})
function ensureAuthorized(req, res, next) {
    var bearerToken
    var bearerHeader = req.header['authoriation']
    if(typeof bearerToken !== 'undefined') {
        var bearer = bearerHeader.split(' ')
        bearerToken = bearer[1]
        req.token=bearerToken
        next()
    } else {
        res.send(403)
    }
}
process.on('uncaughtException', function (err) {
    console.log(err)
})
module.exports = router;
