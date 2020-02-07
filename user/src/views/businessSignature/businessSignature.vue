<template>
  <d2-container>
    <template slot="header">超级签应用管理</template>
    <!--- 页头 --->
    <el-input
      type="text"
      placeholder="请输入app包关键词"
      prefix-icon="el-icon-search"
      v-model="appName"
      maxlength="10"
      show-word-limit
      style="width:25em;margin-left:20px;"
    ></el-input>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      style="margin-left:20px;"
      value-format="timestamp"
    ></el-date-picker>
    <el-button
      type="primary"
      icon="el-icon-search"
      @click="searchAppInfo"
      style="margin-left:20px"
    >搜索</el-button>
    <el-button type="success" @click="getAllAppInfo" style="margin-left:20px">全部</el-button>
    <el-button type="primary" @click="uploadApp">
      上传APP
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <el-button type="warning" @click="buyCoinFormVisible=true">
      购买{{this.sysconfig.coin_name}}
      <i class="el-icon-goods el-icon--right"></i>
    </el-button>
    <el-tag style="margin-left:20px">当前可用{{this.sysconfig.coin_name}}:{{this.userInfo.coin}}</el-tag>

    <template>
      <!--- app列表 --->

      <el-table :data="appInfoData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px"></el-table-column>

        <el-table-column prop="id" label="app图标" width="100">
          <template slot-scope="scope">
            <div class="block">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.icon_base64"
                :preview-src-list="[scope.row.icon_base64]"
              ></el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="app_name" label="app名称"></el-table-column>
        <el-table-column prop="bundle_id" label="bundleId"></el-table-column>
        <el-table-column prop="tip" label="备注"></el-table-column>
        <el-table-column prop="admin_check" label="超管状态">
          <template slot="header">
            <el-tooltip content="状态如提示锁定，请联系超管解锁。" placement="top">
              <span>
                超管状态
                <i class="el-icon-question" style="margin-left: 5px;"></i>
              </span>
            </el-tooltip>
          </template>
          <template slot-scope="scope">{{ scope.row.admin_check == 1 ? '可用' : '锁定' }}</template>
        </el-table-column>

        <el-table-column prop="admin_check" label="状态">
          <template slot-scope="scope">{{ scope.row.statu == 1 ? '可用' : '冻结' }}</template>
        </el-table-column>

        <el-table-column prop="creater_time" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.creater_time | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creater_time" label="更新时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.update_time | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ex_time" label="过期时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.ex_time | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="470">
          <template slot-scope="scope">
            <el-button
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.app_name,scope.row.statu == 1 ?'冻结':'启用',scope.row.statu == 1 ?0:1)"
              size="mini"
              :type="scope.row.statu == 1 ?'danger':'success'"
              plain
            >{{scope.row.statu == 1 ?'冻结应用':'启用应用'}}</el-button>
            <el-button
              @click="changetip(scope.$index,scope.row.id,scope.row.app_name)"
              size="mini"
              type="success"
              plain
            >修改备注</el-button>
            <el-button
              @click="updateApp(scope.row.id,scope.row.app_name)"
              size="mini"
              type="info"
              plain
            >更新APP</el-button>
            <a target="_blank" :href="scope.row.ipa_path" style="padding:0 10px 0 10px">
              <el-button size="mini" type="primary" plain>下载</el-button>
            </a>
            <el-button
              @click="renewApp(scope.row.id,scope.row.app_name)"
              size="mini"
              type="warning"
              plain
            >续费</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--- 分页 --->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="dataSize"
    ></el-pagination>

    <!--- 上传表单 --->
    <el-dialog
      :title="saveAppData.title"
      :visible.sync="appFormVisible"
      width="600px"
      close-on-click-modal:false
      destroy-on-close:true
    >
      <el-form :model="saveAppData">
        <el-form-item label="ipa文件:" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
            action="https://www.n4n00.com/appservice/uploadApp"
            :limit="1"
            :on-success="ipaUploadSuccess"
            :beforeUpload="beforeUpload"
            :width="formLabelWidth"
            :file-list="fileList"
          >
            <i :width="formLabelWidth" class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传ipa文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <div>
            1:请上传原版APP
            <br />2:请确保APP可用
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--- 保存应用表单 --->
    <el-dialog
      title="保存APP"
      :visible.sync="appDataFormVisible"
      width="600px"
      close-on-click-modal:false
    >
      <el-form ref="form" :model="uploadAppData" label-width="80px">
        <el-form-item label="app图标">
          <el-image style="width: 100px; height: 100px" :src="uploadAppData.icon_base64"></el-image>
        </el-form-item>
        <el-form-item label="app名称">
          <el-input v-model="uploadAppData.app_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="bundle id">
          <el-input v-model="uploadAppData.bundle_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="支持版本">
          <el-input v-model="uploadAppData.minimun_OS" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="uploadAppData.tip"></el-input>
        </el-form-item>
        <el-form-item v-show="this.saveAppData.actionType == 1" label="更新应用单价">
          <el-input v-model="this.sysconfig.coin_to_update" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item v-show="this.saveAppData.actionType == 1" label="当前可用余额">
          <el-input v-model="this.userInfo.coin" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appDataFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveIpaInfo" :loading="saveIpaInfoLoad">确 定</el-button>
      </span>
    </el-dialog>

    <!--- 续费表单 --->
    <el-dialog :title="renewAppFormVisibleTitle" :visible.sync="renewAppFormVisible">
      <el-form ref="form" :model="uploadAppData" label-width="120px">
        <el-form-item label="可用余额">
          <el-input v-model="this.userInfo.coin" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="续费一个月单价">
          <el-input v-model="this.sysconfig.coin_to_resign" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="选择购买数量">
          <el-input-number
            v-model="selectUdidNum"
            @change="udidSelectChange"
            :min="0"
            :max="maxCount"
            label="购买udid"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renewAppFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBuyData()" :loading="saveIpaInfoLoad">确 定</el-button>
      </span>
    </el-dialog>
    <!--- 下载记录表单 --->
    <el-dialog title="下载记录" :visible.sync="downloadFormVisible">
      <el-table :data="downloadRecord">
        <el-table-column property="id" label="#" width="50"></el-table-column>
        <el-table-column property="udid_name" label="udid" width="200"></el-table-column>
        <el-table-column property="creater_time" label="下载时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.creater_time | formatDate}}</span>
          </template>
        </el-table-column>

        <el-table-column property="download_ip" label="下载IP"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange_download"
          :current-page.sync="currentPage_download"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="this.dataSize_download"
        ></el-pagination>
      </div>
    </el-dialog>

    <!--- 购买包币 --->
    <el-dialog title="下载记录" :visible.sync="buyCoinFormVisible">
      很抱歉，当前暂未开通在线支付。
      <br />
      请联系超管购买{{this.sysconfig.coin_name}}
      <br />
      <br />
      qq:{{this.sysconfig.kf_qq_info}}
      <br />
      微信:{{this.sysconfig.kf_weixin_info}}
      <br />
      电话:{{this.sysconfig.kf_phone_info}}
      <br />
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  getAppInfoList,
  updateAppStatuUser,
  updateAppMaxUdid,
  updateAppTip,
  updateAppInfo_bs,
  getUserInfoList,
  getUserInfo,
  getSysConfig,
  getDownLoadRecord,
  buyCoin,
  renewAppTime
} from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";

