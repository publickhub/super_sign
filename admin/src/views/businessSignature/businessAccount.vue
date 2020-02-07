<template>
  <d2-container>
    <template slot="header">企业账号管理</template>
    <el-input
      type="text"
      placeholder="请输入用户账号关键词"
      prefix-icon="el-icon-search"
      v-model="account"
      maxlength="10"
      show-word-limit
      style="width:25em;margin-left:20px;"
    >
    </el-input>

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
    >
    </el-date-picker>
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
      @click="dialogFormVisible = true"
    >新增企业账号<i class="el-icon-upload el-icon--right"></i></el-button>

    <template>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="id"
          label="#"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="tag_name"
          label="账号标识"
        >
        </el-table-column>
        <el-table-column
          prop="tip"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          prop="statu"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.statu == 0 ? '可用' : '冻结' }}
          </template>
        </el-table-column>

        <el-table-column
          prop="size"
          label="已签名应用数"
        >
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
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.tag_name,scope.row.statu == 0 ?'冻结':'启用',scope.row.statu == 1 ?0:1)"
              size="mini"
              :type="scope.row.statu == 0 ?'danger':'success'"
              plain
            >
              {{scope.row.statu == 0 ?'冻结账号':'启用账号'}}
            </el-button>

            <el-button
              @click="changeBusAccountTip(scope.$index,scope.row.id,scope.row.tag_name)"
              size="mini"
              type="warning"
              plain
            >修改备注</el-button>

            <el-button
              @click="openResignDiag(scope.row.id)"
              size="mini"
              type="danger"
              plain
            >重签</el-button>

            <!-- <el-button
              @click="getResignAppLists()"
              size="mini"
              type="primary"
              plain
            >签名app列表</el-button> -->
          </template>

        </el-table-column>

      </el-table>
    </template>

    <!-- 重签名表单 -->
    <el-dialog
      title="请选择用于重签名的证书"
      :visible.sync="resignFormVisible"
    >
      <el-table
        :data="this.useableTableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        highlight-current-row
        @current-change="selectCer"
      >
        <el-table-column
          prop="id"
          label="#"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="tag_name"
          label="账号标识"
        >
        </el-table-column>
        <el-table-column
          prop="tip"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          prop="statu"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.statu == 0 ? '可用' : '冻结' }}
          </template>
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
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="resignFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="resignIpaList()"
          :loading="resignIpaLoading"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加企业账号表单 -->
    <el-dialog
      title="添加企业账号"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="busAccountForm">
        <el-form-item
          label="备注:"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入备注"
            v-model="busAccountForm.tip"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="p12文件:"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="upload-demo"
            drag
            action="https://www.n4n00.com/appservice//uploadFile"
            :limit="1"
            :on-success="p12UploadSuccess"
            :beforeUpload="beforeUpload"
            :width="formLabelWidth"
          >
            <i
              :width="formLabelWidth"
              class="el-icon-upload"
            ></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div
              class="el-upload__tip"
              slot="tip"
            >只能上传.p12文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="p12密码:"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入.p12文件密码，密码必须正确可用"
            v-model="busAccountForm.p12Password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="描述文件:"
          :label-width="formLabelWidth"
        >
          <el-upload
            class="upload-demo"
            drag
            action="https://www.n4n00.com/appservice/uploadFile"
            :on-success="mobileprovisionUploadSuccess"
            :beforeUpload="beforeUpload"
            :width="formLabelWidth"
          >
            <i class="el-icon-upload"></i>
            <div
              :width="formLabelWidth"
              class="el-upload__text"
            >将文件拖到此处，或<em>点击上传</em></div>
            <div
              class="el-upload__tip"
              slot="tip"
            >只能上传.mobileprovision文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div>1:请确认p12证书和配置文件可用<br>2:请确认p12证书和配置文件是否配套</div>
        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addBusAccount"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="dataSize"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import {
  getBusAccountInfoList,
  updateBusAccountStatu,
  updateBusAccountTip,
  addBusAccount,
  getUseableBusAppInfoList,
  getResignAppLists,
  resignIpaList
} from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";
import { Loading } from "element-ui";

