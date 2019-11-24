// 登录页面的邮箱验证
export function checkEmail(rule, value, callback) {
    let reg = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
    if (value === '') {
        callback(new Error('请输入邮箱'));
    } else if(!reg.test(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback();
    }
}
// 登录页面密码验证
export function checkPass (rule, value, callback) {
    let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,15}$/;
    if(value === '') {
        callback(new Error('请输入密码'))
    } else if(!reg.test(value)) {
        callback('密码不正确，请输入6至15位区分大小写包含特殊字符的密码')
    } else {
        callback()
    }
}
// 验证码验证
export function checkCode (rule, value, callback) {
    if (!value) {
        return callback(new Error('验证码不能为空'));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
            } else {
            if (value < 18) {
                callback(new Error('必须年满18岁'));
            } else {
                callback();
            }
        }
    }, 1000)
}
// 二次确认密码
export function checkPass2 (rule, value, callback) {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}