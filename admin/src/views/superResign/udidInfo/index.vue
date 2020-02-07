<template>
  <d2-container>
    <template slot="header">UDID管理</template>
    <el-input
      type="text"
      placeholder="请输入UDID关键词"
      prefix-icon="el-icon-search"
      v-model="udid"
      maxlength="10"
      show-word-limit
      style="width:25em;margin-left:20px;"
    >
    </el-input>

    <el-input
      type="text"
      placeholder="请输入appleID关键词"
      prefix-icon="el-icon-search"
      v-model="appleId"
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
      @click="searchUDIDInfo"
      style="margin-left:20px"
    >搜索</el-button>
    <el-button
      type="success"
      @click="getAllUDIDInfo"
      style="margin-left:20px"
    >全部</el-button>
    <template>
      <el-table
        :data="tableInfoData"
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
          prop="udid"
          label="udid"
          width="350"
        >
        </el-table-column>
        <el-table-column
          prop="device_product"
          label="产品"
        >
        </el-table-column>
        <el-table-column
          prop="device_imei"
          label="imei"
        >
        </el-table-column>
        <el-table-column
          prop="device_version"
          label="设备型号"
        >
        </el-table-column>
        <el-table-column
          prop="admin_check"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.statu == 1 ? '可用' : '冻结' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="creater_time"
          label="创建时间"
        >

        </el-table-column>
        <el-table-column
          prop="apple_id"
          label="所属苹果账号"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleFrozen(scope.$index,scope.row.id,scope.row.udid,scope.row.statu == 1 ?'冻结':'启用',scope.row.statu == 1 ?0:1)"
              size="mini"
              :type="scope.row.statu == 1 ?'danger':'success'"
              plain
            >
              {{scope.row.statu == 1 ?'冻结UDID':'启用UDID'}}
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
      :total="dataSize">
    </el-pagination>
  </d2-container>
</template>

<script>
import { getUDIDInfoList, updateUDIDStatu } from "../../../api/sys.api.js";

import { formatDate } from "../../../common/date.js";

export default {
  created() {
    this.getUDIDInfoList();
  },
  filters: {
    formatDate(time) {
      var date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.tableInfoData[rowIndex].statu === 0) {
        return "warning-row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getUDIDInfoList();
    },
    getUDIDInfoList() {
      getUDIDInfoList(
        this.udid,
        this.beginTime,
        this.endTime,
        this.pageSize,
        this.currentPage,
        this.appleId
      ).then(res => {
        console.log(res);
        this.tableInfoData = res.data;
        this.dataSize = res.size;
      });
    },
    searchUDIDInfo() {
      if (this.value2.length > 0) {
        this.beginTime = this.value2[0];
        this.endTime = this.value2[1];
      }
      this.getUDIDInfoList();
    },
    getAllUDIDInfo() {
      this.value2 = "";
      this.beginTime = "";
      this.endTime = "";
      this.udid = "";
      this.appleId = "";
      this.currentPage = 1;

      this.getUDIDInfoList();
    },
    handleFrozen(index, id, udid, stausMsg, statu) {
      this.$confirm(
        "此操作将" +
          stausMsg +
          "udid --->" +
          udid +
          ", 是否继续?   超管冻结UDID，将全局禁用该用户下载，请谨慎操作",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          updateUDIDStatu(id, statu).then(res => {
            this.tableInfoData[index].statu = statu;
            this.$notify({
              title: "成功",
              message: stausMsg + "udid --->" + udid + "成功",
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
      appleId: "",
      udid: "",
      dataSize: 0,
      currentPage: 1,
      pageSize: 10,
      tableInfoData: [],
      appName: "",
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