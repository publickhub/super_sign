(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74d97b52"],{"3b2b":function(t,e,n){var a=n("7726"),i=n("5dbc"),r=n("86cc").f,o=n("9093").f,u=n("aae3"),c=n("0bfb"),s=a.RegExp,p=s,d=s.prototype,l=/a/g,f=/a/g,m=new s(l)!==l;if(n("9e1e")&&(!m||n("79e5")(function(){return f[n("2b4c")("match")]=!1,s(l)!=l||s(f)==f||"/a/i"!=s(l,"i")}))){s=function(t,e){var n=this instanceof s,a=u(t),r=void 0===e;return!n&&a&&t.constructor===s&&r?t:i(m?new p(a&&!r?t.source:t,e):p((a=t instanceof s)?t.source:t,a&&r?c.call(t):e),n?this:d,s)};for(var h=function(t){t in s||r(s,t,{configurable:!0,get:function(){return p[t]},set:function(e){p[t]=e}})},g=o(p),b=0;g.length>b;)h(g[b++]);d.constructor=s,s.prototype=d,n("2aba")(a,"RegExp",s)}n("7a56")("RegExp")},"604a":function(t,e,n){},"93cd":function(t,e,n){"use strict";n.d(e,"r",function(){return i}),n.d(e,"o",function(){return r}),n.d(e,"i",function(){return o}),n.d(e,"n",function(){return u}),n.d(e,"c",function(){return c}),n.d(e,"t",function(){return s}),n.d(e,"w",function(){return p}),n.d(e,"K",function(){return d}),n.d(e,"J",function(){return l}),n.d(e,"I",function(){return f}),n.d(e,"p",function(){return m}),n.d(e,"j",function(){return h}),n.d(e,"h",function(){return g}),n.d(e,"z",function(){return b}),n.d(e,"y",function(){return w}),n.d(e,"m",function(){return _}),n.d(e,"v",function(){return y}),n.d(e,"E",function(){return v}),n.d(e,"u",function(){return j}),n.d(e,"H",function(){return O}),n.d(e,"k",function(){return I}),n.d(e,"B",function(){return k}),n.d(e,"A",function(){return x}),n.d(e,"l",function(){return A}),n.d(e,"C",function(){return S}),n.d(e,"D",function(){return T}),n.d(e,"b",function(){return D}),n.d(e,"F",function(){return z}),n.d(e,"G",function(){return C}),n.d(e,"s",function(){return $}),n.d(e,"a",function(){return L}),n.d(e,"g",function(){return E}),n.d(e,"f",function(){return B}),n.d(e,"d",function(){return N}),n.d(e,"e",function(){return R}),n.d(e,"x",function(){return U});var a=n("9bd2");function i(){return Object(a["a"])({url:"/getSurplusUDID",method:"get"})}function r(){return Object(a["a"])({url:"/getExpiredAppCount",method:"get"})}function o(){return Object(a["a"])({url:"/getAppCount",method:"get"})}function u(){return Object(a["a"])({url:"/getDownloadSizeToday",method:"get"})}function c(){return Object(a["a"])({url:"/checkAppIdCer",method:"post"})}function s(){return Object(a["a"])({url:"/getSysInfo",method:"get"})}function p(t,e,n,i,r){return Object(a["a"])({url:"/getUserInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r}})}function d(t,e){return Object(a["a"])({url:"/changeAccountStatu",method:"post",data:{id:t,statu:e}})}function l(t,e){return Object(a["a"])({url:"/changeUserMaxUdid",method:"post",data:{id:t,udid:e}})}function f(t,e){return Object(a["a"])({url:"/changeUserAmount",method:"post",data:{id:t,amount:e}})}function m(t,e,n,i,r){return Object(a["a"])({url:"/getRechargeInfo",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r}})}function h(t,e,n,i,r,o){return Object(a["a"])({url:"/getAppInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r,appName:o}})}function g(t,e,n,i,r,o){return Object(a["a"])({url:"/getApkInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r,appName:o}})}function b(t,e){return Object(a["a"])({url:"/setAppStatuAdmin",method:"post",data:{id:t,statu:e}})}function w(t,e){return Object(a["a"])({url:"/setApkStatuAdmin",method:"post",data:{id:t,statu:e}})}function _(t,e,n,i,r,o){return Object(a["a"])({url:"/getBusAppInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r,appName:o}})}function y(){return Object(a["a"])({url:"/getUsableBusAccountInfoList",method:"get",params:{}})}function v(t,e){return Object(a["a"])({url:"/setBusAppExpiredTime",method:"post",data:{id:t,time:e}})}function j(t,e,n,i,r,o){return Object(a["a"])({url:"/getUDIDInfoListAdmin",method:"get",params:{udid:t,beginTime:e,endTime:n,size:i,num:r,appleId:o}})}function O(t,e){return Object(a["a"])({url:"/changeUDIDStatuAdmin",method:"post",data:{id:t,statu:e}})}function I(t,e,n,i,r){return Object(a["a"])({url:"/getAppIdInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r}})}function k(t,e){return Object(a["a"])({url:"/setAppIdStatu",method:"post",data:{id:t,statu:e}})}function x(t){return Object(a["a"])({url:"/setAppIdErrorStatu",method:"post",data:{id:t}})}function A(t,e,n,i,r){return Object(a["a"])({url:"/getBusAccountInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:i,num:r}})}function S(t,e){return Object(a["a"])({url:"/changeBusAccountStatu",method:"post",data:{id:t,statu:e}})}function T(t,e){return Object(a["a"])({url:"/changeBusAccountTip",method:"post",data:{id:t,tip:e}})}function D(t,e,n,i){return Object(a["a"])({url:"/addBusAccount",method:"post",data:{p12Path:t,mpPath:e,tip:n,password:i}})}function z(t,e,n,i,r){return Object(a["a"])({url:"/updateSysCoinConfig",method:"post",data:{coin_name:t,coin_to_udid:e,coin_to_resign:n,coin_to_update:i,coin_to_dcount:r}})}function C(t,e,n){return Object(a["a"])({url:"/updateSysUsConfig",method:"post",data:{kf_qq_info:t,kf_weixin_info:e,kf_phone_info:n}})}function $(){return Object(a["a"])({url:"/getSysConfig",method:"get"})}function L(t,e,n,i,r){return Object(a["a"])({url:"/registerAppId",method:"post",data:{account:t,pwd:e,tip:n,code:i,bundle:r}})}function E(t){return Object(a["a"])({url:"/delUserInfo",method:"post",data:{id:t}})}function B(t){return Object(a["a"])({url:"/delAppInfo",method:"post",data:{id:t}})}function N(t){return Object(a["a"])({url:"/delApkInfo",method:"post",data:{id:t}})}function R(t){return Object(a["a"])({url:"/delAppIdInfo",method:"post",data:{id:t}})}function U(t,e){return Object(a["a"])({url:"/resignIpaList",method:"post",data:{id:t,cer_id:e}})}},bb47:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("d2-container",[n("template",{slot:"header"},[t._v("超级签应用管理")]),n("el-input",{staticStyle:{width:"25em","margin-left":"20px"},attrs:{type:"text",placeholder:"请输入用户账号关键词","prefix-icon":"el-icon-search",maxlength:"10","show-word-limit":""},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),n("el-input",{staticStyle:{width:"25em","margin-left":"20px"},attrs:{type:"text",placeholder:"请输入app包关键词","prefix-icon":"el-icon-search",maxlength:"10","show-word-limit":""},model:{value:t.appName,callback:function(e){t.appName=e},expression:"appName"}}),n("el-date-picker",{staticStyle:{"margin-left":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"timestamp"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchAppInfo}},[t._v("搜索")]),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"success"},on:{click:t.getAllAppInfo}},[t._v("全部")]),[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.appInfoData,"row-class-name":t.tableRowClassName}},[n("el-table-column",{attrs:{prop:"id",label:"#",width:"50"}}),n("el-table-column",{attrs:{prop:"id",label:"app图标",width:"100"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("div",{staticClass:"block"},[n("el-image",{staticStyle:{width:"80px",height:"80px"},attrs:{src:t.row.icon_base64,"preview-src-list":[t.row.icon_base64]}})],1)]}}])}),n("el-table-column",{attrs:{prop:"udid_inuse",label:"下载链接",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("http://www.n4n00.com/sr"+t._s(e.row.Hashids))]}}])}),n("el-table-column",{attrs:{prop:"account",label:"应用所有者"}}),n("el-table-column",{attrs:{prop:"app_name",label:"app名称"}}),n("el-table-column",{attrs:{prop:"bundle_id",label:"bundleId"}}),n("el-table-column",{attrs:{prop:"tip",label:"备注"}}),n("el-table-column",{attrs:{prop:"admin_check",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(1==e.row.admin_check?"可用":"冻结")+"\n          ")]}}])}),n("el-table-column",{attrs:{prop:"creater_time",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),n("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.creater_time)))])]}}])}),n("el-table-column",{attrs:{prop:"creater_time",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),n("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.update_time)))])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:1==e.row.admin_check?"danger":"success",plain:""},on:{click:function(n){return t.handleFrozen(e.$index,e.row.id,e.row.app_name,1==e.row.admin_check?"冻结":"启用",1==e.row.admin_check?0:1)}}},[t._v("\n              "+t._s(1==e.row.admin_check?"冻结应用":"启用应用")+"\n            ")]),n("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(n){return t.deleteData(e.$index,e.row.id,e.row.app_name)}}},[t._v("删除应用"),n("i",{staticClass:"el-icon-delete el-icon--right"})])]}}])})],1)],n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.dataSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],2)},i=[],r=n("bd86"),o=n("93cd"),u=n("e66c"),c={created:function(){this.getAppInfoList()},filters:{formatDate:function(t){var e=new Date(parseInt(t));return Object(u["a"])(e,"yyyy-MM-dd hh:mm")}},methods:{tableRowClassName:function(t){t.row;var e=t.rowIndex;return 0===this.appInfoData[e].admin_check?"warning-row":""},handleSizeChange:function(t){console.log(t)},handleCurrentChange:function(t){console.log(t),this.getAppInfoList()},getAppInfoList:function(){var t=this;Object(o["j"])(this.account,this.beginTime,this.endTime,this.pageSize,this.currentPage,this.appName).then(function(e){console.log(e),t.appInfoData=e.data,t.dataSize=e.size})},searchAppInfo:function(){this.value2.length>0&&(this.beginTime=this.value2[0],this.endTime=this.value2[1]),this.getAppInfoList()},getAllAppInfo:function(){this.value2="",this.beginTime="",this.endTime="",this.account="",this.appName="",this.currentPage=1,this.getAppInfoList()},deleteData:function(t,e,n){var a=this;this.$confirm("此操作将删除应用"+n+", 是否继续? 请注意，一经操作无法撤销！","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o["f"])(e).then(function(e){a.appInfoData.splice(t,1),a.$notify({title:"成功",message:"删除应用"+n+"成功",type:"success"})})}).catch(function(){a.$notify({title:"提示",message:"用户取消操作",type:"info"})})},handleFrozen:function(t,e,n,a,i){var r=this;this.$confirm("此操作将"+a+"应用"+n+", 是否继续?   超管冻结应用，普通用户无法解冻，请谨慎操作","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o["z"])(e,i).then(function(e){r.appInfoData[t].admin_check=i,r.$notify({title:"成功",message:a+"应用"+n+"成功",type:"success"})})}).catch(function(){r.$notify({title:"提示",message:"用户取消操作",type:"info"})})}},data:function(){var t;return t={pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},value2:"",appName:"",account:"",dataSize:0,currentPage:1,pageSize:10,appInfoData:[]},Object(r["a"])(t,"appName",""),Object(r["a"])(t,"beginTime",""),Object(r["a"])(t,"endTime",""),t}},s=c,p=(n("db6e"),n("2877")),d=function(t){t.options.__source="src/views/superResign/appInfo/index.vue"},l=d,f=Object(p["a"])(s,a,i,!1,null,null,null);"function"===typeof l&&l(f);e["default"]=f.exports},db6e:function(t,e,n){"use strict";var a=n("604a"),i=n.n(a);i.a},e66c:function(t,e,n){"use strict";n.d(e,"a",function(){return a});n("3b2b"),n("a481");function a(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var a in n)if(new RegExp("(".concat(a,")")).test(e)){var r=n[a]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?r:i(r))}return e}function i(t){return("00"+t).substr(t.length)}}}]);
//# sourceMappingURL=chunk-74d97b52.6da17009.js.map