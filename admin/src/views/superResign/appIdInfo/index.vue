<template>
  <d2-container>
    <template slot="header">appleId管理</template>
    <el-input
      type="text"
      placeholder="请输入用户账号关键词"
      prefix-icon="el-icon-search"
      v-model="account"
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
      @click="dialogFormVisible = true"
    >
      新增apple ID
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>


    <el-button
      type="warning"
      @click="checkAppleId"
    >
       检查应用状态
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>



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
        ></el-table-column>

        <el-table-column
          prop="apple_account"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="apple_password"
          label="密码"
        ></el-table-column>
        <el-table-column
          prop="bundle_id"
          label="bundle_id"
        ></el-table-column>
        <el-table-column
          prop="device_num"
          label="剩余可用udid数"
        ></el-table-column>
        <el-table-column
          prop="tip"
          label="备注"
        ></el-table-column>
        <el-table-column
          prop="statu"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.statu == 1 ? '可用' : '冻结' }}</template>
        </el-table-column>
        <el-table-column
          prop="error_statu"
          label="是否报错"
        >
          <template slot-scope="scope">{{ scope.row.error_statu == 1 ? '正常' : '报错' }}</template>
        </el-table-column>
        <el-table-column
          prop="error_msg"
          label="错误信息"
        ></el-table-column>
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
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.apple_account,scope.row.statu == 1 ?'冻结':'启用',scope.row.statu == 1 ?0:1)"
              size="mini"
              :type="scope.row.statu == 1 ?'danger':'success'"
              plain
            >{{scope.row.statu == 1 ?'冻结账号':'启用账号'}}</el-button>

            <el-button
              @click="updateErrorStatu(scope.$index,scope.row.id,scope.row.apple_account)"
              v-show="scope.row.error_statu == 0"
              size="mini"
              type="warning"
              plain
            >错误已处理?</el-button>
            <el-button
              @click="deleteData(scope.$index,scope.row.id,scope.row.apple_account)"
              size="mini"
              type="danger"
              plain
            >删除账号<i class="el-icon-delete el-icon--right"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 添加苹果账号表单 -->
    <el-dialog
      title="添加苹果账号"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="账号:"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入账号"
            v-model="form.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="密码:"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item
          label="备注:"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入备注"
            v-model="form.tip"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="验证码:"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="this.form.is_captch"
            placeholder="请输入验证码"
            v-model="form.captchCode"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <div>
            1:请保证账号下至少有一个可用的证书
            <br />2:添加后，程序会自动再开发者中心生成一个证书，请不要删除
          </div>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addAppleInfo()"
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
    ></el-pagination>
  </d2-container>
</template>

<script>
import {
  getAppleIdInfoList,
  updateAppleIdStatu,
  updateAppleIdErrorStatu,
  addAppleId,
  delAppIdInfo,
  checkAppleIdStatu
} from "../../../api/sys.api.js";

import { formatDate } from "../../../common/date.js";
import { Loading } from "element-ui";

export default {
  created() {
    this.getAppleIdInfoList();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex].statu === 0) {
        return "warning-row";
      }
      if (this.tableData[rowIndex].error_statu === 0) {
        return "error-row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getAppleIdInfoList();
    },
    getAppleIdInfoList() {
      getAppleIdInfoList(
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
    searchAppInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getAppleIdInfoList();
    },
    getAllAppInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.account = "";
      this.currentPage = 1;

      this.getAppleIdInfoList();
    },
    handleFrozen(index, id, account, stausMsg, statu) {
      this.$confirm(
        "此操作将" +
          stausMsg +
          "账号：" +
          account +
          ", 是否继续?   账号冻结后，账号下用户将自动挂靠到其他账号下，请谨慎操作",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var aaa = Loading.service({ fullscreen: true });
          updateAppleIdStatu(id, statu).then(res => {
            aaa.close();
            this.tableData[index].statu = statu;
            this.$notify({
              title: "成功",
              message: stausMsg + "账号" + account + "成功",
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
    //解决账号报错
    updateErrorStatu(index, id, account) {
      this.$confirm(
        "此操作会将账号：" +
          account +
          "重新加入账号池，请确认账号问题已经解决，否则将会影响用户正常下载，请谨慎操作",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          updateAppleIdErrorStatu(id).then(res => {
            this.tableData[index].error_statu = 1;
            this.tableData[index].error_msg = "";

            this.$notify({
              title: "成功",
              message: "账号" + account + "消除错误信息成功",
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
    //删除账号
    deleteData(index, id, name) {
      this.$confirm(
        "此操作将删除账号" + name + ", 是否继续? 请注意，一经操作无法撤销！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          delAppIdInfo(id).then(res => {
            this.tableData.splice(index, 1);
            this.$notify({
              title: "成功",
              message: "删除账号" + name + "成功",
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

    checkAppleId(){
      var load = Loading.service({ fullscreen: true });
       checkAppleIdStatu().then(res => {
        load.close();
        this.getAppleIdInfoList();
        this.$notify({
          title: "成功",
          message: "账号状态检查完成",
          type: "success"
        });
       });

    },

    //添加苹果账号
    addAppleInfo() {
      if (this.form.account.length < 5 || this.form.password.length < 5) {
        this.$notify({
          title: "失败",
          message: "数据提交错误",
          type: "error"
        });
        return;
      }
      //account, pwd, tip,code
      var load = Loading.service({ fullscreen: true });

      addAppleId(
        this.form.account,
        this.form.password,
        this.form.tip,
        this.form.captchCode,
        this.form.bundle_id
      ).then(res => {
        console.log(res.code);
        load.close();
        if (res.code == 999) {
          this.$notify({
            title: "提示",
            message: "账号需要二次验证，请输入验证码",
            type: "info"
          });
          this.form.is_captch = false;
          this.form.bundle_id = res.bundle;
          return;
        }
        this.getAppleIdInfoList();
        this.$notify({
          title: "成功",
          message: "添加成功",
          type: "success"
        });
        this.dialogFormVisible = false;
        this.form.account = "";
        this.form.password = "";
        this.form.tip = "";
        this.form.code = "";
      });
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
      beginTime: "",
      endTime: "",
      dialogFormVisible: false,
      form: {
        account: "",
        password: "",
        captchCode: "",
        tip: "",
        bundle_id: "",
        is_captch: true
      },
      formLabelWidth: "120px"
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