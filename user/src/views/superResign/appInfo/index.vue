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
    <el-button
      type="success"
      @click="getAllAppInfo"
      style="margin-left:20px"
    >全部</el-button>
    <el-button
      type="primary"
      @click="uploadApp"
    >
      上传APP
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
    <el-button
      type="warning"
      @click="buyudid()"
    >
      购买设备
      <i class="el-icon-goods el-icon--right"></i>
    </el-button>
    <el-button
      type="primary"
      @click="buyCoinFormVisible=true"
    >
      购买{{this.sysconfig.coin_name}}
      <i class="el-icon-goods el-icon--right"></i>
    </el-button>
    <br />
    <template>
      <el-tag style="margin-left:20px;margin-top:40px;">当前可用设备数:{{this.userInfo.udid_count}}</el-tag>
      <el-tag style="margin-left:20px;margin-top:40px;">当前已用设备数:{{this.udidList.length}}</el-tag>
      <el-tag style="margin-left:20px;margin-top:40px;">当前可用{{this.sysconfig.coin_name}}:{{this.userInfo.coin}}</el-tag>
    </template>

    <template>
      <!--- app列表 --->

      <el-table
        :data="appInfoData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          show-overflow-tooltip
          width="50px"
        ></el-table-column>

        <el-table-column
          prop="id"
          label="二维码"
          width="160"
        >
          <template slot-scope="scope">
            <vue-qr
              :text='"http://www.n4n00.com/sr" + scope.row.Hashids'
              :margin="0"
              :logoMargin=1
              backgroundColor="transparent"
              colorLight="transparent"
              :logoSrc="scope.row.icon_base64"
              :logoScale="0.3"
              :size="150"
              :dotScale=1
              :correctLevel="3"
            ></vue-qr>
          </template>
        </el-table-column>

        <el-table-column
          prop="app_name"
          label="app名称"
        ></el-table-column>
        <el-table-column
          prop="bundle_id"
          label="bundleId"
        ></el-table-column>
        <el-table-column
          prop="tip"
          label="备注"
        ></el-table-column>
        <el-table-column
          prop="max_udid"
          label="最大可用设备数"
        ></el-table-column>
        <el-table-column
          prop="udid_inuse"
          label="已用设备数"
        ></el-table-column>
        <el-table-column
          prop="udid_inuse"
          label="下载链接"
          width="250"
        >
          <template slot-scope="scope">http://www.n4n00.com/sr{{scope.row.Hashids}}</template>
        </el-table-column>

        <el-table-column
          prop="admin_check"
          label="超管状态"
        >
          <template slot="header">
            <el-tooltip
              content="状态如提示锁定，请联系超管解锁。"
              placement="top"
            >
              <span>
                超管状态
                <i
                  class="el-icon-question"
                  style="margin-left: 5px;"
                ></i>
              </span>
            </el-tooltip>
          </template>
          <template slot-scope="scope">{{ scope.row.admin_check == 1 ? '可用' : '锁定' }}</template>
        </el-table-column>

        <el-table-column
          prop="admin_check"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.statu == 1 ? '可用' : '冻结' }}</template>
        </el-table-column>

        <el-table-column
          prop="creater_time"
          label="创建时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.creater_time | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="creater_time"
          label="更新时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.update_time | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="50"
          type="expand"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.app_name,scope.row.statu == 1 ?'冻结':'启用',scope.row.statu == 1 ?0:1)"
              size="mini"
              :type="scope.row.statu == 1 ?'danger':'success'"
              plain
            >{{scope.row.statu == 1 ?'冻结应用':'启用应用'}}</el-button>
            <el-button
              @click="changeUDIDNum(scope.$index,scope.row.id,scope.row.app_name)"
              size="mini"
              type="warning"
              plain
            >修改应用设备数</el-button>
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
            <el-button
              @click="openDownloadRecordDiaLog(scope.row.id)"
              size="mini"
              type="primary"
              plain
            >下载记录</el-button>
            <el-button
              @click="changeAppShortLink(scope.row.id,scope.row.app_name,scope.row.Hashids,scope.$index)"
              size="mini"
              type="primary"
              plain
            >修改短链</el-button>
            <el-button
              @click="openEditAppInfo(scope.row.id,scope.row)"
              size="mini"
              type="primary"
              plain
            >编辑说明</el-button>
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

    <!--- 编辑app信息 --->
    <el-dialog
      title="编辑app信息"
      :visible.sync="eidtAppInfoFormVisible"
      width="600px"
      close-on-click-modal:false
      destroy-on-close:true
    >
      <el-form :model="saveAppData">
        <el-form-item
          label="app轮播图:"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="uploadImg"
            action="https://www.n4n00.com/appservice/uploadAppImage"
            :file-list="bannerFileList"
            :beforeUpload="beforeUploadImage"
            :on-change="handleChange"
            :on-remove="handleRemove"
            list-type="picture-card"
            :limit=5
            ref="imgupload"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb.推荐尺寸 (1920*1080)</div>
          </el-upload>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入app描述"
            v-model="appInfoText"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="eidtAppInfoFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveAppInfo()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!--- 上传表单 --->
    <el-dialog
      :title="saveAppData.title"
      :visible.sync="appFormVisible"
      width="600px"
      close-on-click-modal:false
      destroy-on-close:true
    >
      <el-form :model="saveAppData">
        <el-form-item
          label="ipa文件:"
          :label-width="formLabelWidth"
        >
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
            <i
              :width="formLabelWidth"
              class="el-icon-upload"
            ></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div
              class="el-upload__tip"
              slot="tip"
            >只能上传ipa文件</div>
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
      <el-form
        ref="form"
        :model="uploadAppData"
        label-width="80px"
      >
        <el-form-item label="app图标">
          <el-image
            style="width: 100px; height: 100px"
            :src="uploadAppData.icon_base64"
          ></el-image>
        </el-form-item>
        <el-form-item label="app名称">
          <el-input
            v-model="uploadAppData.app_name"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="bundle id">
          <el-input
            v-model="uploadAppData.bundle_id"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="支持版本">
          <el-input
            v-model="uploadAppData.minimun_OS"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="uploadAppData.tip"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="appDataFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveIpaInfo"
          :loading="saveIpaInfoLoad"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!--- 购买UDID表单 --->
    <el-dialog
      title="购买可用设备数"
      :visible.sync="buyUDIDFormVisible"
    >
      <el-form
        ref="form"
        :model="uploadAppData"
        label-width="120px"
      >
        <el-form-item label="当前可用设备数">
          <el-input
            v-model="this.userInfo.udid_count"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="可用余额">
          <el-input
            v-model="this.userInfo.coin"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备单价">
          <el-input
            v-model="this.sysconfig.coin_to_udid"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择购买数量">
          <el-input-number
            v-model="selectUdidNum"
            @change="udidSelectChange"
            :min="0"
            :max="maxCount"
            label="购买设备数"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="buyUDIDFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitBuyData()"
          :loading="saveIpaInfoLoad"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--- 下载记录表单 --->
    <el-dialog
      title="下载记录"
      :visible.sync="downloadFormVisible"
    >
      <el-select
        v-model="channelValue"
        placeholder="请选择"
        @change="channelChange"
      >
        <el-option
          v-for="item in channelList"
          :key="item.channel"
          :label='item.channel'
          :value="item.channel"
        >
        </el-option>
      </el-select>
      <el-table :data="downloadRecord">
        <el-table-column
          property="id"
          label="#"
          width="50"
        ></el-table-column>
        <el-table-column
          property="udid_name"
          label="设备标识"
          width="200"
        ></el-table-column>
        <el-table-column
          property="creater_time"
          label="下载时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.creater_time | formatDate}}</span>
          </template>
        </el-table-column>

        <el-table-column
          property="channel"
          label="下载渠道"
        >
          <template slot-scope="scope">
            <span style="margin-left: 5px">{{scope.row.channel}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
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

    <!--- 修改应用短链接 --->
    <el-dialog
      :title="this.appShortLinkdata.appleName"
      :visible.sync="appShortLinkVisible"
    >
      <el-input
        placeholder="请输入内容"
        v-model="appShortLinkdata.linkName "
      >
        <template slot="prepend">Https://www.n4n00.com/sr</template>
      </el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="appShortLinkVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAppShortLink()"
          :loading="saveIpaInfoLoad"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!--- 购买包币 --->
    <el-dialog
      title="下载记录"
      :visible.sync="buyCoinFormVisible"
    >
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
  updateAppInfo,
  getUserInfoList,
  getUserInfo,
  getSysConfig,
  getDownLoadRecord,
  buyCoin,
  getUserUDIDList,
  setAppShortLink,
  updateIpaIntroduceInfo
} from "../../../api/sys.api.js";
import VueQr from "vue-qr";
import { formatDate } from "../../../common/date.js";

