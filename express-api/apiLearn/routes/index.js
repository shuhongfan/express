var express = require('express');
var router = express.Router();

var cate=require('../controllers/cateController')
var user=require('../controllers/UserController')

/* GET home page. */
router.get('/', cate.getCate);
router.get('/getPostCate', cate.getPostCate);

router.post('/user/sendCode', user.sendCode);
router.post('/user/sendCoreCode', user.sendCoreCode);
router.post('/user/sendTencentCode', user.sendTencentCode);
router.post('/user/codePhoneLogin', user.codePhoneLogin);
router.post('/user/login',user.login)
module.exports = router;