export default {
  created() {
    this.getAppInfoList();
    this.getSysConfig();
    this.getUserInfo();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.appInfoData[rowIndex].statu == 0) {
        return "warning-row";
      }
      return "";
    },
    udidSelectChange(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getAppInfoList();
    },
    handleCurrentChange_download(val) {
      console.log(val);
      this.getAppDownloadRecord();
    },
    //获得app列表
    getAppInfoList() {
      getAppInfoList(
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage,
        this.appName,
        1
      ).then(res => {
        this.appInfoData = res.data;
        this.dataSize = res.size;
      });
    },
    //续费
    renewApp(id, appname) {
      this.renewAppFormVisibleTitle = "续费应用 ->" + appname;
      this.renewAppFormVisible = true;
      this.renewAppId = id;
      this.maxCount = parseInt(
        this.userInfo.coin / this.sysconfig.coin_to_resign
      );
    },
    //提交购买
    submitBuyData() {
      this.saveIpaInfoLoad = true;
      renewAppTime(this.selectUdidNum, this.renewAppId)
        .then(res => {
          this.saveIpaInfoLoad = false;
          this.renewAppFormVisible = false;
          this.selectUdidNum = 0;
          this.renewAppId = "";
          this.getAppInfoList();
          this.getUserInfo();
          this.$notify({
            title: "成功",
            message: "应用续费成功，实时生效",
            type: "success"
          });
        })
        .catch(() => {
          this.saveIpaInfoLoad = false;
          this.buyUDIDFormVisible = false;
        });
    },
    //搜索
    searchAppInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getAppInfoList();
    },
    //读取app列表
    getAllAppInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.account = "";
      this.appName = "";
      this.currentPage = 1;

      this.getAppInfoList();
    },
    //修改APP可用udid数
    changeUDIDNum(index, id, appleName) {
      this.$prompt(
        "本次操作将修改应用" + appleName + "的最大可用UDID数，请谨慎操作!",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[0-9]+$/,
          inputErrorMessage: "请输入正整数"
        }
      ).then(({ value }) => {
        updateAppMaxUdid(id, value)
          .then(res => {
            this.appInfoData[index].max_udid = value;
            this.$notify({
              title: "成功",
              message: "修改应用" + appleName + "最大可用udid数成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify({
              title: "提示",
              message: "用户取消操作",
              type: "info"
            });
          });
      });
    },
    //修改备注
    changetip(index, id, appleName) {
      this.$prompt("本次操作将修改应用" + appleName + "的备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        if (value.length < 1) {
          return;
        }
        updateAppTip(id, value)
          .then(res => {
            this.appInfoData[index].tip = value;
            this.$notify({
              title: "成功",
              message: "修改应用" + appleName + "备注成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$notify({
              title: "提示",
              message: "用户取消操作",
              type: "info"
            });
          });
      });
    },
    //冻结APP
    handleFrozen(index, id, app_name, stausMsg, statu) {
      this.$confirm(
        "此操作将" +
          stausMsg +
          "应用" +
          app_name +
          ", 是否继续?冻结后，用户将无法下载",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          updateAppStatuUser(id, statu).then(res => {
            this.appInfoData[index].statu = statu;
            this.$notify({
              title: "成功",
              message: stausMsg + "应用" + app_name + "成功",
              type: "success"
            });
          });
        })
        .catch(() => {
          this.$notify({
            title: "提示",
            message: "用户取消操作",
            type: "info"
          });
        });
    },
    //文件上传相关方法
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "ipa";
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!extension) {
        this.$message({
          message: "上传文件只能是ipa格式!",
          type: "warning"
        });
        return false;
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 200MB!",
          type: "warning"
        });

        return false;
      }
    },
    ipaUploadSuccess(res, file) {
      this.uploadAppData = res.data;
      this.saveAppData.tmpId = res.data.id;
      this.appDataFormVisible = true;
      this.appFormVisible = false;
      this.fileList = [];
    },
    //保存APP
    saveIpaInfo() {
      //简单教研
      if(this.saveAppData.actionType == 1){
        if(this.userInfo.coin < this.sysconfig.coin_to_update){
           this.$notify({
            title: "失败",
            message: "余额不足以更新应用，请充值",
            type: "error"
          });
          return;
        }
      }

      this.saveIpaInfoLoad = true;

      updateAppInfo_bs(
        this.saveAppData.appId,
        this.uploadAppData.tip,
        this.saveAppData.actionType,
        this.saveAppData.tmpId
      )
        .then(res => {
          this.saveIpaInfoLoad = false;
          this.appDataFormVisible = false;

          this.uploadAppData = {};
          this.getAppInfoList();
          this.getUserInfo();

          this.$notify({
            title: "成功",
            message: "应用保存成功",
            type: "success"
          });
        })
        .catch(() => {
          this.saveIpaInfoLoad = false;
          this.appDataFormVisible = false;

          this.uploadAppData = {};
          this.getAppInfoList();
        });
    },
    //上传/更新 App
    uploadApp() {
      this.saveAppData.title = "上传APP";
      this.saveAppData.actionType = 2;
      this.appFormVisible = true;
    },
    updateApp(appId, appName) {
      this.saveAppData.title = "更新APP ->" + appName;
      this.saveAppData.actionType = 1;
      this.saveAppData.appId = appId;
      this.appFormVisible = true;
    },
    //读取系统配置
    getSysConfig() {
      getSysConfig()
        .then(res => {
          this.sysconfig = res;
        })
        .catch(() => {
          this.$notify({
            title: "失败",
            message: "读取系统配置失败，请重试",
            type: "error"
          });
        });
    },
    //读取用户数据
    getUserInfo() {
      getUserInfo()
        .then(res => {
          this.userInfo = res;
        })
        .catch(() => {
          this.$notify({
            title: "失败",
            message: "读取用户信息失败，请重试",
            type: "error"
          });
        });
    },
    //获得应用下载记录
    openDownloadRecordDiaLog(appId) {
      this.downloadRecord_appId = appId;
      this.downloadFormVisible = true;
      this.currentPage_download = 1;
      this.getAppDownloadRecord();
    },
    getAppDownloadRecord() {
      getDownLoadRecord(
        this.downloadRecord_appId,
        this.pageSize,
        this.currentPage_download
      )
        .then(res => {
          this.downloadRecord = res.data;
          this.dataSize_download = res.size;
        })
        .catch(() => {
          this.$notify({
            title: "失败",
            message: "读取下载记录失败，请重试",
            type: "error"
          });
        });
    },
    downloadFile(ipa_path) {
      this.window.location.href = ipa_path;
    }
  },
  data() {
    return {
      //时间选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      appName: "",
      account: "",
      dataSize: 0,
      currentPage: 1,
      currentPage_download: 1,
      dataSize_download: 0,
      pageSize: 10,
      appInfoData: [],
      appName: "",
      beginTime: "",
      endTime: "",
      formLabelWidth: "120px",
      appFormVisible: false,
      appDataFormVisible: false,
      downloadFormVisible: false,
      renewAppFormVisible: false,
      buyCoinFormVisible: false,
      selectUdidNum: 0,
      //保存APP表单
      saveAppData: {
        tip: "",
        ipaFilePath: "",
        actionType: "", //1:更新 2：新包
        title: "上传APP",
        tmpId: "",
        appId: ""
      },
      uploadAppData: {},
      saveIpaInfoLoad: false,
      fileList: [],
      //系统配置
      sysconfig: {},
      //用户数据
      userInfo: {},
      downloadRecord: [],
      downloadRecord_appId: "",
      maxCount: "",
      udidList: [],
      renewAppFormVisibleTitle: "",
      renewAppId: ""
    };
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table {
  margin-top: 20px;
}
</style>