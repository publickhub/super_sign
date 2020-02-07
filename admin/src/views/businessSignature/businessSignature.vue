<template>
  <d2-container>
    <template slot="header">企业签应用管理</template>
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

    <el-input
      type="text"
      placeholder="请输入app包关键词"
      prefix-icon="el-icon-search"
      v-model="appName"
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
    <template>
      <el-table
        :data="appInfoData"
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
          prop="id"
          label="app图标"
          width="100"
        >
          <template slot-scope="scope">
            <div class="block">
              <el-image
                style="width: 80px; height: 80px"
                :src=scope.row.icon_base64
                :preview-src-list="[scope.row.icon_base64]"
              ></el-image>
            </div>

          </template>

        </el-table-column>

        <el-table-column
          prop="account"
          label="应用所有者"
        >
        </el-table-column>
        <el-table-column
          prop="app_name"
          label="app名称"
        >
        </el-table-column>
        <el-table-column
          prop="bundle_id"
          label="bundleId"
        >
        </el-table-column>
        <el-table-column
          prop="tip"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          prop="admin_check"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.admin_check == 1 ? '可用' : '冻结' }}
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
          prop="ex_time"
          label="过期时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.ex_time | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="400"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.app_name,scope.row.admin_check == 1 ?'冻结':'启用',scope.row.admin_check == 1 ?0:1)"
              size="mini"
              :type="scope.row.admin_check == 1 ?'danger':'success'"
              plain
            >
              {{scope.row.admin_check == 1 ?'冻结应用':'启用应用'}}
            </el-button>
            <el-button
              @click="openExpiredTimeDialog(scope.$index,scope.row.id,scope.row.app_name)"
              size="mini"
              type="warning"
              plain
            >修改过期时间</el-button>
            <el-button
              @click="deleteData(scope.$index,scope.row.id,scope.row.app_name)"
              size="mini"
              type="danger"
              plain
            >删除应用<i class="el-icon-delete el-icon--right"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog
      :title="this.form.tmpAppName"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="过期时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="form.expiredTime"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="ChangeExpiredTime()"
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
  getBusAppInfoList,
  updateAppStatu,
  updateBusAppExpiredTime,
  delAppInfo
} from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";

export default {
  created() {
    this.getAppInfoList();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.appInfoData[rowIndex].admin_check === 0) {
        return "warning-row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getAppInfoList();
    },
    deleteData(index, id, name) {
      this.$confirm(
        "此操作将删除应用" + name + ", 是否继续? 请注意，一经操作无法撤销！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          delAppInfo(id).then(res => {
            this.appInfoData.splice(index, 1);
            this.$notify({
              title: "成功",
              message: "删除应用" + name + "成功",
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
    getAppInfoList() {
      getBusAppInfoList(
        this.account,
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage,
        this.appName
      ).then(res => {
        console.log(res);
        this.appInfoData = res.data;
        this.dataSize = res.size;
      });
    },
    searchAppInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getAppInfoList();
    },
    getAllAppInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.account = "";
      this.appName = "";
      this.currentPage = 1;

      this.getAppInfoList();
    },
    handleFrozen(index, id, app_name, stausMsg, statu) {
      this.$confirm(
        "此操作将" +
          stausMsg +
          "应用" +
          app_name +
          ", 是否继续?   超管冻结应用，普通用户无法解冻，请谨慎操作",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          updateAppStatu(id, statu).then(res => {
            this.appInfoData[index].admin_check = statu;
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
    openExpiredTimeDialog(index, id, app_name) {
      this.dialogFormVisible = true;
      this.form.tmpAppName = "修改<" + app_name + ">应用过期时间";
      this.form.tmpIndex = index;
      this.form.tmpAppId = id;
    },
    ChangeExpiredTime() {
      this.dialogFormVisible = false;
      updateBusAppExpiredTime(this.form.tmpAppId, this.form.expiredTime).then(
        res => {
          this.appInfoData[this.form.tmpIndex].ex_time = this.form.expiredTime;

          this.$notify({
            title: "成功",
            message: "应用" + this.form.tmpAppName + "已重设过期时间成功",
            type: "success"
          });

          this.form.tmpAppName = "";
          this.form.tmpIndex = "";
          this.form.tmpAppId = "";
        }
      );
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
      appInfoData: [],
      appName: "",
      beginTime: "",
      endTime: "",
      form: {
        expiredTime: "",
        tmpAppName: "",
        tmpAppId: "",
        tmpIndex: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false
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