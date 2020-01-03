// 登录页面的邮箱验证
export function validEmail(str) {
  let reg = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
  if (!reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
// 登录页面密码验证
export function validPass(str) {
  let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,15}$/;
  if (!reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
