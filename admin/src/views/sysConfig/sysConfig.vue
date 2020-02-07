<template>
  <d2-container>
    <template slot="header">系统配置管理</template>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span><i class="el-icon-money"></i>
              代币信息配置</span>
          </div>
          <el-form
            :model="sysConfigForm"
            :rules="rules"
            ref="sysConfigForm"
            label-width="150px"
            class="demo-ruleForm"
            label-position="left"
          >

            <el-form-item
              label="代币名称"
              prop="coin_name"
            >
              <el-input v-model="sysConfigForm.coin_name"></el-input>
            </el-form-item>
            <el-form-item
              label="UDID单价"
              prop="coin_to_udid"
            >
              <el-input v-model.number="sysConfigForm.coin_to_udid"></el-input>
            </el-form-item>
            <el-form-item
              label="企业签名单价"
              prop="coin_to_resign"
            >
              <el-input v-model.number="sysConfigForm.coin_to_resign"></el-input>
            </el-form-item>
            <el-form-item
              label="企业签名更新单价"
              prop="coin_to_update"
            >
              <el-input v-model.number="sysConfigForm.coin_to_update"></el-input>
            </el-form-item>
            <el-form-item
              label="下载点数单价/10次"
              prop="coin_to_dcount"
            >
              <el-input v-model.number="sysConfigForm.coin_to_dcount"></el-input>
            </el-form-item>
          </el-form>
          <el-button
            @click="getSysConfig"
            type="primary"
          >重置信息</el-button>
          <el-button
            @click="updateSysCoinConfig"
            type="success"
          >提交信息</el-button>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span><i class="el-icon-chat-dot-round"></i>
              联系我们</span>
          </div>
          <el-form
            :model="sysConfigForm"
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
            label-position="left"
          >
            <el-form-item
              label="客服QQ"
              prop="kf_qq_info"
            >
              <el-input v-model="sysConfigForm.kf_qq_info"></el-input>
            </el-form-item>
            <el-form-item
              label="客服微信"
              prop="kf_weixin_info"
            >
              <el-input v-model="sysConfigForm.kf_weixin_info"></el-input>
            </el-form-item>
            <el-form-item
              label="客服电话"
              prop="kf_phone_info"
            >
              <el-input v-model="sysConfigForm.kf_phone_info"></el-input>
            </el-form-item>
          </el-form>
          <el-button
            @click="getSysConfig"
            type="primary"
          >重置信息</el-button>
          <el-button
            @click="updateSysUsConfig"
            type="success"
          >提交信息</el-button>
        </el-card>
      </el-col>

    </el-row>

  </d2-container>
</template>

<script>
import {
  getSysConfig,
  updateSysCoinConfig,
  updateSysUsConfig
} from "../../api/sys.api.js";

import { formatDate } from "../../common/date.js";
import { Loading } from "element-ui";

export default {
  created() {
    this.getSysConfig();
  },
  methods: {
    getSysConfig() {
      getSysConfig().then(res => {
        this.sysConfigForm = res;
      });
    },
    updateSysCoinConfig() {
      if (
        this.sysConfigForm.coin_name == "" ||
        this.sysConfigForm.coin_to_udid == "" ||
        this.sysConfigForm.coin_to_resign == "" ||
        this.sysConfigForm.coin_to_update == "" ||
        this.sysConfigForm.coin_to_dcount == ""
      ) {
        this.$notify({
          title: "提示",
          message: "信息不完整",
          type: "info"
        });
        return;
      }
      var load = Loading.service({ fullscreen: true });
      updateSysCoinConfig(
        this.sysConfigForm.coin_name,
        this.sysConfigForm.coin_to_udid,
        this.sysConfigForm.coin_to_resign,
        this.sysConfigForm.coin_to_update,
        this.sysConfigForm.coin_to_dcount
      )
        .then(res => {
          load.close();
          this.$notify({
            title: "提示",
            message: "提交代币配置成功",
            type: "success"
          });
        })
        .catch(() => {
          load.close();
          this.$notify({
            title: "提示",
            message: "提交出错",
            type: "info"
          });
        });
    },
    updateSysUsConfig() {
      var load = Loading.service({ fullscreen: true });
      updateSysUsConfig(
        this.sysConfigForm.kf_qq_info,
        this.sysConfigForm.kf_weixin_info,
        this.sysConfigForm.kf_phone_info
      )
        .then(res => {
          load.close();
          this.$notify({
            title: "提示",
            message: "提交联系信息配置成功",
            type: "success"
          });
        })
        .catch(() => {
          load.close();
          this.$notify({
            title: "提示",
            message: "提交出错",
            type: "info"
          });
        });
    }
  },
  data() {
    return {
      sysConfigForm: {
        coin_name: "",
        coin_to_udid: "",
        coin_to_resign: "",
        coin_to_update: "",
        coin_to_dcount: "",

        kf_qq_info: "",
        kf_weixin_info: "",
        kf_phone_info: ""
      },
      rules: {
        coin_name: [
          { required: true, message: "请输入代币昵称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        coin_to_udid: [
          { required: true, message: "该项不能为空" },
          { type: "number", message: "请输入大于0的数字" }
        ],
        coin_to_dcount: [
          { required: true, message: "该项不能为空" },
          { type: "number", message: "请输入大于0的数字" }
        ],
        coin_to_resign: [
          { required: true, message: "该项不能为空" },
          { type: "number", message: "请输入大于0的数字" }
        ],
        coin_to_update: [
          { required: true, message: "该项不能为空" },
          { type: "number", message: "请输入大于0的数字" }
        ],
        kf_qq_info: [
          { required: true, message: "请输入客服qq", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        kf_weixin_info: [
          { required: true, message: "请输入微信名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        kf_phone_info: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ]
      }
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