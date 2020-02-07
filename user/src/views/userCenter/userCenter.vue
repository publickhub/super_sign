<template>
  <d2-container>
    <template slot="header">会员中心</template>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-money"></i>
              用户信息
            </span>
          </div>
          <el-form label-width="150px" class="demo-ruleForm" label-position="left">
            <el-form-item label="用户账号" prop="account">
              <span>{{userInfoData.account}}</span>
            </el-form-item>
            <el-form-item label="可用余额" prop="coin">
              <span>{{userInfoData.coin}}</span>
            </el-form-item>
            <el-form-item label="可用设备" prop="udid_count">
              <span>{{userInfoData.udid_count}}</span>
            </el-form-item>
            <el-form-item label="注册时间" prop="creater_time">
              <span>{{userInfoData.creater_time | formatDate}}</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!--消费记录 -->
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-chat-dot-round"></i>
              消费记录
            </span>
          </div>
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
            @click="searchConsumeRecord"
            style="margin-left:20px"
          >搜索</el-button>
          <el-button type="success" @click="getAllConsumeRecord" style="margin-left:20px">全部</el-button>
          <el-table :data="consume_record">
            <el-table-column property="id" label="#" width="50"></el-table-column>
            <el-table-column property="udid_name" label="类型" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 0">购买设备</span>
                <span v-else-if="scope.row.type == 1">续费app</span>
                <span v-else>更新app</span>
              </template>
            </el-table-column>
            <el-table-column property="amount" label="消费金额"></el-table-column>
            <el-table-column property="amount_early" label="消费前余额"></el-table-column>

            <el-table-column property="creater_time" label="操作时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{scope.row.creater_time | formatDate}}</span>
              </template>
            </el-table-column>

            <el-table-column property="ip_addr" label="操作IP"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="this.dataSize"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { getUserInfo, getConsumeRecord } from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";
import { Loading } from "element-ui";

export default {
  created() {
    this.getUserInfo();
    this.getAllConsumeRecord();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.getConsumeRecord();
    },
    handleSizeChange(val) {
      console.log(val);
    },
    //搜索
    searchConsumeRecord() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getConsumeRecord();
    },
    //读取app列表
    getAllConsumeRecord() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.currentPage = 1;

      this.getConsumeRecord();
    },
    getUserInfo() {
      getUserInfo().then(res => {
        this.userInfoData = res;
      });
    },
    getConsumeRecord() {
      getConsumeRecord(
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage
      ).then(res => {
        console.log(res);
        this.consume_record = res.data;
        this.dataSize = res.size;
      });
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
      userInfoData: [],
      consume_record: [],
      currentPage: 1,
      pageSize: 10,
      dataSize: 0
    };
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>