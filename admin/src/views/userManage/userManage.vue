<template>
  <d2-container>
    <template slot="header">用户管理</template>
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
      @click="searchUserInfo"
      style="margin-left:20px"
    >搜索</el-button>
    <el-button
      type="success"
      @click="getAllUserInfo"
      style="margin-left:20px"
    >全部</el-button>
    <template>
      <el-table
        :data="userinfoData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="id"
          label="#"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="account"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
        ></el-table-column>
        <el-table-column
          prop="coin"
          label="余额"
        ></el-table-column>
        <el-table-column
          prop="udid_count"
          label="已购买设备数"
        ></el-table-column>
        <el-table-column
          prop="udid_inuse"
          label="已使用设备数"
        ></el-table-column>
        <el-table-column
          prop="d_count"
          label="可用下载点数"
        ></el-table-column>

        <el-table-column
          prop="statu"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.statu == 0 ? '可用' : '冻结' }}</template>
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
          width="400"
        >
          <template slot-scope="scope">
            <el-button
              @click="changeUserAmount(scope.$index,scope.row.id,scope.row.account)"
              size="mini"
              type="warning"
            >修改余额</el-button>
            <el-button
              @click="changeUDIDNum(scope.$index,scope.row.id,scope.row.account)"
              size="mini"
              type="warning"
              plain
            >修改UDID</el-button>
            <el-button
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.account,scope.row.statu == 0 ?'冻结':'启用',scope.row.statu == 0 ?1:0)"
              size="mini"
              :type="scope.row.statu == 0 ?'danger':'success'"
              plain
            >{{scope.row.statu == 0 ?'冻结账号':'启用账号'}}</el-button>

            <el-button
              @click="deleteData(scope.$index,scope.row.id,scope.row.account)"
              size="mini"
              type="danger"
              plain
            >
              删除账号
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

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
  getUserInfoList,
  updateUserStatu,
  updateUserMaxUdid,
  updateUserAmount,
  delUserInfo
} from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";

export default {
  created() {
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
      if (this.userinfoData[rowIndex].statu === 1) {
        return "warning-row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getUserInfo();
    },
    getUserInfo() {
      getUserInfoList(
        this.account,
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage
      ).then(res => {
        console.log(res);
        this.userinfoData = res.data;
        this.dataSize = res.size;
      });
    },
    searchUserInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getUserInfo();
    },
    getAllUserInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.account = "";
      this.currentPage = 1;

      this.getUserInfo();
    },
    handleFrozen(index, id, account, stausMsg, statu) {
      this.$confirm(
        "此操作将" + stausMsg + "账号" + account + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          updateUserStatu(id, statu).then(res => {
            this.userinfoData[index].statu = statu;
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
    deleteData(index, id, account) {
      this.$confirm(
        "此操作将删除账号" + account + ", 是否继续? 请注意，一经操作无法撤销！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          delUserInfo(id).then(res => {
            this.userinfoData.splice(index, 1);
            this.$notify({
              title: "成功",
              message: "删除账号" + account + "成功",
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
    changeUDIDNum(index, id, account) {
      this.$prompt(
        "本次操作将修改账号" + account + "的最大可用UDID数，请谨慎操作!",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[0-9]+$/,
          inputErrorMessage: "请输入正整数"
        }
      ).then(({ value }) => {
        updateUserMaxUdid(id, value)
          .then(res => {
            this.userinfoData[index].udid_count = value;
            this.$notify({
              title: "成功",
              message: "修改账号" + account + "最大可用udid数成功",
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
    changeUserAmount(index, id, account) {
      this.$prompt(
        "本次操作将修改账号" +
          account +
          "的余额，请谨慎操作!  请注意，正数为增加，负数为减少",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[-\+]?\d+$/,
          inputErrorMessage: "请输入整数"
        }
      ).then(({ value }) => {
        updateUserAmount(id, value)
          .then(res => {
            this.userinfoData[index].coin =
              parseInt(this.userinfoData[index].coin) + parseInt(value);
            this.$notify({
              title: "成功",
              message: "修改账号" + account + "余额成功",
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
      userinfoData: [],
      beginTime: "",
      endTime: ""
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