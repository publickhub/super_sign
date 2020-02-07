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
      @click="searchRechargeInfo"
      style="margin-left:20px"
    >搜索</el-button>
    <el-button
      type="success"
      @click="getAllRechargeInfo"
      style="margin-left:20px"
    >全部</el-button>
    <template>
      <el-table
        :data="rechargeData"
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
          prop="account"
          label="账号"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
        >
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? '减少' : '增加' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ip_addr"
          label="操作IP"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="操作金额"
        >
        </el-table-column>
        <el-table-column
          prop="amount_early"
          label="操作前余额"
        >
        </el-table-column>
        <el-table-column
          prop="creater_time"
          label="操作时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{scope.row.creater_time | formatDate}}</span>
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
      :total="dataSize">
    </el-pagination>
  </d2-container>
</template>

<script>
import { getRechargeInfoList } from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";

export default {
  created() {
    this.getRechargeInfo();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.rechargeData[rowIndex].amount < 0) {
        return "warning-row";
      }
      return "success-row";
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getRechargeInfo();
    },
    getRechargeInfo() {
      getRechargeInfoList(
        this.account,
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage
      ).then(res => {
        console.log(res);
        this.rechargeData = res.data;
        this.dataSize = res.size;
      });
    },
    searchRechargeInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getRechargeInfo();
    },
    getAllRechargeInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.account = "";
      this.currentPage = 1;

      this.getRechargeInfo();
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
      account: "",
      dataSize: 0,
      currentPage: 1,
      pageSize: 10,
      rechargeData: [],
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