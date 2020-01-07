import cookie from "cookie_js";

export function userTK(){
    return cookie.get('userTK')
}

export function setTK(value) {
    cookie.set('userTK',value)
}

export function removeTk() {
    cookie.remove('userTk')
}

export function userName(value) {
    cookie.set('userinfo',value)
}

export function getName() {
    return cookie.get('userinfo')
}