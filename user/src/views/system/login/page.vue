<template>

  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li
          v-for="n in 10"
          :key="n"
        ></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center"
    >
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            时间是一切财富中最宝贵的财富
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
          <img
            class="page-login--logo"
            src="./image/logo@2x.png"
          >
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    placeholder="用户名"
                  >
                    <i
                      slot="prepend"
                      class="fa fa-user-circle-o"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    placeholder="密码"
                  >
                    <i
                      slot="prepend"
                      class="fa fa-keyboard-o"
                    ></i>
                  </el-input>
                </el-form-item>

                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login"
                >
                  登录
                </el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center"
            >
              <span @click="FindPwdFormVisible = true">
                <d2-icon name="question-circle" /> 忘记密码</span>
              <span @click="dialogFormVisible = true">注册用户</span>
            </p>
            <!-- quick login -->

          </div>
        </div>

        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              :command="language.value"
              @click="$i18n.locale = language.value"
            >
              {{ language.label }}
            </a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright
            <d2-icon name="copyright" />
            2018 NN内测平台
            <a href="https://github.com/FairyEver">
              @FairyEver
            </a>
          </p>
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
        </div>
      </div>
    </div>
        <!-- 注册表单 -->
        <div>
          <el-dialog
            title="欢迎注册NN内测平台!"
            :visible.sync="dialogFormVisible"
            width="450px"
          >
            <el-form
              :model="registerForm"
              :rules="rsrules"
              ref="regForm"
            >
              <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                prop="account"
              >
                <el-input
                  v-model="registerForm.account"
                  autocomplete="off"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <el-form-item
                label="密码"
                :label-width="formLabelWidth"
                prop="password"
              >
                <el-input
                  v-model="registerForm.password"
                  autocomplete="off"
                  show-password
                  maxlength="20"
                ></el-input>
              </el-form-item>

            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="registerUser()"
              >确 定</el-button>
            </div>
          </el-dialog>

        </div>

        <!-- 找回密码 -->
        <div>
          <el-dialog
            title="找回密码"
            :visible.sync="FindPwdFormVisible"
            width="450px"
          >
            <el-form
              :model="findPwdForm"
              :rules="rsrules"
              ref="findForm"
            >
              <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                prop="account"
              >
                <el-input
                  v-model="findPwdForm.account"
                  autocomplete="off"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <el-form-item
                label="验证码"
                :label-width="formLabelWidth"
                prop="captchCode"
              >
                <el-input
                  v-model="findPwdForm.captchCode"
                  autocomplete="off"
                  maxlength="4"
                  show-word-limit
                >
                  <el-button
                    slot="append"
                    icon="el-icon-position"
                    :loading=findPwdForm.captchCodeStatu
                    @click="getCaptchFindPwd()"
                  >{{findPwdForm.captchCodeTime}}</el-button>

                </el-input>
              </el-form-item>

              <el-form-item
                label="新密码"
                :label-width="formLabelWidth"
                prop="password"
              >
                <el-input
                  v-model="findPwdForm.password"
                  autocomplete="off"
                  show-password
                  maxlength="20"
                ></el-input>
              </el-form-item>

            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="FindPwdFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="findPassword()"
              >确 定</el-button>
            </div>
          </el-dialog>

        </div>
  </div>

</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import {
  getCaptchRegister,
  insertUserInfo,
  getCaptchFindPwd,
  updateUserPassword
} from "../../../api/sys.api.js";

export default {
  created() {
    this.$log.capsule(
      "欢迎访问~如需技术支持，请联系qq:397294213",
      "NN内测平台",
      "success"
    );
  },
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      dialogFormVisible: false,
      FindPwdFormVisible: false,
      //注册表单
      registerForm: {
        account: "",
        password: "",
        phone: "",
        captchCode: "",
        captchCodeStatu: false,
        captchCodeTime: "发送验证码"
      },
      //找回密码表单
      findPwdForm: {
        account: "",
        password: "",
        captchCode: "",
        captchCodeStatu: false,
        captchCodeTime: "发送验证码"
      },
      rsrules: {
        account: [
          {
            required: true,
            message: "请输入要注册的邮箱",
            trigger: "blur"
          },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          { min: 11, max: 11, message: "手机号码长度为11位", trigger: "blur" }
        ],
        captchCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          },
          { min: 4, max: 4, message: "验证码长度必须为4位", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      // 表单
      formLogin: {
        username: "",
        password: ""
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.submit();
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
    //获得注册验证码
    getCaptchRegister() {
      if (this.registerForm.phone.length != 11) {
        this.$notify({
          title: "提示",
          message: "手机号码有误",
          type: "warning"
        });
        return;
      }
      this.registerForm.captchCodeStatu = true;
      this.registerForm.captchCodeTime = "请稍等";
      getCaptchRegister(this.registerForm.phone)
        .then(res => {
          this.registerForm.captchCodeStatu = false;
          this.registerForm.captchCodeTime = "验证码发送成功";
        })
        .catch(() => {
          this.registerForm.captchCodeStatu = false;
          this.registerForm.captchCodeTime = "验证码发送失败";
        });
    },
    //获得找回密码验证码
    getCaptchFindPwd() {
      if (this.findPwdForm.account.length < 1) {
        this.$notify({
          title: "提示",
          message: "手机号码有误",
          type: "warning"
        });
        return;
      }
      this.findPwdForm.captchCodeStatu = true;
      this.findPwdForm.captchCodeTime = "请稍等";
      getCaptchFindPwd(this.findPwdForm.account)
        .then(res => {
          this.findPwdForm.captchCodeStatu = false;
          this.findPwdForm.captchCodeTime = "验证码发送成功";
        })
        .catch(() => {
          this.findPwdForm.captchCodeStatu = false;
          this.findPwdForm.captchCodeTime = "验证码发送失败";
        });
    },
    findPassword() {
      this.$refs.findForm.validate(valid => {
        if (valid) {
          updateUserPassword(
            this.findPwdForm.account,
            this.findPwdForm.password,
            this.findPwdForm.captchCode
          )
            .then(res => {
              this.FindPwdFormVisible = false;
              this.findPwdForm.account = "";
              this.findPwdForm.password = "";
              this.findPwdForm.captchCode = "";
              this.$notify({
                title: "提示",
                message: "密码重置成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$notify({
                title: "提示",
                message: "密码重置成功",
                type: "warning"
              });
            });
        } else {
          // 注册校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
    //注册
    registerUser() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          insertUserInfo(
            this.registerForm.account,
            this.registerForm.password,
          )
            .then(res => {
              this.dialogFormVisible = false;
              this.registerForm.account = "";
              this.registerForm.password = "";
              this.registerForm.phone = "";
              this.registerForm.captchCode = "";
              this.$notify({
                title: "提示",
                message: "注册成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$notify({
                title: "提示",
                message: "注册失败",
                type: "warning"
              });
            });
        } else {
          // 注册校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }

  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  .el-input-group__append {
    background-color: #409eff;
    color: #fff;
    border: #409eff;
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
