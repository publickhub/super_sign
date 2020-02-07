<template>
  <d2-container>
    <template slot="header">安卓应用管理</template>
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
      @click="buydCount()"
    >
      购买下载次数
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
      <el-tag style="margin-left:20px;margin-top:40px;">当前可用下载点数:{{this.userInfo.d_count}}</el-tag>
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
        <!-- <el-table-column prop="id" label="app图标" width="100">
          <template slot-scope="scope">
            <div class="block">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.icon_base64"
                :preview-src-list="[scope.row.icon_base64]"
              ></el-image>
            </div>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="id"
          label="二维码"
          width="160"
        >
          <template slot-scope="scope">
            <vue-qr
              :text='"http://www.n4n00.com/ad" + scope.row.Hashids'
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
          prop="d_count"
          label="下载次数"
        ></el-table-column>
        <el-table-column
          prop="app_version"
          label="应用版本"
        ></el-table-column>

        <el-table-column
          prop="udid_inuse"
          label="下载链接"
          width="220"
        >
          <template slot-scope="scope">http://www.n4n00.com/ad{{scope.row.Hashids}}</template>
        </el-table-column>
        <el-table-column
          prop="related"
          label="关联应用"
          width="80"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.relatedData.icon_base64"
              v-show="scope.row.related !== 0"
            ></el-image>
            <div v-show="scope.row.related !== 0">{{scope.row.relatedData.app_name}}</div>

            <div
              style="text-align: center"
              v-show="scope.row.related === 0"
            >无关联</div>
          </template>

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
              @click="changeAppShortLink(scope.row.id,scope.row.app_name,scope.row.Hashids,scope.$index)"
              size="mini"
              type="primary"
              plain
            >修改短链</el-button>
            <el-button
              @click="releatedApp(scope.$index,scope.row.id,scope.row.app_name,scope.row.related)"
              size="mini"
              :type="scope.row.related == 0 ?'success':'danger'"
              plain
            >{{scope.row.related == 0 ?'关联应用':'解除关联'}}</el-button>
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
          label="apk文件:"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="upload-demo"
            drag
            action="https://www.n4n00.com/appservice/uploadAndroidApp"
            :limit="1"
            :on-success="ipaUploadSuccess"
            :beforeUpload="beforeUpload"
            :width="formLabelWidth"
            :file-list="apkfileList"
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
            >只能上传apk文件</div>
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
            v-model="uploadAppData.app_version"
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

    <!-- 关联应用表单 -->
    <el-dialog
      title="请选择要关联的应用"
      :visible.sync="releatedFormVisible"
    >
      <el-table
        :data="this.releatedAppList"
        style="width: 100%"
        highlight-current-row
        @current-change="selectApp"
      >
        <el-table-column
          prop="id"
          label="#"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="icon"
          label="icon"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.icon_base64"
            ></el-image>
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
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange_related"
        :current-page.sync="currentPage_releated"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="dataSize_releated"
      ></el-pagination>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="releatedFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitRelatedApp()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!--- 购买下载点数表单 --->
    <el-dialog
      title="购买下载点数"
      :visible.sync="buyDcountFormVisible"
    >
      <el-form
        ref="form"
        :model="uploadAppData"
        label-width="120px"
      >
        <el-form-item label="当前可用下载点数">
          <el-input
            v-model="this.userInfo.d_count"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="可用余额">
          <el-input
            v-model="this.userInfo.coin"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="下载点数单价/10次">
          <el-input
            v-model="this.sysconfig.coin_to_dcount"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择购买数量">
          <el-input-number
            v-model="selectUdidNum"
            @change="udidSelectChange"
            :min="0"
            :max="maxCount"
            label="购买下载点数"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="buyDcountFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitBuyData()"
          :loading="saveIpaInfoLoad"
        >确 定</el-button>
      </span>
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
        <template slot="prepend">Https://www.n4n00.com/ad</template>
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
  getApkInfoList,
  updateApkStatuUser,
  updateAppMaxUdid,
  updateApkTip,
  updateApkInfo,
  getUserInfoList,
  getUserInfo,
  getSysConfig,
  getDownLoadRecord,
  buyDcount,
  setApkShortLink,
  updateAppReleatedUser,
  getRelatedAppInfoListUser,
  updateAppIntroduceInfo
} from "../../api/sys.api.js";
import VueQr from "vue-qr";
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
    handleCurrentChange_related(val) {
      console.log(val);
      this.getRelatedAppList();
    },

    //获得app列表
    getAppInfoList() {
      getApkInfoList(
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage,
        this.appName
      ).then(res => {
        this.appInfoData = res.data;
        this.dataSize = res.size;
      });
    },
    getRelatedAppList() {
      getRelatedAppInfoListUser(this.pageSize, this.currentPage_releated).then(
        res => {
          this.releatedAppList = res.data;
          this.dataSize_releated = res.size;
        }
      );
    },
    openEditAppInfo(id, row) {
      this.appInfoCurrentId = id;
      this.eidtAppInfoFormVisible = true;
      this.appInfoText = row.introduce;
      if (row.introduce_image == null || row.introduce_image == ""){
        this.bannerFileList = []
      }
      else
      {
        this.bannerFileList = JSON.parse(row.introduce_image);
      }
      console.log(this.bannerFileList);
    },
    //编辑app介绍信息
    saveAppInfo() {
      for (var i = 0; i < this.bannerFileList.length; i++) {
        var items = this.bannerFileList[i];
        console.log("asdfasklfas");
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

      updateAppIntroduceInfo(
        this.appInfoCurrentId,
        this.appInfoText,
        this.bannerFileList
      ).then(res => {
        this.eidtAppInfoFormVisible = false;
        this.getAllAppInfo()
        this.bannerFileList = [];
        this.$notify({
          title: "成功",
          message: "编辑成功",
          type: "success"
        });
      });
    },
    //关联，解除关联
    releatedApp(index, id, app_name, related) {
      if (related == 0) {
        //关联
        this.releatedFormVisible = true;
        this.currentPage_releated = 1;
        this.releatedAppList = [];
        this.dataSize_releated = 0;
        this.currentId = id;
        this.getRelatedAppList();
      } else {
        this.$confirm(
          "此操作将解除应用" + app_name + "的关联应用, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            updateAppReleatedUser(id, 0).then(res => {
              this.getAllAppInfo();
              this.$notify({
                title: "成功",
                message: "解除应用" + app_name + "关联成功",
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
      }
    },
    selectApp(val) {
      console.log(val);
      this.currentRow = val;
    },
    submitRelatedApp() {
      if (this.currentRow == null) {
        this.$notify({
          title: "提示",
          message: "请先选择一个应用",
          type: "info"
        });
        return;
      }

      updateAppReleatedUser(this.currentId, this.currentRow.id).then(res => {
        this.getAllAppInfo();
        this.releatedFormVisible = false;
        this.$notify({
          title: "成功",
          message: "应用关联成功",
          type: "success"
        });
      });
    },
    //购买下载点数
    buydCount() {
      this.buyDcountFormVisible = true;
      this.maxCount = parseInt(
        this.userInfo.coin / this.sysconfig.coin_to_dcount
      );
    },
    //提交购买
    submitBuyData() {
      this.saveIpaInfoLoad = true;
      buyDcount(this.selectUdidNum)
        .then(res => {
          this.saveIpaInfoLoad = false;
          this.buyDcountFormVisible = false;
          this.selectUdidNum = 0;
          this.getUserInfo();
          this.$notify({
            title: "成功",
            message: "下载点数购买成功，实时生效",
            type: "success"
          });
        })
        .catch(() => {
          this.saveIpaInfoLoad = false;
          this.buyDcountFormVisible = false;
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
      setApkShortLink(
        this.appShortLinkdata.id,
        this.appShortLinkdata.linkName
      ).then(res => {
        this.appInfoData[
          this.appShortLinkdata.index
        ].Hashids = this.appShortLinkdata.linkName;
        this.appShortLinkdata.linkName = "";
        this.appShortLinkdata.id = "";
        this.appShortLinkdata.appleName = "";
        this.appShortLinkVisible = false;
        this.appShortLinkdata.index = "";
        this.$notify({
          title: "成功",
          message: "修改应用" + appleName + "最大可用设备数成功",
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
    //修改备注
    changetip(index, id, appleName) {
      this.$prompt("本次操作将修改应用" + appleName + "的备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        if (value.length < 1) {
          return;
        }
        updateApkTip(id, value)
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
          updateApkStatuUser(id, statu).then(res => {
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
      const extension = testmsg === "apk";
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!extension) {
        this.$message({
          message: "上传文件只能是apk格式!",
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
    ipaUploadSuccess(res, file) {
      this.uploadAppData = res.data;
      this.saveAppData.tmpId = res.data.id;
      this.appDataFormVisible = true;
      this.appFormVisible = false;
      this.apkfileList = [];
    },
    handleChange(file, fileList) {
      this.bannerFileList = fileList.slice(-3);
      console.log(this.bannerFileList);
    },
    handleRemove(file, fileList) {
      this.removeArray(this.bannerFileList, file);
      console.log(this.bannerFileList);
    },
    //保存APP
    saveIpaInfo() {
      this.saveIpaInfoLoad = true;

      updateApkInfo(
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
      currentPage_releated: 1,
      dataSize_releated: 0,
      pageSize: 10,
      appInfoData: [],
      appName: "",
      beginTime: "",
      endTime: "",
      formLabelWidth: "120px",
      appFormVisible: false,
      appDataFormVisible: false,
      downloadFormVisible: false,
      buyDcountFormVisible: false,
      buyCoinFormVisible: false,
      appShortLinkVisible: false,
      releatedFormVisible: false,
      eidtAppInfoFormVisible: false,
      selectUdidNum: 0,
      currentRow: null,
      currentId: "",
      appInfoCurrentId: "",
      appIntroduceImgList: [],
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
      apkfileList: [],
      bannerFileList: [],

      //系统配置
      sysconfig: {},
      //用户数据
      userInfo: {},
      releatedAppList: [],
      maxCount: "",
      appShortLinkdata: {
        id: "",
        appleName: "",
        linkName: "",
        index: ""
      }
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