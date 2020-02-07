(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e342ded","chunk-2d208fb9"],{3547:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page-login"},[o("div",{staticClass:"page-login--layer page-login--layer-area"},[o("ul",{staticClass:"circles"},t._l(10,function(t){return o("li",{key:t})}),0)]),o("div",{staticClass:"page-login--layer page-login--layer-time",attrs:{flex:"main:center cross:center"}},[t._v("\n    "+t._s(t.time)+"\n  ")]),o("div",{staticClass:"page-login--layer"},[o("div",{staticClass:"page-login--content",attrs:{flex:"dir:top main:justify cross:stretch box:justify"}},[t._m(0),o("div",{staticClass:"page-login--content-main",attrs:{flex:"dir:top main:center cross:center"}},[o("img",{staticClass:"page-login--logo",attrs:{src:r("a6b0")}}),o("div",{staticClass:"page-login--form"},[o("el-card",{attrs:{shadow:"never"}},[o("el-form",{ref:"loginForm",attrs:{"label-position":"top",rules:t.rules,model:t.formLogin,size:"default"}},[o("el-form-item",{attrs:{prop:"username"}},[o("el-input",{attrs:{type:"text",placeholder:"用户名"},model:{value:t.formLogin.username,callback:function(e){t.$set(t.formLogin,"username",e)},expression:"formLogin.username"}},[o("i",{staticClass:"fa fa-user-circle-o",attrs:{slot:"prepend"},slot:"prepend"})])],1),o("el-form-item",{attrs:{prop:"password"}},[o("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:t.formLogin.password,callback:function(e){t.$set(t.formLogin,"password",e)},expression:"formLogin.password"}},[o("i",{staticClass:"fa fa-keyboard-o",attrs:{slot:"prepend"},slot:"prepend"})])],1),o("el-button",{staticClass:"button-login",attrs:{size:"default",type:"primary"},on:{click:t.submit}},[t._v("\n                登录\n              ")])],1)],1),o("p",{staticClass:"page-login--options",attrs:{flex:"main:justify cross:center"}},[o("span",{on:{click:function(e){t.FindPwdFormVisible=!0}}},[o("d2-icon",{attrs:{name:"question-circle"}}),t._v(" 忘记密码")],1),o("span",{on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("注册用户")])])],1)]),o("div",{staticClass:"page-login--content-footer"},[o("p",{staticClass:"page-login--content-footer-locales"},t._l(t.$languages,function(e){return o("a",{key:e.value,attrs:{command:e.value},on:{click:function(r){t.$i18n.locale=e.value}}},[t._v("\n            "+t._s(e.label)+"\n          ")])}),0),o("p",{staticClass:"page-login--content-footer-copyright"},[t._v("\n          Copyright\n          "),o("d2-icon",{attrs:{name:"copyright"}}),t._v("\n          2018 开心签\n          "),o("a",{attrs:{href:"https://github.com/FairyEver"}},[t._v("\n            @FairyEver\n          ")])],1),t._m(1)])])]),o("div",[o("el-dialog",{attrs:{title:"欢迎注册开心签!",visible:t.dialogFormVisible,width:"450px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[o("el-form",{ref:"regForm",attrs:{model:t.registerForm,rules:t.rsrules}},[o("el-form-item",{attrs:{label:"用户名","label-width":t.formLabelWidth,prop:"account"}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"20","show-word-limit":""},model:{value:t.registerForm.account,callback:function(e){t.$set(t.registerForm,"account",e)},expression:"registerForm.account"}})],1),o("el-form-item",{attrs:{label:"密码","label-width":t.formLabelWidth,prop:"password"}},[o("el-input",{attrs:{autocomplete:"off","show-password":"",maxlength:"20"},model:{value:t.registerForm.password,callback:function(e){t.$set(t.registerForm,"password",e)},expression:"registerForm.password"}})],1),o("el-form-item",{attrs:{label:"手机号码","label-width":t.formLabelWidth,prop:"phone"}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"11","show-word-limit":""},model:{value:t.registerForm.phone,callback:function(e){t.$set(t.registerForm,"phone",e)},expression:"registerForm.phone"}})],1),o("el-form-item",{attrs:{label:"验证码","label-width":t.formLabelWidth,prop:"captchCode"}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"4","show-word-limit":""},model:{value:t.registerForm.captchCode,callback:function(e){t.$set(t.registerForm,"captchCode",e)},expression:"registerForm.captchCode"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-position",loading:t.registerForm.captchCodeStatu},on:{click:function(e){return t.getCaptchRegister()}},slot:"append"},[t._v(t._s(t.registerForm.captchCodeTime))])],1)],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.registerUser()}}},[t._v("确 定")])],1)],1)],1),o("div",[o("el-dialog",{attrs:{title:"找回密码",visible:t.FindPwdFormVisible,width:"450px"},on:{"update:visible":function(e){t.FindPwdFormVisible=e}}},[o("el-form",{ref:"findForm",attrs:{model:t.findPwdForm,rules:t.rsrules}},[o("el-form-item",{attrs:{label:"用户名","label-width":t.formLabelWidth,prop:"account"}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"20","show-word-limit":""},model:{value:t.findPwdForm.account,callback:function(e){t.$set(t.findPwdForm,"account",e)},expression:"findPwdForm.account"}})],1),o("el-form-item",{attrs:{label:"验证码","label-width":t.formLabelWidth,prop:"captchCode"}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"4","show-word-limit":""},model:{value:t.findPwdForm.captchCode,callback:function(e){t.$set(t.findPwdForm,"captchCode",e)},expression:"findPwdForm.captchCode"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-position",loading:t.findPwdForm.captchCodeStatu},on:{click:function(e){return t.getCaptchFindPwd()}},slot:"append"},[t._v(t._s(t.findPwdForm.captchCodeTime))])],1)],1),o("el-form-item",{attrs:{label:"新密码","label-width":t.formLabelWidth,prop:"password"}},[o("el-input",{attrs:{autocomplete:"off","show-password":"",maxlength:"20"},model:{value:t.findPwdForm.password,callback:function(e){t.$set(t.findPwdForm,"password",e)},expression:"findPwdForm.password"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.FindPwdFormVisible=!1}}},[t._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.findPassword()}}},[t._v("确 定")])],1)],1)],1)])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-login--content-header"},[r("p",{staticClass:"page-login--content-header-motto"},[t._v("\n          时间是一切财富中最宝贵的财富\n        ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",{staticClass:"page-login--content-footer-options"},[r("a",{attrs:{href:"#"}},[t._v("帮助")]),r("a",{attrs:{href:"#"}},[t._v("隐私")]),r("a",{attrs:{href:"#"}},[t._v("条款")])])}],i=(r("8e6e"),r("ac6a"),r("456d"),r("a481"),r("bd86")),a=r("5a0c"),s=r.n(a),c=r("2f62"),u=r("93cd");function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,o)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(r,!0).forEach(function(e){Object(i["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var p={created:function(){this.$log.capsule("欢迎访问~如需技术支持，请联系qq:397294213","开心签","success")},data:function(){return{timeInterval:null,time:s()().format("HH:mm:ss"),dialogFormVisible:!1,FindPwdFormVisible:!1,registerForm:{account:"",password:"",phone:"",captchCode:"",captchCodeStatu:!1,captchCodeTime:"发送验证码"},findPwdForm:{account:"",password:"",captchCode:"",captchCodeStatu:!1,captchCodeTime:"发送验证码"},rsrules:{account:[{required:!0,message:"请输入要注册的邮箱",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{min:11,max:11,message:"手机号码长度为11位",trigger:"blur"}],captchCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:4,max:4,message:"验证码长度必须为4位",trigger:"blur"}]},formLabelWidth:"120px",formLogin:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],code:[{required:!0,message:"请输入验证码",trigger:"blur"}]}}},mounted:function(){var t=this;this.timeInterval=setInterval(function(){t.refreshTime()},1e3)},beforeDestroy:function(){clearInterval(this.timeInterval)},methods:l({},Object(c["b"])("d2admin/account",["login"]),{refreshTime:function(){this.time=s()().format("HH:mm:ss")},handleUserBtnClick:function(t){this.formLogin.username=t.username,this.formLogin.password=t.password,this.submit()},submit:function(){var t=this;this.$refs.loginForm.validate(function(e){e?t.login({username:t.formLogin.username,password:t.formLogin.password}).then(function(){t.$router.replace(t.$route.query.redirect||"/")}):t.$message.error("表单校验失败，请检查")})},getCaptchRegister:function(){var t=this;11==this.registerForm.phone.length?(this.registerForm.captchCodeStatu=!0,this.registerForm.captchCodeTime="请稍等",Object(u["f"])(this.registerForm.phone).then(function(e){t.registerForm.captchCodeStatu=!1,t.registerForm.captchCodeTime="验证码发送成功"}).catch(function(){t.registerForm.captchCodeStatu=!1,t.registerForm.captchCodeTime="验证码发送失败"})):this.$notify({title:"提示",message:"手机号码有误",type:"warning"})},getCaptchFindPwd:function(){var t=this;this.findPwdForm.account.length<1?this.$notify({title:"提示",message:"手机号码有误",type:"warning"}):(this.findPwdForm.captchCodeStatu=!0,this.findPwdForm.captchCodeTime="请稍等",Object(u["e"])(this.findPwdForm.account).then(function(e){t.findPwdForm.captchCodeStatu=!1,t.findPwdForm.captchCodeTime="验证码发送成功"}).catch(function(){t.findPwdForm.captchCodeStatu=!1,t.findPwdForm.captchCodeTime="验证码发送失败"}))},findPassword:function(){var t=this;this.$refs.findForm.validate(function(e){e?Object(u["G"])(t.findPwdForm.account,t.findPwdForm.password,t.findPwdForm.captchCode).then(function(e){t.FindPwdFormVisible=!1,t.findPwdForm.account="",t.findPwdForm.password="",t.findPwdForm.captchCode="",t.$notify({title:"提示",message:"密码重置成功",type:"success"})}).catch(function(){t.$notify({title:"提示",message:"密码重置成功",type:"warning"})}):t.$message.error("表单校验失败，请检查")})},registerUser:function(){var t=this;this.$refs.regForm.validate(function(e){e?Object(u["p"])(t.registerForm.account,t.registerForm.password,t.registerForm.phone,t.registerForm.captchCode).then(function(e){t.dialogFormVisible=!1,t.registerForm.account="",t.registerForm.password="",t.registerForm.phone="",t.registerForm.captchCode="",t.$notify({title:"提示",message:"注册成功",type:"success"})}).catch(function(){t.$notify({title:"提示",message:"注册失败",type:"warning"})}):t.$message.error("表单校验失败，请检查")})}})},m=p,f=(r("60d0"),r("2877")),g=function(t){t.options.__source="src/views/system/login/page.vue"},h=g,b=Object(f["a"])(m,o,n,!1,null,null,null);"function"===typeof h&&h(b);e["default"]=b.exports},"60d0":function(t,e,r){"use strict";var o=r("7e2a"),n=r.n(o);n.a},"7e2a":function(t,e,r){},"93cd":function(t,e,r){"use strict";r.d(e,"f",function(){return n}),r.d(e,"p",function(){return i}),r.d(e,"e",function(){return a}),r.d(e,"G",function(){return s}),r.d(e,"d",function(){return c}),r.d(e,"c",function(){return u}),r.d(e,"j",function(){return d}),r.d(e,"A",function(){return l}),r.d(e,"y",function(){return p}),r.d(e,"D",function(){return m}),r.d(e,"B",function(){return f}),r.d(e,"u",function(){return g}),r.d(e,"z",function(){return h}),r.d(e,"C",function(){return b}),r.d(e,"v",function(){return w}),r.d(e,"w",function(){return F}),r.d(e,"x",function(){return v}),r.d(e,"t",function(){return C}),r.d(e,"m",function(){return y}),r.d(e,"k",function(){return O}),r.d(e,"h",function(){return j}),r.d(e,"a",function(){return P}),r.d(e,"b",function(){return _}),r.d(e,"o",function(){return k}),r.d(e,"g",function(){return x}),r.d(e,"q",function(){return $}),r.d(e,"l",function(){return L}),r.d(e,"s",function(){return I}),r.d(e,"r",function(){return T});var o=r("9bd2");function n(t){return Object(o["a"])({url:"/captchCodeForRegister",method:"get",params:{phone:t}})}function i(t,e,r,n){return Object(o["a"])({url:"/registerUser",method:"post",data:{account:t,password:e,phone:r,captchCode:n}})}function a(t){return Object(o["a"])({url:"/captchCodeForFindPwd",method:"get",params:{account:t}})}function s(t,e,r){return Object(o["a"])({url:"/findPassword",method:"post",data:{account:t,password:e,captchCode:r}})}function c(t,e,r,n,i,a){return Object(o["a"])({url:"/getAppInfoListUser",method:"get",params:{beginTime:t,endTime:e,size:r,num:n,appName:i,type:a}})}function u(t,e,r,n,i){return Object(o["a"])({url:"/getAndroidAppInfoListUser",method:"get",params:{beginTime:t,endTime:e,size:r,num:n,appName:i}})}function d(t,e){return Object(o["a"])({url:"/getRelatedAppInfoListUser",method:"get",params:{size:t,num:e}})}function l(t,e){return Object(o["a"])({url:"/updateReleatedApp",method:"post",data:{id:t,appid:e}})}function p(t,e,r){return Object(o["a"])({url:"/updateAppIntroduceInfo",method:"post",data:{id:t,introduce:e,introduce_image:r}})}function m(t,e,r){return Object(o["a"])({url:"/updateIOSAppIntroduceInfo",method:"post",data:{id:t,introduce:e,introduce_image:r}})}function f(t,e){return Object(o["a"])({url:"/setAppStatu",method:"post",data:{id:t,statu:e}})}function g(t,e){return Object(o["a"])({url:"/setApkStatu",method:"post",data:{id:t,statu:e}})}function h(t,e){return Object(o["a"])({url:"/setAppMaxUDID",method:"post",data:{id:t,udid:e}})}function b(t,e){return Object(o["a"])({url:"/setAppTip",method:"post",data:{id:t,tip:e}})}function w(t,e){return Object(o["a"])({url:"/setApkTip",method:"post",data:{id:t,tip:e}})}function F(t,e,r,n){return Object(o["a"])({url:"/saveAppInfo_sr",method:"post",data:{id:t,tip:e,actionType:r,tmpId:n}})}function v(t,e,r,n){return Object(o["a"])({url:"/saveAppInfo_bs",method:"post",data:{id:t,tip:e,actionType:r,tmpId:n}})}function C(t,e,r,n){return Object(o["a"])({url:"/saveApkInfo",method:"post",data:{id:t,tip:e,actionType:r,tmpId:n}})}function y(){return Object(o["a"])({url:"/getUserInfo",method:"get"})}function O(){return Object(o["a"])({url:"/getSysConfig",method:"get"})}function j(t,e,r){return Object(o["a"])({url:"/getDownLoadRecord",method:"get",params:{appId:t,size:e,num:r}})}function P(t){return Object(o["a"])({url:"/buyCoin",method:"post",data:{num:t}})}function _(t){return Object(o["a"])({url:"/buyDcount",method:"post",data:{num:t}})}function k(){return Object(o["a"])({url:"/getUserUDIDList",method:"get"})}function x(t,e,r,n){return Object(o["a"])({url:"/getConsumeRecord",method:"get",params:{beginTime:t,endTime:e,size:r,num:n}})}function $(t,e){return Object(o["a"])({url:"/renewApp",method:"post",data:{num:t,appid:e}})}function L(){return Object(o["a"])({url:"/getUserBaseInfo",method:"get"})}function I(t,e){return Object(o["a"])({url:"/setAppShortLink",method:"post",data:{id:t,link:e}})}function T(t,e){return Object(o["a"])({url:"/setApkShortLink",method:"post",data:{id:t,link:e}})}},a6b0:function(t,e,r){t.exports=r.p+"img/logo@2x.c52351b9.png"}}]);
//# sourceMappingURL=chunk-5e342ded.1772ff88.js.map