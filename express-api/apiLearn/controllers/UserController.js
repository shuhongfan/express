var dbconfig=require('../util/dbconfig')

// 阿里
// const Core = require('@alicloud/pop-core')
// const aliconfig=require('../util/aliconfig')
// var client = new Core(aliconfig.alicloud)
// var requestOption = {
//     method: 'POST'
// }
// 腾讯
const tencentcloud =require('tencentcloud-sdk-nodejs')
const tencentconfig=require('../util/tencentconfig')
const SmsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential(tencentconfig.tenCloud.SecretId, tencentconfig.tenCloud.SecretKey);
let httpProfile = new HttpProfile();
httpProfile.endpoint = "sms.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new SmsClient(cred, "ap-beijing", clientProfile);
let req = new models.SendSmsRequest();

// 随机生成数字
function rand(min,max){
    return Math.floor(Math.random()*(max-min))+min
}
// 发送的手机号和验证码数组
validatePhoneCode=[]
// 判读是否发送过验证码
let sendCodeP=(phone)=>{
    return validatePhoneCode.some(item=>{
        return phone===item.phone
    })
}
// 判断手机号和验证码是否一致
let findCodeAndPhone=(phone,code)=>{
    var status=validatePhoneCode.some(item=>{
        // console.log(+item.phone==phone && +item.code==code)
        return +item.phone==phone && +item.code==code
    })
    // console.log(status)
    // console.log(validatePhoneCode)
    return status?'login':'error'
}
// 检测验证码登录是否为第一次登录
let phoneLoginBind=async (phone)=>{
    let sql='select * from users where username=? or phone=?'
    let sqlArr=[phone,phone]
    let res=await dbconfig.SySqlConnect(sql,sqlArr)
    console.log(res)
    if (res.length){
        res[0].userinfo=await getUserInfo(res[0].id)
        return res
    } else {
        // 用户第一次注册 绑定表
        let res=await regUser(phone)
        // 获取用户详情
        res[0].userinfo=await getUserInfo(res[0].id)
        return  res
    }
}
// 用户注册方法
let regUser=async (phone)=>{
    let userpic='https://himg.bdimg.com/sys/portraitn/item/1db9736866736875686f6e6766616e992a'
    let sql=`insert into users(username,userpic,phone,create_time) value(?,?,?,?)`
    let sqlArr=[phone,userpic,phone,(new Date()).valueOf()]
    let res=await dbconfig.SySqlConnect(sql,sqlArr)
    // console.log(res)
    if (res.affectedRows===1){
        // 执行成功获取用户信息
        // 获取用户信息的方法
        let user=await getUser(phone)
        // 创建用户副表
        let userinfo=await createUserInfo(user[0].id)
        if (userinfo.affectedRows===1){
            return user
        } else {
            return false
        }
    } else {
        return false
    }
}
// 获取用户信息
let getUser=(username)=>{
    let sql=`select * from users where id=? or phone=? or username=?`
    let sqlArr=[username,username,username]
    return dbconfig.SySqlConnect(sql,sqlArr)
}
// 创建用户副表
let createUserInfo=(user_id)=>{
    let sql=`insert into usersinfo(user_id,age,sex,job) value(?,?,?,?)`
    let sqlArr=[user_id,18,1,'工程师']
    return dbconfig.SySqlConnect(sql,sqlArr)
}
// 获取注册的用户详情
let getUserInfo=(user_id)=>{
    let sql=`select age,sex,job,birthday from usersinfo where user_id=?`
    let sqlArr=[user_id]
    return dbconfig.SySqlConnect(sql,sqlArr)
}
// 查看用户详情
let findUserInfo=async (user_id)=>{
    let sql=`select * from usersinfo where user_id=?`
    let sqlArr=[user_id]
    let res=await dbconfig.SySqlConnect(sql,sqlArr)
    if (res.length){
        return true
    }
    return false
}
// 修改用户详情方法
let setUserInfo=async (user_id,age,sex,job,birthday)=>{
    if (findUserInfo(user_id)){
        let sql=`update usersinfo set age=?,sex=?,job=?,birthday=? where user_id=?`
        let sqlArr=[age,sex,job,birthday,user_id]
        let res=await dbconfig.SySqlConnect(sql,sqlArr)
        if (res.affectedRows==1){
            let user=await getUser(user_id)
            let userinfo=await getUserInfo(user_id)
            user[0].userinfo=userinfo[0]
            return user
        } else{
            return false
        }
    } else {
        let sql=`insert into usersinfo (user_id,age,sex,job,birthday) values(?,?,?,?,?)`
        let sqlArr=[user_id,age,sex,job,birthday]
        let res=await dbconfig.SySqlConnect(sql,sqlArr)
        if (res.affectedRows==1){
            let user=await getUser(user_id)
            let userinfo=await getUserInfo(user_id)
            user[0].userinfo=userinfo[0]
            return user
        } else{
            return false
        }
    }
}