export default {
  created() {
    this.getBusAccountInfoList();
    this.getUseabelBusAccountInfoList();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex].statu === 1) {
        return "warning-row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getBusAccountInfoList();
    },
    getBusAccountInfoList() {
      getBusAccountInfoList(
        this.account,
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage
      ).then(res => {
        console.log(res);
        this.tableData = res.data;
        this.dataSize = res.size;
      });
    },
    getResignAppLists(cer_id) {
      getResignAppLists(cer_id).then(res => {
        console.log(res);
        this.cerResignAppData = res;
        this.appListFormVisible = true;
      });
    },
    getUseabelBusAccountInfoList() {
      getUseableBusAppInfoList().then(res => {
        console.log(res);
        this.useableTableData = res;
      });
    },
    searchAppInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getBusAccountInfoList();
    },
    getAllAppInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.account = "";
      this.currentPage = 1;
      this.getBusAccountInfoList();
    },
    openResignDiag(id){
      this.currentId = id;
      this.resignFormVisible = true;
    },
    resignIpaList() {
      if(this.currentRow == null){
         this.$notify({
          title: "提示",
          message: "请先选择一个证书",
          type: "info"
        });
        return;
      }
      this.resignIpaLoading = true;
      resignIpaList(this.currentId,this.currentRow.id).then(res => {
        this.getAllAppInfo();
        this.resignIpaLoading = false;
        this.resignFormVisible = false;
        this.$notify({
          title: "成功",
          message: "重签名操作处理完成",
          type: "success"
        });
      });
    },
    selectCer(val) {
      console.log(val);
      this.currentRow = val;
    },
    handleFrozen(index, id, account, stausMsg, statu) {
      this.$confirm(
        "此操作将" +
          stausMsg +
          "账号：" +
          account +
          ", 是否继续?   账号冻结后，新应用重签将会挂到其他可用账号下，请谨慎操作",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var load = Loading.service({ fullscreen: true });
          updateBusAccountStatu(id, statu).then(res => {
            load.close();
            this.tableData[index].statu = statu;
            this.$notify({
              title: "成功",
              message: stausMsg + "账号" + account + "成功",
              type: "success"
            });
          });
        })
        .catch(() => {
          load.close();

          this.$notify({
            title: "提示",
            message: "用户取消操作",
            type: "info"
          });
        });
    },
    changeBusAccountTip(index, id, account) {
      this.$prompt("本次操作将修改账号" + account + "的备注!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        updateBusAccountTip(id, value)
          .then(res => {
            this.tableData[index].tip = value;
            this.$notify({
              title: "成功",
              message: "修改账号" + account + "的备注成功",
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
    addBusAccount() {
      console.log(this.busAccountForm.tip);
      if (
        this.busAccountForm.tip == "" ||
        this.busAccountForm.p12Password == ""
      ) {
        this.$notify({
          title: "提示",
          message: "请将信息填写完成，备注和p12密码都是必填项",
          type: "warning"
        });
        return;
      }

      if (
        this.busAccountForm.p12FilePath == "" ||
        this.busAccountForm.mobileProvisionFilePath == ""
      ) {
        this.$notify({
          title: "提示",
          message: "请上传对应文件，2个文件都是必传项",
          type: "warning"
        });
        return;
      }

      //开始上传
      var load = Loading.service({ fullscreen: true });

      addBusAccount(
        this.busAccountForm.p12FilePath,
        this.busAccountForm.mobileProvisionFilePath,
        this.busAccountForm.tip,
        this.busAccountForm.p12Password
      )
        .then(res => {
          load.close();
          this.dialogFormVisible = false;

          this.getBusAccountInfoList();
          this.$notify({
            title: "成功",
            message: "新增企业账号成功",
            type: "success"
          });
        })
        .catch(() => {
          load.close();

          this.$notify({
            title: "提示",
            message: "用户取消操作",
            type: "info"
          });
        });
    },
    p12UploadSuccess(res, file) {
      this.busAccountForm.p12FilePath = res.data;
    },
    mobileprovisionUploadSuccess(res, file) {
      this.busAccountForm.mobileProvisionFilePath = res.data;
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "p12";
      const extension2 = testmsg === "mobileprovision";
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 p12、mobileprovision格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 20MB!",
          type: "warning"
        });
      }
      return extension || (extension2 && isLt2M);
    }
  },
  data() {
    return {
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
      pageSize: 10,
      tableData: [],
      useableTableData: [],
      cerResignAppData: [],
      beginTime: "",
      endTime: "",
      currentRow: null,
      currentId:"",

      dialogFormVisible: false,
      resignFormVisible: false,
      appListFormVisible: false,
      resignIpaLoading: false,
      formLabelWidth: "120px",
      busAccountForm: {
        tip: "",
        p12FilePath: "",
        p12Password: "",
        mobileProvisionFilePath: ""
      }
    };
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .error-row {
  background: #fce0e0;
}
.el-table {
  margin-top: 20px;
}
</style>