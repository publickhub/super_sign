(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11e08700"],{"604a":function(t,e,a){},bb47:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("d2-container",[a("template",{slot:"header"},[t._v("超级签应用管理")]),a("el-input",{staticStyle:{width:"25em","margin-left":"20px"},attrs:{type:"text",placeholder:"请输入app包关键词","prefix-icon":"el-icon-search",maxlength:"10","show-word-limit":""},model:{value:t.appName,callback:function(e){t.appName=e},expression:"appName"}}),a("el-date-picker",{staticStyle:{"margin-left":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions,"value-format":"timestamp"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchAppInfo}},[t._v("搜索")]),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"success"},on:{click:t.getAllAppInfo}},[t._v("全部")]),a("el-button",{attrs:{type:"primary"},on:{click:t.uploadApp}},[t._v("\n    上传APP\n    "),a("i",{staticClass:"el-icon-upload el-icon--right"})]),a("el-button",{attrs:{type:"warning"},on:{click:function(e){return t.buyudid()}}},[t._v("\n    购买设备\n    "),a("i",{staticClass:"el-icon-goods el-icon--right"})]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.buyCoinFormVisible=!0}}},[t._v("\n    购买"+t._s(this.sysconfig.coin_name)+"\n    "),a("i",{staticClass:"el-icon-goods el-icon--right"})]),a("br"),[a("el-tag",{staticStyle:{"margin-left":"20px","margin-top":"40px"}},[t._v("当前可用设备数:"+t._s(this.userInfo.udid_count))]),a("el-tag",{staticStyle:{"margin-left":"20px","margin-top":"40px"}},[t._v("当前已用设备数:"+t._s(this.udidList.length))]),a("el-tag",{staticStyle:{"margin-left":"20px","margin-top":"40px"}},[t._v("当前可用"+t._s(this.sysconfig.coin_name)+":"+t._s(this.userInfo.coin))])],[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.appInfoData,"row-class-name":t.tableRowClassName}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center","show-overflow-tooltip":"",width:"50px"}}),a("el-table-column",{attrs:{prop:"id",label:"二维码",width:"160"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("vue-qr",{attrs:{text:"http://www.n4n00.com/sr"+t.row.Hashids,margin:0,logoMargin:1,backgroundColor:"transparent",colorLight:"transparent",logoSrc:t.row.icon_base64,logoScale:.3,size:150,dotScale:1,correctLevel:3}})]}}])}),a("el-table-column",{attrs:{prop:"app_name",label:"app名称"}}),a("el-table-column",{attrs:{prop:"bundle_id",label:"bundleId"}}),a("el-table-column",{attrs:{prop:"tip",label:"备注"}}),a("el-table-column",{attrs:{prop:"max_udid",label:"最大可用设备数"}}),a("el-table-column",{attrs:{prop:"udid_inuse",label:"已用设备数"}}),a("el-table-column",{attrs:{prop:"udid_inuse",label:"下载链接",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("http://www.n4n00.com/sr"+t._s(e.row.Hashids))]}}])}),a("el-table-column",{attrs:{prop:"admin_check",label:"超管状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(1==e.row.admin_check?"可用":"锁定"))]}}])},[a("template",{slot:"header"},[a("el-tooltip",{attrs:{content:"状态如提示锁定，请联系超管解锁。",placement:"top"}},[a("span",[t._v("\n              超管状态\n              "),a("i",{staticClass:"el-icon-question",staticStyle:{"margin-left":"5px"}})])])],1)],2),a("el-table-column",{attrs:{prop:"admin_check",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(1==e.row.statu?"可用":"冻结"))]}}])}),a("el-table-column",{attrs:{prop:"creater_time",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"el-icon-time"}),a("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.creater_time)))])]}}])}),a("el-table-column",{attrs:{prop:"creater_time",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"el-icon-time"}),a("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.update_time)))])]}}])}),a("el-table-column",{attrs:{label:"操作",width:"50",type:"expand",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:1==e.row.statu?"danger":"success",plain:""},on:{click:function(a){return t.handleFrozen(e.$index,e.row.id,e.row.app_name,1==e.row.statu?"冻结":"启用",1==e.row.statu?0:1)}}},[t._v(t._s(1==e.row.statu?"冻结应用":"启用应用"))]),a("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(a){return t.changeUDIDNum(e.$index,e.row.id,e.row.app_name)}}},[t._v("修改应用设备数")]),a("el-button",{attrs:{size:"mini",type:"success",plain:""},on:{click:function(a){return t.changetip(e.$index,e.row.id,e.row.app_name)}}},[t._v("修改备注")]),a("el-button",{attrs:{size:"mini",type:"info",plain:""},on:{click:function(a){return t.updateApp(e.row.id,e.row.app_name)}}},[t._v("更新APP")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){return t.openDownloadRecordDiaLog(e.row.id)}}},[t._v("下载记录")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){return t.changeAppShortLink(e.row.id,e.row.app_name,e.row.Hashids,e.$index)}}},[t._v("修改短链")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){return t.openEditAppInfo(e.row.id,e.row)}}},[t._v("编辑说明")])]}}])})],1)],a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.dataSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}}),a("el-dialog",{attrs:{title:"编辑app信息",visible:t.eidtAppInfoFormVisible,width:"600px","close-on-click-modal:false":"","destroy-on-close:true":""},on:{"update:visible":function(e){t.eidtAppInfoFormVisible=e}}},[a("el-form",{attrs:{model:t.saveAppData}},[a("el-form-item",{attrs:{label:"app轮播图:","label-width":t.formLabelWidth}},[a("el-upload",{ref:"imgupload",staticClass:"uploadImg",attrs:{action:"https://www.n4n00.com/appservice/uploadAppImage","file-list":t.bannerFileList,beforeUpload:t.beforeUploadImage,"on-change":t.handleChange,"on-remove":t.handleRemove,"list-type":"picture-card",limit:5}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb.推荐尺寸 (1920*1080)")])],1)],1),a("el-form-item",{attrs:{"label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入app描述"},model:{value:t.appInfoText,callback:function(e){t.appInfoText=e},expression:"appInfoText"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.eidtAppInfoFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.saveAppInfo()}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:t.saveAppData.title,visible:t.appFormVisible,width:"600px","close-on-click-modal:false":"","destroy-on-close:true":""},on:{"update:visible":function(e){t.appFormVisible=e}}},[a("el-form",{attrs:{model:t.saveAppData}},[a("el-form-item",{attrs:{label:"ipa文件:","label-width":t.formLabelWidth}},[a("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"https://www.n4n00.com/appservice/uploadApp",limit:1,"on-success":t.ipaUploadSuccess,beforeUpload:t.beforeUpload,width:t.formLabelWidth,"file-list":t.fileList}},[a("i",{staticClass:"el-icon-upload",attrs:{width:t.formLabelWidth}}),a("div",{staticClass:"el-upload__text"},[t._v("\n            将文件拖到此处，或\n            "),a("em",[t._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传ipa文件")])])],1),a("el-form-item",{attrs:{"label-width":t.formLabelWidth}},[a("div",[t._v("\n          1:请上传原版APP\n          "),a("br"),t._v("2:请确保APP可用\n        ")])])],1)],1),a("el-dialog",{attrs:{title:"保存APP",visible:t.appDataFormVisible,width:"600px","close-on-click-modal:false":""},on:{"update:visible":function(e){t.appDataFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.uploadAppData,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"app图标"}},[a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.uploadAppData.icon_base64}})],1),a("el-form-item",{attrs:{label:"app名称"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.uploadAppData.app_name,callback:function(e){t.$set(t.uploadAppData,"app_name",e)},expression:"uploadAppData.app_name"}})],1),a("el-form-item",{attrs:{label:"bundle id"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.uploadAppData.bundle_id,callback:function(e){t.$set(t.uploadAppData,"bundle_id",e)},expression:"uploadAppData.bundle_id"}})],1),a("el-form-item",{attrs:{label:"支持版本"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.uploadAppData.minimun_OS,callback:function(e){t.$set(t.uploadAppData,"minimun_OS",e)},expression:"uploadAppData.minimun_OS"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{model:{value:t.uploadAppData.tip,callback:function(e){t.$set(t.uploadAppData,"tip",e)},expression:"uploadAppData.tip"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.appDataFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary",loading:t.saveIpaInfoLoad},on:{click:t.saveIpaInfo}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"购买可用设备数",visible:t.buyUDIDFormVisible},on:{"update:visible":function(e){t.buyUDIDFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.uploadAppData,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"当前可用设备数"}},[a("el-input",{attrs:{disabled:!0},model:{value:this.userInfo.udid_count,callback:function(e){t.$set(this.userInfo,"udid_count",e)},expression:"this.userInfo.udid_count"}})],1),a("el-form-item",{attrs:{label:"可用余额"}},[a("el-input",{attrs:{disabled:!0},model:{value:this.userInfo.coin,callback:function(e){t.$set(this.userInfo,"coin",e)},expression:"this.userInfo.coin"}})],1),a("el-form-item",{attrs:{label:"设备单价"}},[a("el-input",{attrs:{disabled:!0},model:{value:this.sysconfig.coin_to_udid,callback:function(e){t.$set(this.sysconfig,"coin_to_udid",e)},expression:"this.sysconfig.coin_to_udid"}})],1),a("el-form-item",{attrs:{label:"选择购买数量"}},[a("el-input-number",{attrs:{min:0,max:t.maxCount,label:"购买设备数"},on:{change:t.udidSelectChange},model:{value:t.selectUdidNum,callback:function(e){t.selectUdidNum=e},expression:"selectUdidNum"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.buyUDIDFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary",loading:t.saveIpaInfoLoad},on:{click:function(e){return t.submitBuyData()}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"下载记录",visible:t.downloadFormVisible},on:{"update:visible":function(e){t.downloadFormVisible=e}}},[a("el-table",{attrs:{data:t.downloadRecord}},[a("el-table-column",{attrs:{property:"id",label:"#",width:"50"}}),a("el-table-column",{attrs:{property:"udid_name",label:"设备标识",width:"200"}}),a("el-table-column",{attrs:{property:"creater_time",label:"下载时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"el-icon-time"}),a("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(t._f("formatDate")(e.row.creater_time)))])]}}])}),a("el-table-column",{attrs:{property:"download_ip",label:"下载IP"}})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-pagination",{attrs:{"current-page":t.currentPage_download,"page-size":t.pageSize,layout:"total, prev, pager, next",total:this.dataSize_download},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange_download,"update:currentPage":function(e){t.currentPage_download=e},"update:current-page":function(e){t.currentPage_download=e}}})],1)],1),a("el-dialog",{attrs:{title:this.appShortLinkdata.appleName,visible:t.appShortLinkVisible},on:{"update:visible":function(e){t.appShortLinkVisible=e}}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.appShortLinkdata.linkName,callback:function(e){t.$set(t.appShortLinkdata,"linkName",e)},expression:"appShortLinkdata.linkName "}},[a("template",{slot:"prepend"},[t._v("Https://www.n4n00.com/sr")])],2),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.appShortLinkVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary",loading:t.saveIpaInfoLoad},on:{click:function(e){return t.submitAppShortLink()}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"下载记录",visible:t.buyCoinFormVisible},on:{"update:visible":function(e){t.buyCoinFormVisible=e}}},[t._v("\n    很抱歉，当前暂未开通在线支付。\n    "),a("br"),t._v("\n    请联系超管购买"+t._s(this.sysconfig.coin_name)+"\n    "),a("br"),a("br"),t._v("\n    qq:"+t._s(this.sysconfig.kf_qq_info)+"\n    "),a("br"),t._v("\n    微信:"+t._s(this.sysconfig.kf_weixin_info)+"\n    "),a("br"),t._v("\n    电话:"+t._s(this.sysconfig.kf_phone_info)+"\n    "),a("br")])],2)},n=[],o=a("bd86"),s=(a("7f7f"),a("93cd")),l=a("658f"),p=a.n(l),r=a("e66c"),c={created:function(){this.getAppInfoList(),this.getSysConfig(),this.getUserInfo(),this.getUserUDIDList()},filters:{formatDate:function(t){var e=new Date(parseInt(t));return Object(r["a"])(e,"yyyy-MM-dd hh:mm")}},components:{VueQr:p.a},methods:{tableRowClassName:function(t){t.row;var e=t.rowIndex;return 0==this.appInfoData[e].statu?"warning-row":""},udidSelectChange:function(t){console.log(t)},handleSizeChange:function(t){console.log(t)},handleCurrentChange:function(t){console.log(t),this.getAppInfoList()},handleCurrentChange_download:function(t){console.log(t),this.getAppDownloadRecord()},getAppInfoList:function(){var t=this;Object(s["d"])(this.beginTime,this.endTime,this.pageSize,this.currentPage,this.appName,2).then(function(e){t.appInfoData=e.data,t.dataSize=e.size})},getUserUDIDList:function(){var t=this;Object(s["o"])().then(function(e){t.udidList=e}).catch(function(){t.$notify({title:"失败",message:"读取UDID列表失败",type:"error"})})},buyudid:function(){this.buyUDIDFormVisible=!0,this.maxCount=parseInt(this.userInfo.coin/this.sysconfig.coin_to_udid)},submitBuyData:function(){var t=this;this.saveIpaInfoLoad=!0,Object(s["a"])(this.selectUdidNum).then(function(e){t.saveIpaInfoLoad=!1,t.buyUDIDFormVisible=!1,t.selectUdidNum=0,t.getUserInfo(),t.$notify({title:"成功",message:"UDID购买成功，实时生效",type:"success"})}).catch(function(){t.saveIpaInfoLoad=!1,t.buyUDIDFormVisible=!1})},searchAppInfo:function(){this.value2.length>0&&(this.beginTime=this.value2[0],this.endTime=this.value2[1]),this.getAppInfoList()},changeAppShortLink:function(t,e,a,i){this.appShortLinkdata.id=t,this.appShortLinkdata.appleName="修改应用《"+e+"》短链",this.appShortLinkdata.linkName=a,this.appShortLinkdata.index=i,this.appShortLinkVisible=!0},submitAppShortLink:function(){var t=this;this.appShortLinkdata.linkName.length<6||this.appShortLinkdata.linkName.length>10?this.$notify({title:"失败",message:"短链接长度必须在6-10位之间",type:"error"}):Object(s["s"])(this.appShortLinkdata.id,this.appShortLinkdata.linkName).then(function(e){t.appInfoData[t.appShortLinkdata.index].Hashids=t.appShortLinkdata.linkName,t.appShortLinkdata.linkName="",t.appShortLinkdata.id="",t.appShortLinkdata.appleName="",t.appShortLinkVisible=!1,appShortLinkdata.index="",t.$notify({title:"成功",message:"修改应用"+appleName+"最大可用设备数成功",type:"success"})})},openEditAppInfo:function(t,e){this.appInfoCurrentId=t,this.eidtAppInfoFormVisible=!0,this.appInfoText=e.introduce,null==e.introduce_image||""==e.introduce_image?this.bannerFileList=[]:this.bannerFileList=JSON.parse(e.introduce_image),console.log(this.bannerFileList)},saveAppInfo:function(){for(var t=this,e=0;e<this.bannerFileList.length;e++){var a=this.bannerFileList[e];if(a.hasOwnProperty("response")){var i={name:a.name,url:a.response.data,uid:a.uid,status:a.status};this.bannerFileList[e]=i}}Object(s["D"])(this.appInfoCurrentId,this.appInfoText,this.bannerFileList).then(function(e){t.eidtAppInfoFormVisible=!1,t.getAllAppInfo(),t.bannerFileList=[],t.$notify({title:"成功",message:"编辑成功",type:"success"})})},getAllAppInfo:function(){this.value2="",this.beginTime="",this.endTime="",this.account="",this.appName="",this.currentPage=1,this.getAppInfoList()},changeUDIDNum:function(t,e,a){var i=this;this.$prompt("本次操作将修改应用"+a+"的最大可用设备数，请谨慎操作!","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[0-9]+$/,inputErrorMessage:"请输入正整数"}).then(function(n){var o=n.value;Object(s["z"])(e,o).then(function(e){i.appInfoData[t].max_udid=o,i.$notify({title:"成功",message:"修改应用"+a+"最大可用设备数成功",type:"success"})}).catch(function(){i.$notify({title:"提示",message:"用户取消操作",type:"info"})})})},changetip:function(t,e,a){var i=this;this.$prompt("本次操作将修改应用"+a+"的备注","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(n){var o=n.value;o.length<1||Object(s["C"])(e,o).then(function(e){i.appInfoData[t].tip=o,i.$notify({title:"成功",message:"修改应用"+a+"备注成功",type:"success"})}).catch(function(){i.$notify({title:"提示",message:"用户取消操作",type:"info"})})})},handleFrozen:function(t,e,a,i,n){var o=this;this.$confirm("此操作将"+i+"应用"+a+", 是否继续?冻结后，用户将无法下载","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s["B"])(e,n).then(function(e){o.appInfoData[t].statu=n,o.$notify({title:"成功",message:i+"应用"+a+"成功",type:"success"})})}).catch(function(){o.$notify({title:"提示",message:"用户取消操作",type:"info"})})},beforeUpload:function(t){var e=t.name.substring(t.name.lastIndexOf(".")+1),a="ipa"===e,i=t.size/1024/1024<200;return a?i?void 0:(this.$message({message:"上传文件大小不能超过 200MB!",type:"warning"}),!1):(this.$message({message:"上传文件只能是ipa格式!",type:"warning"}),!1)},beforeUploadImage:function(t){var e=t.size/1024/1024<1;if(!e)return this.$message({message:"上传文件大小不能超过 1M!",type:"warning"}),!1},handleChange:function(t,e){this.bannerFileList=e.slice(-3),console.log(this.bannerFileList)},handleRemove:function(t,e){this.removeArray(this.bannerFileList,t),console.log(this.bannerFileList)},ipaUploadSuccess:function(t,e){this.uploadAppData=t.data,this.saveAppData.tmpId=t.data.id,this.appDataFormVisible=!0,this.appFormVisible=!1,this.fileList=[]},saveIpaInfo:function(){var t=this;this.saveIpaInfoLoad=!0,Object(s["w"])(this.saveAppData.appId,this.uploadAppData.tip,this.saveAppData.actionType,this.saveAppData.tmpId).then(function(e){t.saveIpaInfoLoad=!1,t.appDataFormVisible=!1,t.uploadAppData={},t.getAppInfoList(),t.$notify({title:"成功",message:"应用保存成功",type:"success"})}).catch(function(){t.saveIpaInfoLoad=!1,t.appDataFormVisible=!1,t.uploadAppData={},t.getAppInfoList()})},uploadApp:function(){this.saveAppData.title="上传APP",this.saveAppData.actionType=2,this.appFormVisible=!0},updateApp:function(t,e){this.saveAppData.title="更新APP ->"+e,this.saveAppData.actionType=1,this.saveAppData.appId=t,this.appFormVisible=!0},getSysConfig:function(){var t=this;Object(s["k"])().then(function(e){t.sysconfig=e}).catch(function(){t.$notify({title:"失败",message:"读取系统配置失败，请重试",type:"error"})})},getUserInfo:function(){var t=this;Object(s["m"])().then(function(e){t.userInfo=e}).catch(function(){t.$notify({title:"失败",message:"读取用户信息失败，请重试",type:"error"})})},openDownloadRecordDiaLog:function(t){this.downloadRecord_appId=t,this.downloadFormVisible=!0,this.currentPage_download=1,this.getAppDownloadRecord()},getAppDownloadRecord:function(){var t=this;Object(s["h"])(this.downloadRecord_appId,this.pageSize,this.currentPage_download).then(function(e){t.downloadRecord=e.data,t.dataSize_download=e.size}).catch(function(){t.$notify({title:"失败",message:"读取下载记录失败，请重试",type:"error"})})},removeArray:function(t,e){for(var a=t.length,i=0;i<a;i++)if(t[i]===e)return 0===i?(t.shift(),t):i===a-1?(t.pop(),t):(t.splice(i,1),t);console.log(";;;;;;--- rrrr"+t)}},data:function(){var t;return t={pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},value2:"",appName:"",account:"",dataSize:0,currentPage:1,currentPage_download:1,dataSize_download:0,pageSize:10,appInfoData:[]},Object(o["a"])(t,"appName",""),Object(o["a"])(t,"beginTime",""),Object(o["a"])(t,"endTime",""),Object(o["a"])(t,"formLabelWidth","120px"),Object(o["a"])(t,"appFormVisible",!1),Object(o["a"])(t,"appDataFormVisible",!1),Object(o["a"])(t,"downloadFormVisible",!1),Object(o["a"])(t,"buyUDIDFormVisible",!1),Object(o["a"])(t,"buyCoinFormVisible",!1),Object(o["a"])(t,"appShortLinkVisible",!1),Object(o["a"])(t,"selectUdidNum",0),Object(o["a"])(t,"eidtAppInfoFormVisible",!1),Object(o["a"])(t,"bannerFileList",[]),Object(o["a"])(t,"appInfoText",""),Object(o["a"])(t,"saveAppData",{tip:"",ipaFilePath:"",actionType:"",title:"上传APP",tmpId:"",appId:""}),Object(o["a"])(t,"uploadAppData",{}),Object(o["a"])(t,"saveIpaInfoLoad",!1),Object(o["a"])(t,"fileList",[]),Object(o["a"])(t,"sysconfig",{}),Object(o["a"])(t,"userInfo",{}),Object(o["a"])(t,"downloadRecord",[]),Object(o["a"])(t,"downloadRecord_appId",""),Object(o["a"])(t,"maxCount",""),Object(o["a"])(t,"udidList",[]),Object(o["a"])(t,"appShortLinkdata",{id:"",appleName:"",linkName:"",index:""}),t}},u=c,d=(a("db6e"),a("2877")),f=function(t){t.options.__source="src/views/superResign/appInfo/index.vue"},m=f,h=Object(d["a"])(u,i,n,!1,null,null,null);"function"===typeof m&&m(h);e["default"]=h.exports},db6e:function(t,e,a){"use strict";var i=a("604a"),n=a.n(i);n.a}}]);
//# sourceMappingURL=chunk-11e08700.f17f3740.js.map