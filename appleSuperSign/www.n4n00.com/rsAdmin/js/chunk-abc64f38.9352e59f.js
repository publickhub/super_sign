(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-abc64f38"],{"3b2b":function(t,e,n){var i=n("7726"),o=n("5dbc"),a=n("86cc").f,r=n("9093").f,s=n("aae3"),u=n("0bfb"),c=i.RegExp,l=c,d=c.prototype,p=/a/g,f=/a/g,m=new c(p)!==p;if(n("9e1e")&&(!m||n("79e5")(function(){return f[n("2b4c")("match")]=!1,c(p)!=p||c(f)==f||"/a/i"!=c(p,"i")}))){c=function(t,e){var n=this instanceof c,i=s(t),a=void 0===e;return!n&&i&&t.constructor===c&&a?t:o(m?new l(i&&!a?t.source:t,e):l((i=t instanceof c)?t.source:t,i&&a?u.call(t):e),n?this:d,c)};for(var g=function(t){t in c||a(c,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},b=r(l),h=0;b.length>h;)g(b[h++]);d.constructor=c,c.prototype=d,n("2aba")(i,"RegExp",c)}n("7a56")("RegExp")},"6f29":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("d2-container",[n("template",{slot:"header"},[t._v("企业账号管理")]),n("el-input",{staticStyle:{width:"25em","margin-left":"20px"},attrs:{type:"text",placeholder:"请输入用户账号关键词","prefix-icon":"el-icon-search",maxlength:"10","show-word-limit":""},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}}),n("el-date-picker",{staticStyle:{"margin-left":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"timestamp"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchAppInfo}},[t._v("搜索")]),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"success"},on:{click:t.getAllAppInfo}},[t._v("全部")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("新增企业账号"),n("i",{staticClass:"el-icon-upload el-icon--right"})]),[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.tableRowClassName}},[n("el-table-column",{attrs:{prop:"id",label:"#",width:"50"}}),n("el-table-column",{attrs:{prop:"tag_name",label:"账号标识"}}),n("el-table-column",{attrs:{prop:"tip",label:"备注"}}),n("el-table-column",{attrs:{prop:"statu",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(0==e.row.statu?"可用":"冻结")+"\n        ")]}}])}),n("el-table-column",{attrs:{prop:"size",label:"已签名应用数"}}),n("el-table-column",{attrs:{prop:"creater_time",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),n("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.creater_time)))])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:0==e.row.statu?"danger":"success",plain:""},on:{click:function(n){return t.handleFrozen(e.$index,e.row.id,e.row.tag_name,0==e.row.statu?"冻结":"启用",1==e.row.statu?0:1)}}},[t._v("\n            "+t._s(0==e.row.statu?"冻结账号":"启用账号")+"\n          ")]),n("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(n){return t.changeBusAccountTip(e.$index,e.row.id,e.row.tag_name)}}},[t._v("修改备注")]),n("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(n){return t.openResignDiag(e.row.id)}}},[t._v("重签")])]}}])})],1)],n("el-dialog",{attrs:{title:"请选择用于重签名的证书",visible:t.resignFormVisible},on:{"update:visible":function(e){t.resignFormVisible=e}}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:this.useableTableData,"row-class-name":t.tableRowClassName,"highlight-current-row":""},on:{"current-change":t.selectCer}},[n("el-table-column",{attrs:{prop:"id",label:"#",width:"50"}}),n("el-table-column",{attrs:{prop:"tag_name",label:"账号标识"}}),n("el-table-column",{attrs:{prop:"tip",label:"备注"}}),n("el-table-column",{attrs:{prop:"statu",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(0==e.row.statu?"可用":"冻结")+"\n        ")]}}])}),n("el-table-column",{attrs:{prop:"creater_time",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),n("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.creater_time)))])]}}])})],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.resignFormVisible=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary",loading:t.resignIpaLoading},on:{click:function(e){return t.resignIpaList()}}},[t._v("确 定")])],1)],1),n("el-dialog",{attrs:{title:"添加企业账号",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{attrs:{model:t.busAccountForm}},[n("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入备注",autocomplete:"off"},model:{value:t.busAccountForm.tip,callback:function(e){t.$set(t.busAccountForm,"tip",e)},expression:"busAccountForm.tip"}})],1),n("el-form-item",{attrs:{label:"p12文件:","label-width":t.formLabelWidth}},[n("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"https://www.muncs.com/appservice/uploadFile",limit:1,"on-success":t.p12UploadSuccess,beforeUpload:t.beforeUpload,width:t.formLabelWidth}},[n("i",{staticClass:"el-icon-upload",attrs:{width:t.formLabelWidth}}),n("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),n("em",[t._v("点击上传")])]),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传.p12文件")])])],1),n("el-form-item",{attrs:{label:"p12密码:","label-width":t.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入.p12文件密码，密码必须正确可用",autocomplete:"off"},model:{value:t.busAccountForm.p12Password,callback:function(e){t.$set(t.busAccountForm,"p12Password",e)},expression:"busAccountForm.p12Password"}})],1),n("el-form-item",{attrs:{label:"描述文件:","label-width":t.formLabelWidth}},[n("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"https://www.muncs.com/appservice/uploadFile","on-success":t.mobileprovisionUploadSuccess,beforeUpload:t.beforeUpload,width:t.formLabelWidth}},[n("i",{staticClass:"el-icon-upload"}),n("div",{staticClass:"el-upload__text",attrs:{width:t.formLabelWidth}},[t._v("将文件拖到此处，或"),n("em",[t._v("点击上传")])]),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传.mobileprovision文件")])])],1),n("el-form-item",{attrs:{"label-width":t.formLabelWidth}},[n("div",[t._v("1:请确认p12证书和配置文件可用"),n("br"),t._v("2:请确认p12证书和配置文件是否配套")])])],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:t.addBusAccount}},[t._v("确 定")])],1)],1),n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.dataSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],2)},o=[],a=(n("7f7f"),n("93cd")),r=n("e66c"),s=n("5c96"),u={created:function(){this.getBusAccountInfoList(),this.getUseabelBusAccountInfoList()},filters:{formatDate:function(t){var e=new Date(parseInt(t));return Object(r["a"])(e,"yyyy-MM-dd hh:mm")}},methods:{tableRowClassName:function(t){t.row;var e=t.rowIndex;return 1===this.tableData[e].statu?"warning-row":""},handleSizeChange:function(t){console.log(t)},handleCurrentChange:function(t){console.log(t),this.getBusAccountInfoList()},getBusAccountInfoList:function(){var t=this;Object(a["k"])(this.account,this.beginTime,this.endTime,this.pageSize,this.currentPage).then(function(e){console.log(e),t.tableData=e.data,t.dataSize=e.size})},getResignAppLists:function(t){var e=this;Object(a["getResignAppLists"])(t).then(function(t){console.log(t),e.cerResignAppData=t,e.appListFormVisible=!0})},getUseabelBusAccountInfoList:function(){var t=this;Object(a["u"])().then(function(e){console.log(e),t.useableTableData=e})},searchAppInfo:function(){this.value2.length>0&&(this.beginTime=this.value2[0],this.endTime=this.value2[1]),this.getBusAccountInfoList()},getAllAppInfo:function(){this.value2="",this.beginTime="",this.endTime="",this.account="",this.currentPage=1,this.getBusAccountInfoList()},openResignDiag:function(t){this.currentId=t,this.resignFormVisible=!0},resignIpaList:function(){var t=this;null!=this.currentRow?(this.resignIpaLoading=!0,Object(a["w"])(this.currentId,this.currentRow.id).then(function(e){t.getAllAppInfo(),t.resignIpaLoading=!1,t.resignFormVisible=!1,t.$notify({title:"成功",message:"重签名操作处理完成",type:"success"})})):this.$notify({title:"提示",message:"请先选择一个证书",type:"info"})},selectCer:function(t){console.log(t),this.currentRow=t},handleFrozen:function(t,e,n,i,o){var r=this;this.$confirm("此操作将"+i+"账号："+n+", 是否继续?   账号冻结后，新应用重签将会挂到其他可用账号下，请谨慎操作","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var u=s["Loading"].service({fullscreen:!0});Object(a["B"])(e,o).then(function(e){u.close(),r.tableData[t].statu=o,r.$notify({title:"成功",message:i+"账号"+n+"成功",type:"success"})})}).catch(function(){load.close(),r.$notify({title:"提示",message:"用户取消操作",type:"info"})})},changeBusAccountTip:function(t,e,n){var i=this;this.$prompt("本次操作将修改账号"+n+"的备注!","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(o){var r=o.value;Object(a["C"])(e,r).then(function(e){i.tableData[t].tip=r,i.$notify({title:"成功",message:"修改账号"+n+"的备注成功",type:"success"})}).catch(function(){i.$notify({title:"提示",message:"用户取消操作",type:"info"})})})},addBusAccount:function(){var t=this;if(console.log(this.busAccountForm.tip),""!=this.busAccountForm.tip&&""!=this.busAccountForm.p12Password)if(""!=this.busAccountForm.p12FilePath&&""!=this.busAccountForm.mobileProvisionFilePath){var e=s["Loading"].service({fullscreen:!0});Object(a["b"])(this.busAccountForm.p12FilePath,this.busAccountForm.mobileProvisionFilePath,this.busAccountForm.tip,this.busAccountForm.p12Password).then(function(n){e.close(),t.dialogFormVisible=!1,t.getBusAccountInfoList(),t.$notify({title:"成功",message:"新增企业账号成功",type:"success"})}).catch(function(){e.close(),t.$notify({title:"提示",message:"用户取消操作",type:"info"})})}else this.$notify({title:"提示",message:"请上传对应文件，2个文件都是必传项",type:"warning"});else this.$notify({title:"提示",message:"请将信息填写完成，备注和p12密码都是必填项",type:"warning"})},p12UploadSuccess:function(t,e){this.busAccountForm.p12FilePath=t.data},mobileprovisionUploadSuccess:function(t,e){this.busAccountForm.mobileProvisionFilePath=t.data},beforeUpload:function(t){var e=t.name.substring(t.name.lastIndexOf(".")+1),n="p12"===e,i="mobileprovision"===e,o=t.size/1024/1024<20;return n||i||this.$message({message:"上传文件只能是 p12、mobileprovision格式!",type:"warning"}),o||this.$message({message:"上传文件大小不能超过 20MB!",type:"warning"}),n||i&&o}},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},value2:"",appName:"",account:"",dataSize:0,currentPage:1,pageSize:10,tableData:[],useableTableData:[],cerResignAppData:[],beginTime:"",endTime:"",currentRow:null,currentId:"",dialogFormVisible:!1,resignFormVisible:!1,appListFormVisible:!1,resignIpaLoading:!1,formLabelWidth:"120px",busAccountForm:{tip:"",p12FilePath:"",p12Password:"",mobileProvisionFilePath:""}}}},c=u,l=(n("9720"),n("2877")),d=function(t){t.options.__source="src/views/businessSignature/businessAccount.vue"},p=d,f=Object(l["a"])(c,i,o,!1,null,null,null);"function"===typeof p&&p(f);e["default"]=f.exports},"93cd":function(t,e,n){"use strict";n.d(e,"q",function(){return o}),n.d(e,"n",function(){return a}),n.d(e,"h",function(){return r}),n.d(e,"m",function(){return s}),n.d(e,"s",function(){return u}),n.d(e,"v",function(){return c}),n.d(e,"J",function(){return l}),n.d(e,"I",function(){return d}),n.d(e,"H",function(){return p}),n.d(e,"o",function(){return f}),n.d(e,"i",function(){return m}),n.d(e,"g",function(){return g}),n.d(e,"y",function(){return b}),n.d(e,"x",function(){return h}),n.d(e,"l",function(){return v}),n.d(e,"u",function(){return w}),n.d(e,"D",function(){return A}),n.d(e,"t",function(){return _}),n.d(e,"G",function(){return y}),n.d(e,"j",function(){return I}),n.d(e,"A",function(){return F}),n.d(e,"z",function(){return O}),n.d(e,"k",function(){return j}),n.d(e,"B",function(){return x}),n.d(e,"C",function(){return T}),n.d(e,"b",function(){return k}),n.d(e,"E",function(){return S}),n.d(e,"F",function(){return L}),n.d(e,"r",function(){return C}),n.d(e,"a",function(){return D}),n.d(e,"f",function(){return z}),n.d(e,"e",function(){return P}),n.d(e,"c",function(){return B}),n.d(e,"d",function(){return $}),n.d(e,"w",function(){return R});var i=n("9bd2");function o(){return Object(i["a"])({url:"/getSurplusUDID",method:"get"})}function a(){return Object(i["a"])({url:"/getExpiredAppCount",method:"get"})}function r(){return Object(i["a"])({url:"/getAppCount",method:"get"})}function s(){return Object(i["a"])({url:"/getDownloadSizeToday",method:"get"})}function u(){return Object(i["a"])({url:"/getSysInfo",method:"get"})}function c(t,e,n,o,a){return Object(i["a"])({url:"/getUserInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a}})}function l(t,e){return Object(i["a"])({url:"/changeAccountStatu",method:"post",data:{id:t,statu:e}})}function d(t,e){return Object(i["a"])({url:"/changeUserMaxUdid",method:"post",data:{id:t,udid:e}})}function p(t,e){return Object(i["a"])({url:"/changeUserAmount",method:"post",data:{id:t,amount:e}})}function f(t,e,n,o,a){return Object(i["a"])({url:"/getRechargeInfo",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a}})}function m(t,e,n,o,a,r){return Object(i["a"])({url:"/getAppInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a,appName:r}})}function g(t,e,n,o,a,r){return Object(i["a"])({url:"/getApkInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a,appName:r}})}function b(t,e){return Object(i["a"])({url:"/setAppStatuAdmin",method:"post",data:{id:t,statu:e}})}function h(t,e){return Object(i["a"])({url:"/setApkStatuAdmin",method:"post",data:{id:t,statu:e}})}function v(t,e,n,o,a,r){return Object(i["a"])({url:"/getBusAppInfoListAdmin",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a,appName:r}})}function w(){return Object(i["a"])({url:"/getUsableBusAccountInfoList",method:"get",params:{}})}function A(t,e){return Object(i["a"])({url:"/setBusAppExpiredTime",method:"post",data:{id:t,time:e}})}function _(t,e,n,o,a,r){return Object(i["a"])({url:"/getUDIDInfoListAdmin",method:"get",params:{udid:t,beginTime:e,endTime:n,size:o,num:a,appleId:r}})}function y(t,e){return Object(i["a"])({url:"/changeUDIDStatuAdmin",method:"post",data:{id:t,statu:e}})}function I(t,e,n,o,a){return Object(i["a"])({url:"/getAppIdInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a}})}function F(t,e){return Object(i["a"])({url:"/setAppIdStatu",method:"post",data:{id:t,statu:e}})}function O(t){return Object(i["a"])({url:"/setAppIdErrorStatu",method:"post",data:{id:t}})}function j(t,e,n,o,a){return Object(i["a"])({url:"/getBusAccountInfoList",method:"get",params:{account:t,beginTime:e,endTime:n,size:o,num:a}})}function x(t,e){return Object(i["a"])({url:"/changeBusAccountStatu",method:"post",data:{id:t,statu:e}})}function T(t,e){return Object(i["a"])({url:"/changeBusAccountTip",method:"post",data:{id:t,tip:e}})}function k(t,e,n,o){return Object(i["a"])({url:"/addBusAccount",method:"post",data:{p12Path:t,mpPath:e,tip:n,password:o}})}function S(t,e,n,o,a){return Object(i["a"])({url:"/updateSysCoinConfig",method:"post",data:{coin_name:t,coin_to_udid:e,coin_to_resign:n,coin_to_update:o,coin_to_dcount:a}})}function L(t,e,n){return Object(i["a"])({url:"/updateSysUsConfig",method:"post",data:{kf_qq_info:t,kf_weixin_info:e,kf_phone_info:n}})}function C(){return Object(i["a"])({url:"/getSysConfig",method:"get"})}function D(t,e,n,o){return Object(i["a"])({url:"/registerAppId",method:"post",data:{account:t,pwd:e,tip:n,code:o}})}function z(t){return Object(i["a"])({url:"/delUserInfo",method:"post",data:{id:t}})}function P(t){return Object(i["a"])({url:"/delAppInfo",method:"post",data:{id:t}})}function B(t){return Object(i["a"])({url:"/delApkInfo",method:"post",data:{id:t}})}function $(t){return Object(i["a"])({url:"/delAppIdInfo",method:"post",data:{id:t}})}function R(t,e){return Object(i["a"])({url:"/resignIpaList",method:"post",data:{id:t,cer_id:e}})}},9720:function(t,e,n){"use strict";var i=n("a671"),o=n.n(i);o.a},a671:function(t,e,n){},e66c:function(t,e,n){"use strict";n.d(e,"a",function(){return i});n("3b2b"),n("a481");function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("(".concat(i,")")).test(e)){var a=n[i]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?a:o(a))}return e}function o(t){return("00"+t).substr(t.length)}}}]);
//# sourceMappingURL=chunk-abc64f38.9352e59f.js.map