export default {
  created() {
    this.getAppInfoList();
    this.getSysConfig();
    this.getUserInfo();
    this.getUserUDIDList();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    VueQr
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
        2
      ).then(res => {
        this.appInfoData = res.data;
        this.dataSize = res.size;
      });
    },
    //获得用户已经使用的udid列表
    getUserUDIDList() {
      getUserUDIDList()
        .then(res => {
          this.udidList = res;
        })
        .catch(() => {
          this.$notify({
            title: "失败",
            message: "读取UDID列表失败",
            type: "error"
          });
        });
    },
    //购买UDID
    buyudid() {
      this.buyUDIDFormVisible = true;
      this.maxCount = parseInt(
        this.userInfo.coin / this.sysconfig.coin_to_udid
      );
    },
    //提交购买
    submitBuyData() {
      this.saveIpaInfoLoad = true;
      buyCoin(this.selectUdidNum)
        .then(res => {
          this.saveIpaInfoLoad = false;
          this.buyUDIDFormVisible = false;
          this.selectUdidNum = 0;
          this.getUserInfo();
          this.$notify({
            title: "成功",
            message: "UDID购买成功，实时生效",
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
    //修改应用短链接
    changeAppShortLink(id, name, link, index) {
      this.appShortLinkdata.id = id;
      this.appShortLinkdata.appleName = "修改应用《" + name + "》短链";
      this.appShortLinkdata.linkName = link;
      this.appShortLinkdata.index = index;
      this.appShortLinkVisible = true;
    },
    //提交应用短链修改
    submitAppShortLink() {
      if (
        this.appShortLinkdata.linkName.length < 6 ||
        this.appShortLinkdata.linkName.length > 10
      ) {
        this.$notify({
          title: "失败",
          message: "短链接长度必须在6-10位之间",
          type: "error"
        });
        return;
      }
      setAppShortLink(
        this.appShortLinkdata.id,
        this.appShortLinkdata.linkName
      ).then(res => {
        this.appInfoData[
          this.appShortLinkdata.index
        ].Hashids = this.appShortLinkdata.linkName;
        this.appShortLinkdata.linkName = "";
        (this.appShortLinkdata.id = ""), (this.appShortLinkdata.appleName = "");
        this.appShortLinkVisible = false;
        this, (appShortLinkdata.index = "");
        this.$notify({
          title: "成功",
          message: "修改应用" + appleName + "最大可用设备数成功",
          type: "success"
        });
      });
    },
    openEditAppInfo(id, row) {
      this.appInfoCurrentId = id;
      this.eidtAppInfoFormVisible = true;
      this.appInfoText = row.introduce;
      if (row.introduce_image == null || row.introduce_image == "") {
        this.bannerFileList = [];
      } else {
        this.bannerFileList = JSON.parse(row.introduce_image);
      }
      console.log(this.bannerFileList);
    },
    //编辑app介绍信息
    saveAppInfo() {
      for (var i = 0; i < this.bannerFileList.length; i++) {
        var items = this.bannerFileList[i];
        if (items.hasOwnProperty("response")) {
          var tmp = {
            name: items.name,
            url: items.response.data,
            uid: items.uid,
            status: items.status
          };
          this.bannerFileList[i] = tmp;
        }
      }

      updateIpaIntroduceInfo(
        this.appInfoCurrentId,
        this.appInfoText,
        this.bannerFileList
      ).then(res => {
        this.eidtAppInfoFormVisible = false;
        this.getAllAppInfo();
        this.bannerFileList = [];
        this.$notify({
          title: "成功",
          message: "编辑成功",
          type: "success"
        });
      });
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
        "本次操作将修改应用" + appleName + "的最大可用设备数，请谨慎操作!",
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
              message: "修改应用" + appleName + "最大可用设备数成功",
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
    channelChange(event, item) {
      this.getAppDownloadRecord();
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
    beforeUploadImage(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 1M!",
          type: "warning"
        });

        return false;
      }
    },
    handleChange(file, fileList) {
      this.bannerFileList = fileList.slice(-3);
      console.log(this.bannerFileList);
    },
    handleRemove(file, fileList) {
      this.removeArray(this.bannerFileList, file);
      console.log(this.bannerFileList);
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
      this.saveIpaInfoLoad = true;

      updateAppInfo(
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
      this.channelValue = "Default";

      this.downloadRecord_appId = appId;
      this.downloadFormVisible = true;
      this.currentPage_download = 1;
      this.getAppDownloadRecord();
    },
    getAppDownloadRecord() {
      getDownLoadRecord(
        this.downloadRecord_appId,
        this.pageSize,
        this.currentPage_download,
        this.channelValue
      )
        .then(res => {
          this.downloadRecord = res.data;
          this.dataSize_download = res.size;
          this.channelList = res.channelData;
        })
        .catch(() => {
          this.$notify({
            title: "失败",
            message: "读取下载记录失败，请重试",
            type: "error"
          });
        });
    },
    removeArray(_arr, _obj) {
      let length = _arr.length;
      for (let i = 0; i < length; i++) {
        if (_arr[i] === _obj) {
          if (i === 0) {
            _arr.shift(); //删除并返回数组的第一个元素
            return _arr;
          } else if (i === length - 1) {
            _arr.pop(); //删除并返回数组的最后一个元素
            return _arr;
          } else {
            _arr.splice(i, 1); //删除下标为i的元素
            return _arr;
          }
        }
      }
      console.log(";;;;;;--- rrrr" + _arr);
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
      buyUDIDFormVisible: false,
      buyCoinFormVisible: false,
      appShortLinkVisible: false,
      selectUdidNum: 0,
      eidtAppInfoFormVisible: false,
      bannerFileList: [],
      appInfoText: "",

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
      appShortLinkdata: {
        id: "",
        appleName: "",
        linkName: "",
        index: ""
      },
      channelList: [],
      channelValue: "Default"
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