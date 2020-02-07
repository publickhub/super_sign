<template>
  <d2-container class="page">
    <d2-page-cover>
      <d2-icon-svg class="logo" name="d2-admin" />
      <template slot="footer">
        <el-row :gutter="20" class="info_all">
          <el-col :span="6">
            <el-card shadow="always" style="background-color:#409EFF;color:white">
              本日下载量
              <p>{{downloadSize}}</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always" style="background-color:#67C23A;color:white">
              剩余UDID数
              <p>{{udidSize}}</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always" style="background-color:#E6A23C;color:white">
              应用总数
              <p>{{appCount}}</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always" style="background-color:#F56C6C;color:white">
              无可用udid应用数
              <p>{{expiredApp}}</p>
            </el-card>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 80%">
          <el-table-column prop="id" label="#" width="180"></el-table-column>
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <el-table-column prop="arg" label="参数"></el-table-column>
        </el-table>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import D2PageCover from './components/d2-page-cover'
import {
  getSurplusUDID,
  getExpiredAppCount,
  getAppCount,
  getDownloadSizeToday,
  getSysInfo
} from '../../../api/sys.api.js'

export default {
  components: {
    D2PageCover
  },
  created () {
    getDownloadSizeToday ().then(
      (res) => 
      {
      console.log(res)
      this.downloadSize = res.size
    })
    getExpiredAppCount ().then((res) => {
      console.log(res)
      this.expiredApp = res.size
    }
    )
    getAppCount ().then((res) => {
      console.log(res)
      this.appCount = res.size
    })
    getSurplusUDID ().then((res) => {
      console.log(res)
      this.udidSize = res.size
    })
    getSysInfo ().then((res) => {
      console.log(res)
      this.tableData = res
    })
    
    
  },
  methods: {},
  data () {
    return {
      filename: __filename,
      sysInfo: {},
      downloadSize: 0,
      udidSize: 0,
      appCount: 0,
      expiredApp: 0,
      tableData:[]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 120px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    width: 100%;
    height: 12em;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .info_all {
    margin-top: 2em;
  }
}
</style>
