(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a557f4c"],{"3b2b":function(t,n,e){var o=e("7726"),i=e("5dbc"),r=e("86cc").f,s=e("9093").f,u=e("aae3"),c=e("0bfb"),a=o.RegExp,f=a,d=a.prototype,m=/a/g,l=/a/g,p=new a(m)!==m;if(e("9e1e")&&(!p||e("79e5")(function(){return l[e("2b4c")("match")]=!1,a(m)!=m||a(l)==l||"/a/i"!=a(m,"i")}))){a=function(t,n){var e=this instanceof a,o=u(t),r=void 0===n;return!e&&o&&t.constructor===a&&r?t:i(p?new f(o&&!r?t.source:t,n):f((o=t instanceof a)?t.source:t,o&&r?c.call(t):n),e?this:d,a)};for(var g=function(t){t in a||r(a,t,{configurable:!0,get:function(){return f[t]},set:function(n){f[t]=n}})},_=s(f),b=0;_.length>b;)g(_[b++]);d.constructor=a,a.prototype=d,e("2aba")(o,"RegExp",a)}e("7a56")("RegExp")},"77f16":function(t,n,e){"use strict";var o=e("7cc5"),i=e.n(o);i.a},"7cc5":function(t,n,e){},"93cd":function(t,n,e){"use strict";e.d(n,"r",function(){return i}),e.d(n,"o",function(){return r}),e.d(n,"i",function(){return s}),e.d(n,"n",function(){return u}),e.d(n,"c",function(){return c}),e.d(n,"t",function(){return a}),e.d(n,"w",function(){return f}),e.d(n,"K",function(){return d}),e.d(n,"J",function(){return m}),e.d(n,"I",function(){return l}),e.d(n,"p",function(){return p}),e.d(n,"j",function(){return g}),e.d(n,"h",function(){return _}),e.d(n,"z",function(){return b}),e.d(n,"y",function(){return h}),e.d(n,"m",function(){return y}),e.d(n,"v",function(){return C}),e.d(n,"E",function(){return F}),e.d(n,"u",function(){return k}),e.d(n,"H",function(){return j}),e.d(n,"k",function(){return O}),e.d(n,"B",function(){return x}),e.d(n,"A",function(){return v}),e.d(n,"l",function(){return A}),e.d(n,"C",function(){return I}),e.d(n,"D",function(){return q}),e.d(n,"b",function(){return w}),e.d(n,"F",function(){return S}),e.d(n,"G",function(){return T}),e.d(n,"s",function(){return $}),e.d(n,"a",function(){return E}),e.d(n,"g",function(){return U}),e.d(n,"f",function(){return D}),e.d(n,"d",function(){return L}),e.d(n,"e",function(){return z}),e.d(n,"x",function(){return R});var o=e("9bd2");function i(){return Object(o["a"])({url:"/getSurplusUDID",method:"get"})}function r(){return Object(o["a"])({url:"/getExpiredAppCount",method:"get"})}function s(){return Object(o["a"])({url:"/getAppCount",method:"get"})}function u(){return Object(o["a"])({url:"/getDownloadSizeToday",method:"get"})}function c(){return Object(o["a"])({url:"/checkAppIdCer",method:"post"})}function a(){return Object(o["a"])({url:"/getSysInfo",method:"get"})}function f(t,n,e,i,r){return Object(o["a"])({url:"/getUserInfoList",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r}})}function d(t,n){return Object(o["a"])({url:"/changeAccountStatu",method:"post",data:{id:t,statu:n}})}function m(t,n){return Object(o["a"])({url:"/changeUserMaxUdid",method:"post",data:{id:t,udid:n}})}function l(t,n){return Object(o["a"])({url:"/changeUserAmount",method:"post",data:{id:t,amount:n}})}function p(t,n,e,i,r){return Object(o["a"])({url:"/getRechargeInfo",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r}})}function g(t,n,e,i,r,s){return Object(o["a"])({url:"/getAppInfoListAdmin",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r,appName:s}})}function _(t,n,e,i,r,s){return Object(o["a"])({url:"/getApkInfoListAdmin",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r,appName:s}})}function b(t,n){return Object(o["a"])({url:"/setAppStatuAdmin",method:"post",data:{id:t,statu:n}})}function h(t,n){return Object(o["a"])({url:"/setApkStatuAdmin",method:"post",data:{id:t,statu:n}})}function y(t,n,e,i,r,s){return Object(o["a"])({url:"/getBusAppInfoListAdmin",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r,appName:s}})}function C(){return Object(o["a"])({url:"/getUsableBusAccountInfoList",method:"get",params:{}})}function F(t,n){return Object(o["a"])({url:"/setBusAppExpiredTime",method:"post",data:{id:t,time:n}})}function k(t,n,e,i,r,s){return Object(o["a"])({url:"/getUDIDInfoListAdmin",method:"get",params:{udid:t,beginTime:n,endTime:e,size:i,num:r,appleId:s}})}function j(t,n){return Object(o["a"])({url:"/changeUDIDStatuAdmin",method:"post",data:{id:t,statu:n}})}function O(t,n,e,i,r){return Object(o["a"])({url:"/getAppIdInfoList",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r}})}function x(t,n){return Object(o["a"])({url:"/setAppIdStatu",method:"post",data:{id:t,statu:n}})}function v(t){return Object(o["a"])({url:"/setAppIdErrorStatu",method:"post",data:{id:t}})}function A(t,n,e,i,r){return Object(o["a"])({url:"/getBusAccountInfoList",method:"get",params:{account:t,beginTime:n,endTime:e,size:i,num:r}})}function I(t,n){return Object(o["a"])({url:"/changeBusAccountStatu",method:"post",data:{id:t,statu:n}})}function q(t,n){return Object(o["a"])({url:"/changeBusAccountTip",method:"post",data:{id:t,tip:n}})}function w(t,n,e,i){return Object(o["a"])({url:"/addBusAccount",method:"post",data:{p12Path:t,mpPath:n,tip:e,password:i}})}function S(t,n,e,i,r){return Object(o["a"])({url:"/updateSysCoinConfig",method:"post",data:{coin_name:t,coin_to_udid:n,coin_to_resign:e,coin_to_update:i,coin_to_dcount:r}})}function T(t,n,e){return Object(o["a"])({url:"/updateSysUsConfig",method:"post",data:{kf_qq_info:t,kf_weixin_info:n,kf_phone_info:e}})}function $(){return Object(o["a"])({url:"/getSysConfig",method:"get"})}function E(t,n,e,i,r){return Object(o["a"])({url:"/registerAppId",method:"post",data:{account:t,pwd:n,tip:e,code:i,bundle:r}})}function U(t){return Object(o["a"])({url:"/delUserInfo",method:"post",data:{id:t}})}function D(t){return Object(o["a"])({url:"/delAppInfo",method:"post",data:{id:t}})}function L(t){return Object(o["a"])({url:"/delApkInfo",method:"post",data:{id:t}})}function z(t){return Object(o["a"])({url:"/delAppIdInfo",method:"post",data:{id:t}})}function R(t,n){return Object(o["a"])({url:"/resignIpaList",method:"post",data:{id:t,cer_id:n}})}},a48f:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("d2-container",[e("template",{slot:"header"},[t._v("系统配置管理")]),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:10}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[e("i",{staticClass:"el-icon-money"}),t._v("\n            代币信息配置")])]),e("el-form",{ref:"sysConfigForm",staticClass:"demo-ruleForm",attrs:{model:t.sysConfigForm,rules:t.rules,"label-width":"150px","label-position":"left"}},[e("el-form-item",{attrs:{label:"代币名称",prop:"coin_name"}},[e("el-input",{model:{value:t.sysConfigForm.coin_name,callback:function(n){t.$set(t.sysConfigForm,"coin_name",n)},expression:"sysConfigForm.coin_name"}})],1),e("el-form-item",{attrs:{label:"UDID单价",prop:"coin_to_udid"}},[e("el-input",{model:{value:t.sysConfigForm.coin_to_udid,callback:function(n){t.$set(t.sysConfigForm,"coin_to_udid",t._n(n))},expression:"sysConfigForm.coin_to_udid"}})],1),e("el-form-item",{attrs:{label:"企业签名单价",prop:"coin_to_resign"}},[e("el-input",{model:{value:t.sysConfigForm.coin_to_resign,callback:function(n){t.$set(t.sysConfigForm,"coin_to_resign",t._n(n))},expression:"sysConfigForm.coin_to_resign"}})],1),e("el-form-item",{attrs:{label:"企业签名更新单价",prop:"coin_to_update"}},[e("el-input",{model:{value:t.sysConfigForm.coin_to_update,callback:function(n){t.$set(t.sysConfigForm,"coin_to_update",t._n(n))},expression:"sysConfigForm.coin_to_update"}})],1),e("el-form-item",{attrs:{label:"下载点数单价/10次",prop:"coin_to_dcount"}},[e("el-input",{model:{value:t.sysConfigForm.coin_to_dcount,callback:function(n){t.$set(t.sysConfigForm,"coin_to_dcount",t._n(n))},expression:"sysConfigForm.coin_to_dcount"}})],1)],1),e("el-button",{attrs:{type:"primary"},on:{click:t.getSysConfig}},[t._v("重置信息")]),e("el-button",{attrs:{type:"success"},on:{click:t.updateSysCoinConfig}},[t._v("提交信息")])],1)],1),e("el-col",{attrs:{span:10}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[e("i",{staticClass:"el-icon-chat-dot-round"}),t._v("\n            联系我们")])]),e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.sysConfigForm,rules:t.rules,"label-width":"150px","label-position":"left"}},[e("el-form-item",{attrs:{label:"客服QQ",prop:"kf_qq_info"}},[e("el-input",{model:{value:t.sysConfigForm.kf_qq_info,callback:function(n){t.$set(t.sysConfigForm,"kf_qq_info",n)},expression:"sysConfigForm.kf_qq_info"}})],1),e("el-form-item",{attrs:{label:"客服微信",prop:"kf_weixin_info"}},[e("el-input",{model:{value:t.sysConfigForm.kf_weixin_info,callback:function(n){t.$set(t.sysConfigForm,"kf_weixin_info",n)},expression:"sysConfigForm.kf_weixin_info"}})],1),e("el-form-item",{attrs:{label:"客服电话",prop:"kf_phone_info"}},[e("el-input",{model:{value:t.sysConfigForm.kf_phone_info,callback:function(n){t.$set(t.sysConfigForm,"kf_phone_info",n)},expression:"sysConfigForm.kf_phone_info"}})],1)],1),e("el-button",{attrs:{type:"primary"},on:{click:t.getSysConfig}},[t._v("重置信息")]),e("el-button",{attrs:{type:"success"},on:{click:t.updateSysUsConfig}},[t._v("提交信息")])],1)],1)],1)],2)},i=[],r=e("93cd"),s=(e("e66c"),e("5c96")),u={created:function(){this.getSysConfig()},methods:{getSysConfig:function(){var t=this;Object(r["s"])().then(function(n){t.sysConfigForm=n})},updateSysCoinConfig:function(){var t=this;if(""!=this.sysConfigForm.coin_name&&""!=this.sysConfigForm.coin_to_udid&&""!=this.sysConfigForm.coin_to_resign&&""!=this.sysConfigForm.coin_to_update&&""!=this.sysConfigForm.coin_to_dcount){var n=s["Loading"].service({fullscreen:!0});Object(r["F"])(this.sysConfigForm.coin_name,this.sysConfigForm.coin_to_udid,this.sysConfigForm.coin_to_resign,this.sysConfigForm.coin_to_update,this.sysConfigForm.coin_to_dcount).then(function(e){n.close(),t.$notify({title:"提示",message:"提交代币配置成功",type:"success"})}).catch(function(){n.close(),t.$notify({title:"提示",message:"提交出错",type:"info"})})}else this.$notify({title:"提示",message:"信息不完整",type:"info"})},updateSysUsConfig:function(){var t=this,n=s["Loading"].service({fullscreen:!0});Object(r["G"])(this.sysConfigForm.kf_qq_info,this.sysConfigForm.kf_weixin_info,this.sysConfigForm.kf_phone_info).then(function(e){n.close(),t.$notify({title:"提示",message:"提交联系信息配置成功",type:"success"})}).catch(function(){n.close(),t.$notify({title:"提示",message:"提交出错",type:"info"})})}},data:function(){return{sysConfigForm:{coin_name:"",coin_to_udid:"",coin_to_resign:"",coin_to_update:"",coin_to_dcount:"",kf_qq_info:"",kf_weixin_info:"",kf_phone_info:""},rules:{coin_name:[{required:!0,message:"请输入代币昵称",trigger:"blur"},{min:1,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],coin_to_udid:[{required:!0,message:"该项不能为空"},{type:"number",message:"请输入大于0的数字"}],coin_to_dcount:[{required:!0,message:"该项不能为空"},{type:"number",message:"请输入大于0的数字"}],coin_to_resign:[{required:!0,message:"该项不能为空"},{type:"number",message:"请输入大于0的数字"}],coin_to_update:[{required:!0,message:"该项不能为空"},{type:"number",message:"请输入大于0的数字"}],kf_qq_info:[{required:!0,message:"请输入客服qq",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],kf_weixin_info:[{required:!0,message:"请输入微信名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],kf_phone_info:[{required:!0,message:"请输入联系电话",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}]}}}},c=u,a=(e("77f16"),e("2877")),f=function(t){t.options.__source="src/views/sysConfig/sysConfig.vue"},d=f,m=Object(a["a"])(c,o,i,!1,null,null,null);"function"===typeof d&&d(m);n["default"]=m.exports},e66c:function(t,n,e){"use strict";e.d(n,"a",function(){return o});e("3b2b"),e("a481");function o(t,n){/(y+)/.test(n)&&(n=n.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var e={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var o in e)if(new RegExp("(".concat(o,")")).test(n)){var r=e[o]+"";n=n.replace(RegExp.$1,1===RegExp.$1.length?r:i(r))}return n}function i(t){return("00"+t).substr(t.length)}}}]);
//# sourceMappingURL=chunk-3a557f4c.30e50aa1.js.map