// 阿里验证码
sendCoreCode=(req,res)=>{
    let phone=req.query.phone
    let code=rand(1000,9999)
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": phone,
        "SignName": "ABC商城",
        "TemplateCode": "SMS_197626079",
        "TemplateParam": JSON.stringify({"code": code})
    }
    client.request('SendSms', params, requestOption).then((result) => {
        console.log(result);
        if (result.Code=='ok'){
            res.send({
                'code':200,
                'msg':'发送成功'
            })
            validatePhoneCode.push({
                'phone':phone,
                'code':code
            })
            console.log(validatePhoneCode)
        } else {
            res.send({
                'code':400,
                'msg':'发送失败'
            })
        }
    })
}
// 腾讯验证码
sendTencentCode=(req,res)=>{
    let phone=req.query.phone
    if (sendCodeP(phone)){
        return res.send({
            'code':400,
            'msg':'已经发送过验证码，请60s后重试'
        })
    }
    let code=rand(1000,9999)
    var params = {
        SmsSdkAppid:'1400402532',
        Sign:'舒洪凡SHF',
        PhoneNumberSet:['+86'+phone],
        TemplateID:'671003',
        TemplateParamSet:[code]
    }
    client.SendSms(params, function (err, response) {
        // 请求异常返回，打印异常信息
        if (err) {
            console.log(err);
            return res.send({
                'code':400,
                'msg':'发送失败'
            })
        }
        // 请求正常返回，打印 response 对象
        validatePhoneCode.push({
            'phone':phone,
            'code':code
        })
        console.log(validatePhoneCode)
        res.send({
            'code':200,
            'msg':'发送成功'
        })
        console.log(response.to_json_string());
    })
}

// 模拟验证码发送接口
sendCode=(req,res)=>{
    let phone=req.query.phone
    // console.log(sendCodeP(phone))
    if (sendCodeP(phone)){
        return res.send({
            'code':400,
            'msg':'已经发送过验证码，请60s后重试'
        })
    }
    let code=rand(1000,9999)
    validatePhoneCode.push({
        'phone':phone,
        'code':code
    })
    console.log(validatePhoneCode)
    res.send({
        'code':200,
        'msg':'发送成功'
    })
    console.log(code)
}
// 验证码登录
codePhoneLogin=async (req,res)=>{
    // console.log(123333,req.query)
    let {phone,code}=req.query
    // console.log(phone,code)
    // 判断手机号是否发送过验证码
    // console.log(1325,sendCodeP(phone))
    if (sendCodeP(phone)){
        // 验证码和手机号是否匹配
        let status=findCodeAndPhone(phone,code)
        // console.log(status)
        if (status==='login'){
            // 登录成功
            let user=await phoneLoginBind(phone)
            res.send({
                'code':200,
                'msg':'验证码正确，登录成功',
                'data':user[0]
            })
        } else if (status==='error'){
            res.send({
                'code':200,
                'msg':'，验证码错误，登录失败'
            })
        }
    }else {
        res.send({
            'code':500,
            'msg':'未发送验证码，请发送验证码后重试'
        })
    }
}
// 用户名邮箱手机登录
login=(req,res)=>{
    let username=req.query.username
    let password=req.query.password
    let phoneReg=/^1[3456789]\d{9}$/
    let emailReg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (phoneReg.test(username)){
        let sql='select * from users where phone=? and password=? or username=? and password=?'
        let sqlArr=[username,password,username,password]
        let callBack=async (err,data)=>{
            console.log(data)
            if (err){
                console.log(err)
                res.send({
                    'code':400,
                    'msg':'登录出错'
                })
            }else if (data==''){
                res.send({
                    'code':400,
                    'msg':'用户名或者密码出错'
                })
            } else {
                let user_id=data[0].id
                let result=await getUserInfo(user_id)
                data[0].userinfo=result[0]
                res.send({
                    'code':200,
                    'msg':'登录成功',
                    'data':data[0]
                })
            }
        }
        dbconfig.sqlConnect(sql,sqlArr,callBack)
    } else if (emailReg.test(username)){
        let sql=`select * from users where email=? and password=?`
        let sqlArr=[username,password]
        let callBack=async (err,data)=> {
            if (err) {
                res.send({
                    'code': 400,
                    'msg': '登录出错'
                })
            } else if (data == '') {
                res.send({
                    'code': 400,
                    'msg': 'email或者密码出错'
                })
            } else {
                let user_id = data[0].id
                let result = await getUserInfo(user_id)
                data[0].userinfo = result[0]
                res.send({
                    'code': 200,
                    'msg': '登录成功',
                    'data': data[0]
                })
            }
        }
        dbconfig.sqlConnect(sql,sqlArr,callBack)
    }else {
        let sql=`select * from users where username=? and password=?`
        let sqlArr=[username,password]
        let callBack=async (err,data)=> {
            if (err) {
                console.log(err)
                res.send({
                    'code': 400,
                    'msg': '登录出错'
                })
            } else if (data == '') {
                res.send({
                    'code': 400,
                    'msg': 'email或者密码出错'
                })
            } else {
                let user_id = data[0].id
                let result = await getUserInfo(user_id)
                data[0].userinfo = result[0]
                res.send({
                    'code': 200,
                    'msg': '登录成功',
                    'data': data[0]
                })
            }
        }
        dbconfig.sqlConnect(sql,sqlArr,callBack)
    }
}


module.exports={
    sendCode,
    codePhoneLogin,
    sendCoreCode,
    sendTencentCode,
    login
}
