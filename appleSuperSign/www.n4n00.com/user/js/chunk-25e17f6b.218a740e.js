(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25e17f6b","chunk-ea85ce2c","chunk-e7bd8a9e"],{"0c07":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("d2-container",{staticClass:"page"},[n("d2-page-cover",[n("d2-icon-svg",{staticClass:"logo",attrs:{name:"d2-admin"}}),n("template",{slot:"footer"},[n("el-row",{staticClass:"info_all",attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-card",{staticStyle:{"background-color":"#409EFF",color:"white"},attrs:{shadow:"always"}},[t._v("\n            本日下载量\n            "),n("p",[t._v(t._s(t.downloadSize))])])],1),n("el-col",{attrs:{span:6}},[n("el-card",{staticStyle:{"background-color":"#67C23A",color:"white"},attrs:{shadow:"always"}},[t._v("\n            总设备数\n            "),n("p",[t._v(t._s(t.udidSize))])])],1),n("el-col",{attrs:{span:6}},[n("el-card",{staticStyle:{"background-color":"#E6A23C",color:"white"},attrs:{shadow:"always"}},[t._v("\n            应用总数\n            "),n("p",[t._v(t._s(t.appCount))])])],1),n("el-col",{attrs:{span:6}},[n("el-card",{staticStyle:{"background-color":"#F56C6C",color:"white"},attrs:{shadow:"always"}},[t._v("\n            剩余可用设备\n            "),n("p",[t._v(t._s(t.udidInuseSize))])])],1)],1)],1)],2)],1)},o=[],u=n("ffc2"),a=u["a"],c=(n("84f3"),n("2877")),i=function(t){t.options.__source="src/views/system/index/page.vue"},d=i,s=Object(c["a"])(a,r,o,!1,null,"54791bbb",null);"function"===typeof d&&d(s);e["default"]=s.exports},"2d4b":function(t,e,n){},"617a":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d2-page-cover"},[n("div",{staticClass:"d2-page-cover__logo"},[t._t("default")],2),n("p",{staticClass:"d2-page-cover__title"},[t._v("NN内测平台 1.1.2")]),n("p",{staticClass:"d2-page-cover__sub-title"},[t._v("优雅的超级签名集成方案")]),n("p",{staticClass:"d2-page-cover__build-time"},[t._v("FINAL BUILD TIME "+t._s(t.$buildTime))]),t._t("footer")],2)},o=[],u=(n("e66f"),n("2877")),a=function(t){t.options.__source="src/views/system/index/components/d2-page-cover/index.vue"},c=a,i={},d=Object(u["a"])(i,r,o,!1,null,"b42767de",null);"function"===typeof c&&c(d);e["default"]=d.exports},"6a73":function(t,e,n){},"6fc0":function(t,e,n){"use strict";n.r(e);var r=n("0c07");e["default"]=r["default"]},"84f3":function(t,e,n){"use strict";var r=n("2d4b"),o=n.n(r);o.a},"93cd":function(t,e,n){"use strict";n.d(e,"f",function(){return o}),n.d(e,"p",function(){return u}),n.d(e,"e",function(){return a}),n.d(e,"G",function(){return c}),n.d(e,"d",function(){return i}),n.d(e,"c",function(){return d}),n.d(e,"j",function(){return s}),n.d(e,"A",function(){return p}),n.d(e,"y",function(){return f}),n.d(e,"D",function(){return l}),n.d(e,"B",function(){return m}),n.d(e,"u",function(){return b}),n.d(e,"z",function(){return h}),n.d(e,"C",function(){return g}),n.d(e,"v",function(){return v}),n.d(e,"w",function(){return _}),n.d(e,"x",function(){return j}),n.d(e,"t",function(){return O}),n.d(e,"m",function(){return w}),n.d(e,"k",function(){return I}),n.d(e,"h",function(){return C}),n.d(e,"a",function(){return S}),n.d(e,"b",function(){return A}),n.d(e,"o",function(){return y}),n.d(e,"g",function(){return z}),n.d(e,"q",function(){return k}),n.d(e,"l",function(){return T}),n.d(e,"s",function(){return U}),n.d(e,"r",function(){return D});var r=n("9bd2");function o(t){return Object(r["a"])({url:"/captchCodeForRegister",method:"get",params:{phone:t}})}function u(t,e){return Object(r["a"])({url:"/registerUser",method:"post",data:{account:t,password:e}})}function a(t){return Object(r["a"])({url:"/captchCodeForFindPwd",method:"get",params:{account:t}})}function c(t,e,n){return Object(r["a"])({url:"/findPassword",method:"post",data:{account:t,password:e,captchCode:n}})}function i(t,e,n,o,u,a){return Object(r["a"])({url:"/getAppInfoListUser",method:"get",params:{beginTime:t,endTime:e,size:n,num:o,appName:u,type:a}})}function d(t,e,n,o,u){return Object(r["a"])({url:"/getAndroidAppInfoListUser",method:"get",params:{beginTime:t,endTime:e,size:n,num:o,appName:u}})}function s(t,e){return Object(r["a"])({url:"/getRelatedAppInfoListUser",method:"get",params:{size:t,num:e}})}function p(t,e){return Object(r["a"])({url:"/updateReleatedApp",method:"post",data:{id:t,appid:e}})}function f(t,e,n){return Object(r["a"])({url:"/updateAppIntroduceInfo",method:"post",data:{id:t,introduce:e,introduce_image:n}})}function l(t,e,n){return Object(r["a"])({url:"/updateIOSAppIntroduceInfo",method:"post",data:{id:t,introduce:e,introduce_image:n}})}function m(t,e){return Object(r["a"])({url:"/setAppStatu",method:"post",data:{id:t,statu:e}})}function b(t,e){return Object(r["a"])({url:"/setApkStatu",method:"post",data:{id:t,statu:e}})}function h(t,e){return Object(r["a"])({url:"/setAppMaxUDID",method:"post",data:{id:t,udid:e}})}function g(t,e){return Object(r["a"])({url:"/setAppTip",method:"post",data:{id:t,tip:e}})}function v(t,e){return Object(r["a"])({url:"/setApkTip",method:"post",data:{id:t,tip:e}})}function _(t,e,n,o){return Object(r["a"])({url:"/saveAppInfo_sr",method:"post",data:{id:t,tip:e,actionType:n,tmpId:o}})}function j(t,e,n,o){return Object(r["a"])({url:"/saveAppInfo_bs",method:"post",data:{id:t,tip:e,actionType:n,tmpId:o}})}function O(t,e,n,o){return Object(r["a"])({url:"/saveApkInfo",method:"post",data:{id:t,tip:e,actionType:n,tmpId:o}})}function w(){return Object(r["a"])({url:"/getUserInfo",method:"get"})}function I(){return Object(r["a"])({url:"/getSysConfig",method:"get"})}function C(t,e,n,o){return Object(r["a"])({url:"/getDownLoadRecord",method:"get",params:{appId:t,size:e,num:n,channel:o}})}function S(t){return Object(r["a"])({url:"/buyCoin",method:"post",data:{num:t}})}function A(t){return Object(r["a"])({url:"/buyDcount",method:"post",data:{num:t}})}function y(){return Object(r["a"])({url:"/getUserUDIDList",method:"get"})}function z(t,e,n,o){return Object(r["a"])({url:"/getConsumeRecord",method:"get",params:{beginTime:t,endTime:e,size:n,num:o}})}function k(t,e){return Object(r["a"])({url:"/renewApp",method:"post",data:{num:t,appid:e}})}function T(){return Object(r["a"])({url:"/getUserBaseInfo",method:"get"})}function U(t,e){return Object(r["a"])({url:"/setAppShortLink",method:"post",data:{id:t,link:e}})}function D(t,e){return Object(r["a"])({url:"/setApkShortLink",method:"post",data:{id:t,link:e}})}},e66f:function(t,e,n){"use strict";var r=n("6a73"),o=n.n(r);o.a},ffc2:function(t,e,n){"use strict";(function(t){var r=n("617a"),o=n("93cd");e["a"]={components:{D2PageCover:r["default"]},created:function(){this.getUserBaseInfo()},methods:{getUserBaseInfo:function(){var t=this;Object(o["l"])().then(function(e){console.log(e),t.downloadSize=e.downloadSize,t.udidSize=e.maxUdidSize,t.appCount=e.appSize,t.udidInuseSize=e.udidInuseSize})}},data:function(){return{filename:t,sysInfo:{},downloadSize:0,udidSize:0,appCount:0,udidInuseSize:0,tableData:[]}}}}).call(this,"/index.js")}}]);
//# sourceMappingURL=chunk-25e17f6b.218a740e.js.map