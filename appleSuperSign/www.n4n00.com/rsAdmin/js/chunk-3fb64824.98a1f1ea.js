(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fb64824"],{"098a":function(t,e,n){"use strict";var i=n("cbd7"),a=n.n(i);a.a},"3b2b":function(t,e,n){var i=n("7726"),a=n("5dbc"),r=n("86cc").f,o=n("9093").f,u=n("aae3"),c=n("0bfb"),s=i.RegExp,l=s,d=s.prototype,f=/a/g,p=/a/g,m=new s(f)!==f;if(n("9e1e")&&(!m||n("79e5")(function(){return p[n("2b4c")("match")]=!1,s(f)!=f||s(p)==p||"/a/i"!=s(f,"i")}))){s=function(t,e){var n=this instanceof s,i=u(t),r=void 0===e;return!n&&i&&t.constructor===s&&r?t:a(m?new l(i&&!r?t.source:t,e):l((i=t instanceof s)?t.source:t,i&&r?c.call(t):e),n?this:d,s)};for(var g=function(t){t in s||r(s,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},h=o(l),b=0;h.length>b;)g(h[b++]);d.constructor=s,s.prototype=d,n("2aba")(i,"RegExp",s)}n("7a56")("RegExp")},"93cd":function(t,e,n){"use strict";n.d(e,"n",function(){return a}),n.d(e,"l",function(){return r}),n.d(e,"f",function(){return o}),n.d(e,"k",function(){return u}),n.d(e,"p",function(){return c}),n.d(e,"r",function(){return s}),n.d(e,"D",function(){return l}),n.d(e,"C",function(){return d}),n.d(e,"B",function(){return f}),n.d(e,"m",function(){return p}),n.d(e,"g",function(){return m}),n.d(e,"s",function(){return g}),n.d(e,"j",function(){return h}),n.d(e,"x",function(){return b}),n.d(e,"q",function(){return w}),n.d(e,"A",function(){return y}),n.d(e,"h",function(){return v}),n.d(e,"u",function(){return x}),n.d(e,"t",function(){return D}),n.d(e,"i",function(){return O}),n.d(e,"v",function(){return T}),n.d(e,"w",function(){return j}),n.d(e,"b",function(){return I}),n.d(e,"y",function(){return _}),n.d(e,"z",function(){return S}),n.d(e,"o",function(){return k}),n.d(e,"a",function(){return A}),n.d(e,"e",function(){return z}),n.d(e,"d",function(){return $}),n.d(e,"c",function(){return U});var i=n("9bd2");function a(){return Object(i["a"])({url:"/getSurplusUDID",method:"get"})}function r(){return Object(i["a"])({url:"/getExpiredAppCount",method:"get"})}function o(){return Object(i["a"])({url:"/getAppCount",method:"get"})}function u(){return Object(i["a"])({url:"/getDownloadSizeToday",method:"get"})}function c(){return Object(i["a"])({url:"/getSysInfo",method:"get"})}function s(t,e,n,a,r){return Object(i["a"])({url:"/getUserInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:a,num:r}})}function l(t,e){return Object(i["a"])({url:"/changeAccountStatu",method:"post",data:{id:t,statu:e}})}function d(t,e){return Object(i["a"])({url:"/changeUserMaxUdid",method:"post",data:{id:t,udid:e}})}function f(t,e){return Object(i["a"])({url:"/changeUserAmount",method:"post",data:{id:t,amount:e}})}function p(t,e,n,a,r){return Object(i["a"])({url:"/getRechargeInfo",method:"get",params:{account:t,beginTime:e,endTime:n,size:a,num:r}})}function m(t,e,n,a,r,o){return Object(i["a"])({url:"/getAppInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:a,num:r,appName:o}})}function g(t,e){return Object(i["a"])({url:"/setAppStatuAdmin",method:"post",data:{id:t,statu:e}})}function h(t,e,n,a,r,o){return Object(i["a"])({url:"/getBusAppInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:a,num:r,appName:o}})}function b(t,e){return Object(i["a"])({url:"/setBusAppExpiredTime",method:"post",data:{id:t,time:e}})}function w(t,e,n,a,r,o){return Object(i["a"])({url:"/getUDIDInfoListAdmin",method:"get",params:{udid:t,beginTime:e,endTime:n,size:a,num:r,appleId:o}})}function y(t,e){return Object(i["a"])({url:"/changeUDIDStatuAdmin",method:"post",data:{id:t,statu:e}})}function v(t,e,n,a,r){return Object(i["a"])({url:"/getAppIdInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:a,num:r}})}function x(t,e){return Object(i["a"])({url:"/setAppIdStatu",method:"post",data:{id:t,statu:e}})}function D(t){return Object(i["a"])({url:"/setAppIdErrorStatu",method:"post",data:{id:t}})}function O(t,e,n,a,r){return Object(i["a"])({url:"/getBusAccountInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:a,num:r}})}function T(t,e){return Object(i["a"])({url:"/changeBusAccountStatu",method:"post",data:{id:t,statu:e}})}function j(t,e){return Object(i["a"])({url:"/changeBusAccountTip",method:"post",data:{id:t,tip:e}})}function I(t,e,n,a){return Object(i["a"])({url:"/addBusAccount",method:"post",data:{p12Path:t,mpPath:e,tip:n,password:a}})}function _(t,e,n,a){return Object(i["a"])({url:"/updateSysCoinConfig",method:"post",data:{coin_name:t,coin_to_udid:e,coin_to_resign:n,coin_to_update:a}})}function S(t,e,n){return Object(i["a"])({url:"/updateSysUsConfig",method:"post",data:{kf_qq_info:t,kf_weixin_info:e,kf_phone_info:n}})}function k(){return Object(i["a"])({url:"/getSysConfig",method:"get"})}function A(t,e,n,a){return Object(i["a"])({url:"/registerAppId",method:"post",data:{account:t,pwd:e,tip:n,code:a}})}function z(t){return Object(i["a"])({url:"/delUserInfo",method:"post",data:{id:t}})}function $(t){return Object(i["a"])({url:"/delAppInfo",method:"post",data:{id:t}})}function U(t){return Object(i["a"])({url:"/delAppIdInfo",method:"post",data:{id:t}})}},acf8:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("d2-container",[n("template",{slot:"header"},[t._v("用户管理")]),n("el-input",{staticStyle:{width:"25em","margin-left":"20px"},attrs:{type:"text",placeholder:"请输入用户账号关键词","prefix-icon":"el-icon-search",maxlength:"10","show-word-limit":""},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),n("el-date-picker",{staticStyle:{"margin-left":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"timestamp"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchUserInfo}},[t._v("搜索")]),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"success"},on:{click:t.getAllUserInfo}},[t._v("全部")]),[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.userinfoData,"row-class-name":t.tableRowClassName}},[n("el-table-column",{attrs:{prop:"id",label:"#",width:"50"}}),n("el-table-column",{attrs:{prop:"account",label:"账号"}}),n("el-table-column",{attrs:{prop:"phone",label:"手机号码"}}),n("el-table-column",{attrs:{prop:"coin",label:"余额"}}),n("el-table-column",{attrs:{prop:"udid_count",label:"已购买UDID"}}),n("el-table-column",{attrs:{prop:"statu",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(0==e.row.statu?"可用":"冻结")+"\n        ")]}}])}),n("el-table-column",{attrs:{prop:"creater_time",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),n("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.creater_time)))])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"400"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(n){return t.changeUserAmount(e.$index,e.row.id,e.row.account)}}},[t._v("修改余额")]),n("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(n){return t.changeUDIDNum(e.$index,e.row.id,e.row.account)}}},[t._v("修改UDID")]),n("el-button",{attrs:{size:"mini",type:0==e.row.statu?"danger":"success",plain:""},on:{click:function(n){return t.handleFrozen(e.$index,e.row.id,e.row.account,0==e.row.statu?"冻结":"启用",0==e.row.statu?1:0)}}},[t._v("\n            "+t._s(0==e.row.statu?"冻结账号":"启用账号")+"\n          ")]),n("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(n){return t.deleteData(e.$index,e.row.id,e.row.account)}}},[t._v("删除账号"),n("i",{staticClass:"el-icon-delete el-icon--right"})])]}}])})],1)],n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.dataSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],2)},a=[],r=n("93cd"),o=n("e66c"),u={created:function(){this.getUserInfo()},filters:{formatDate:function(t){var e=new Date(parseInt(t));return Object(o["a"])(e,"yyyy-MM-dd hh:mm")}},methods:{tableRowClassName:function(t){t.row;var e=t.rowIndex;return 1===this.userinfoData[e].statu?"warning-row":""},handleSizeChange:function(t){console.log(t)},handleCurrentChange:function(t){console.log(t),this.getUserInfo()},getUserInfo:function(){var t=this;Object(r["r"])(this.account,this.beginTime,this.endTime,this.pageSize,this.currentPage).then(function(e){console.log(e),t.userinfoData=e.data,t.dataSize=e.size})},searchUserInfo:function(){this.value2.length>0&&(this.beginTime=this.value2[0],this.endTime=this.value2[1]),this.getUserInfo()},getAllUserInfo:function(){this.value2="",this.beginTime="",this.endTime="",this.account="",this.currentPage=1,this.getUserInfo()},handleFrozen:function(t,e,n,i,a){var o=this;this.$confirm("此操作将"+i+"账号"+n+", 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r["D"])(e,a).then(function(e){o.userinfoData[t].statu=a,o.$notify({title:"成功",message:i+"账号"+n+"成功",type:"success"})})}).catch(function(){o.$notify({title:"提示",message:"用户取消操作",type:"info"})})},deleteData:function(t,e,n){var i=this;this.$confirm("此操作将删除账号"+n+", 是否继续? 请注意，一经操作无法撤销！","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(r["e"])(e).then(function(e){i.userinfoData.splice(t,1),i.$notify({title:"成功",message:"删除账号"+n+"成功",type:"success"})})}).catch(function(){i.$notify({title:"提示",message:"用户取消操作",type:"info"})})},changeUDIDNum:function(t,e,n){var i=this;this.$prompt("本次操作将修改账号"+n+"的最大可用UDID数，请谨慎操作!","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[0-9]+$/,inputErrorMessage:"请输入正整数"}).then(function(a){var o=a.value;Object(r["C"])(e,o).then(function(e){i.userinfoData[t].udid_count=o,i.$notify({title:"成功",message:"修改账号"+n+"最大可用udid数成功",type:"success"})}).catch(function(){i.$notify({title:"提示",message:"用户取消操作",type:"info"})})})},changeUserAmount:function(t,e,n){var i=this;this.$prompt("本次操作将修改账号"+n+"的余额，请谨慎操作!  请注意，正数为增加，负数为减少","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[-\+]?\d+$/,inputErrorMessage:"请输入整数"}).then(function(a){var o=a.value;Object(r["B"])(e,o).then(function(e){i.userinfoData[t].coin=parseInt(i.userinfoData[t].coin)+parseInt(o),i.$notify({title:"成功",message:"修改账号"+n+"余额成功",type:"success"})}).catch(function(){i.$notify({title:"提示",message:"用户取消操作",type:"info"})})})}},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},value2:"",appName:"",account:"",dataSize:0,currentPage:1,pageSize:10,userinfoData:[],beginTime:"",endTime:""}}},c=u,s=(n("098a"),n("2877")),l=function(t){t.options.__source="src/views/userManage/userManage.vue"},d=l,f=Object(s["a"])(c,i,a,!1,null,null,null);"function"===typeof d&&d(f);e["default"]=f.exports},cbd7:function(t,e,n){},e66c:function(t,e,n){"use strict";n.d(e,"a",function(){return i});n("3b2b"),n("a481");function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("(".concat(i,")")).test(e)){var r=n[i]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?r:a(r))}return e}function a(t){return("00"+t).substr(t.length)}}}]);
//# sourceMappingURL=chunk-3fb64824.98a1f1ea.js.map