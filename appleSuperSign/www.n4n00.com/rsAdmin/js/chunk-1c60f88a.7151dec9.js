(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c60f88a","chunk-15adc5b6","chunk-6928ce78"],{"0c07":function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("d2-container",{staticClass:"page"},[e("d2-page-cover",[e("d2-icon-svg",{staticClass:"logo",attrs:{name:"d2-admin"}}),e("template",{slot:"footer"},[e("el-row",{staticClass:"info_all",attrs:{gutter:20}},[e("el-col",{attrs:{span:6}},[e("el-card",{staticStyle:{"background-color":"#409EFF",color:"white"},attrs:{shadow:"always"}},[t._v("\n            本日下载量\n            "),e("p",[t._v(t._s(t.downloadSize))])])],1),e("el-col",{attrs:{span:6}},[e("el-card",{staticStyle:{"background-color":"#67C23A",color:"white"},attrs:{shadow:"always"}},[t._v("\n            剩余UDID数\n            "),e("p",[t._v(t._s(t.udidSize))])])],1),e("el-col",{attrs:{span:6}},[e("el-card",{staticStyle:{"background-color":"#E6A23C",color:"white"},attrs:{shadow:"always"}},[t._v("\n            应用总数\n            "),e("p",[t._v(t._s(t.appCount))])])],1),e("el-col",{attrs:{span:6}},[e("el-card",{staticStyle:{"background-color":"#F56C6C",color:"white"},attrs:{shadow:"always"}},[t._v("\n            无可用udid应用数\n            "),e("p",[t._v(t._s(t.expiredApp))])])],1)],1),e("el-table",{staticStyle:{width:"80%"},attrs:{data:t.tableData,border:""}},[e("el-table-column",{attrs:{prop:"id",label:"#",width:"180"}}),e("el-table-column",{attrs:{prop:"name",label:"名称",width:"180"}}),e("el-table-column",{attrs:{prop:"arg",label:"参数"}})],1)],1)],2)],1)},u=[],r=e("ffc2"),a=r["a"],c=(e("1f4f"),e("2877")),i=function(t){t.options.__source="src/views/system/index/page.vue"},d=i,s=Object(c["a"])(a,o,u,!1,null,"0115a1a2",null);"function"===typeof d&&d(s);n["default"]=s.exports},"1f4f":function(t,n,e){"use strict";var o=e("45c8"),u=e.n(o);u.a},"45c8":function(t,n,e){},"617a":function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"d2-page-cover"},[e("div",{staticClass:"d2-page-cover__logo"},[t._t("default")],2),e("p",{staticClass:"d2-page-cover__title"},[t._v("开心签 1.1.2")]),e("p",{staticClass:"d2-page-cover__sub-title"},[t._v("优雅的超级签名集成方案")]),e("p",{staticClass:"d2-page-cover__build-time"},[t._v("FINAL BUILD TIME "+t._s(t.$buildTime))]),t._t("footer")],2)},u=[],r=(e("b1c5"),e("2877")),a=function(t){t.options.__source="src/views/system/index/components/d2-page-cover/index.vue"},c=a,i={},d=Object(r["a"])(i,o,u,!1,null,"99850f7e",null);"function"===typeof c&&c(d);n["default"]=d.exports},"6fc0":function(t,n,e){"use strict";e.r(n);var o=e("0c07");n["default"]=o["default"]},"93cd":function(t,n,e){"use strict";e.d(n,"n",function(){return u}),e.d(n,"l",function(){return r}),e.d(n,"f",function(){return a}),e.d(n,"k",function(){return c}),e.d(n,"p",function(){return i}),e.d(n,"r",function(){return d}),e.d(n,"D",function(){return s}),e.d(n,"C",function(){return l}),e.d(n,"B",function(){return f}),e.d(n,"m",function(){return p}),e.d(n,"g",function(){return m}),e.d(n,"s",function(){return g}),e.d(n,"j",function(){return b}),e.d(n,"x",function(){return h}),e.d(n,"q",function(){return _}),e.d(n,"A",function(){return j}),e.d(n,"h",function(){return v}),e.d(n,"u",function(){return O}),e.d(n,"t",function(){return w}),e.d(n,"i",function(){return A}),e.d(n,"v",function(){return I}),e.d(n,"w",function(){return C}),e.d(n,"b",function(){return S}),e.d(n,"y",function(){return y}),e.d(n,"z",function(){return z}),e.d(n,"o",function(){return T}),e.d(n,"a",function(){return D}),e.d(n,"e",function(){return k}),e.d(n,"d",function(){return x}),e.d(n,"c",function(){return U});var o=e("9bd2");function u(){return Object(o["a"])({url:"/getSurplusUDID",method:"get"})}function r(){return Object(o["a"])({url:"/getExpiredAppCount",method:"get"})}function a(){return Object(o["a"])({url:"/getAppCount",method:"get"})}function c(){return Object(o["a"])({url:"/getDownloadSizeToday",method:"get"})}function i(){return Object(o["a"])({url:"/getSysInfo",method:"get"})}function d(t,n,e,u,r){return Object(o["a"])({url:"/getUserInfoList",method:"get",params:{account:t,beginTime:n,endTime:e,size:u,num:r}})}function s(t,n){return Object(o["a"])({url:"/changeAccountStatu",method:"post",data:{id:t,statu:n}})}function l(t,n){return Object(o["a"])({url:"/changeUserMaxUdid",method:"post",data:{id:t,udid:n}})}function f(t,n){return Object(o["a"])({url:"/changeUserAmount",method:"post",data:{id:t,amount:n}})}function p(t,n,e,u,r){return Object(o["a"])({url:"/getRechargeInfo",method:"get",params:{account:t,beginTime:n,endTime:e,size:u,num:r}})}function m(t,n,e,u,r,a){return Object(o["a"])({url:"/getAppInfoListAdmin",method:"get",params:{account:t,beginTime:n,endTime:e,size:u,num:r,appName:a}})}function g(t,n){return Object(o["a"])({url:"/setAppStatuAdmin",method:"post",data:{id:t,statu:n}})}function b(t,n,e,u,r,a){return Object(o["a"])({url:"/getBusAppInfoListAdmin",method:"get",params:{account:t,beginTime:n,endTime:e,size:u,num:r,appName:a}})}function h(t,n){return Object(o["a"])({url:"/setBusAppExpiredTime",method:"post",data:{id:t,time:n}})}function _(t,n,e,u,r,a){return Object(o["a"])({url:"/getUDIDInfoListAdmin",method:"get",params:{udid:t,beginTime:n,endTime:e,size:u,num:r,appleId:a}})}function j(t,n){return Object(o["a"])({url:"/changeUDIDStatuAdmin",method:"post",data:{id:t,statu:n}})}function v(t,n,e,u,r){return Object(o["a"])({url:"/getAppIdInfoList",method:"get",params:{account:t,beginTime:n,endTime:e,size:u,num:r}})}function O(t,n){return Object(o["a"])({url:"/setAppIdStatu",method:"post",data:{id:t,statu:n}})}function w(t){return Object(o["a"])({url:"/setAppIdErrorStatu",method:"post",data:{id:t}})}function A(t,n,e,u,r){return Object(o["a"])({url:"/getBusAccountInfoList",method:"get",params:{account:t,beginTime:n,endTime:e,size:u,num:r}})}function I(t,n){return Object(o["a"])({url:"/changeBusAccountStatu",method:"post",data:{id:t,statu:n}})}function C(t,n){return Object(o["a"])({url:"/changeBusAccountTip",method:"post",data:{id:t,tip:n}})}function S(t,n,e,u){return Object(o["a"])({url:"/addBusAccount",method:"post",data:{p12Path:t,mpPath:n,tip:e,password:u}})}function y(t,n,e,u){return Object(o["a"])({url:"/updateSysCoinConfig",method:"post",data:{coin_name:t,coin_to_udid:n,coin_to_resign:e,coin_to_update:u}})}function z(t,n,e){return Object(o["a"])({url:"/updateSysUsConfig",method:"post",data:{kf_qq_info:t,kf_weixin_info:n,kf_phone_info:e}})}function T(){return Object(o["a"])({url:"/getSysConfig",method:"get"})}function D(t,n,e,u){return Object(o["a"])({url:"/registerAppId",method:"post",data:{account:t,pwd:n,tip:e,code:u}})}function k(t){return Object(o["a"])({url:"/delUserInfo",method:"post",data:{id:t}})}function x(t){return Object(o["a"])({url:"/delAppInfo",method:"post",data:{id:t}})}function U(t){return Object(o["a"])({url:"/delAppIdInfo",method:"post",data:{id:t}})}},b1c5:function(t,n,e){"use strict";var o=e("deef"),u=e.n(o);u.a},deef:function(t,n,e){},ffc2:function(t,n,e){"use strict";(function(t){var o=e("617a"),u=e("93cd");n["a"]={components:{D2PageCover:o["default"]},created:function(){var t=this;Object(u["k"])().then(function(n){console.log(n),t.downloadSize=n.size}),Object(u["l"])().then(function(n){console.log(n),t.expiredApp=n.size}),Object(u["f"])().then(function(n){console.log(n),t.appCount=n.size}),Object(u["n"])().then(function(n){console.log(n),t.udidSize=n.size}),Object(u["p"])().then(function(n){console.log(n),t.tableData=n})},methods:{},data:function(){return{filename:t,sysInfo:{},downloadSize:0,udidSize:0,appCount:0,expiredApp:0,tableData:[]}}}}).call(this,"/index.js")}}]);
//# sourceMappingURL=chunk-1c60f88a.7151dec9.js.map