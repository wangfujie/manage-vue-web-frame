<template>
  <div class="login">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="loginForm">
      <h1 class="title">欢迎登录</h1>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="loginBtn" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //FormData方式传数据
          axios.post('/oauth/login', Qs.stringify(this.loginForm)).then(res=>{
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              // 将登录信息存入缓存中
              this.$store.commit('setUserInfo',{name:this.loginForm.username, authRole: "res.data.authorities[0].authority"});
              this.$router.push('/basic/welcomeHome.html');
          }).catch(function(error) {
            this.$message.error("登录失败，请确认账号和密码！");
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
  },
  mounted() {}
};
</script>

<style lang="less"  scoped>
  .login{
    height: 100%;
    .loginForm{
      box-shadow: 0 0 20px 4px #3c383742;
      position: relative;
      top: 30%;
      margin: 0 auto;
      width: 380px;
      background: -webkit-linear-gradient(left top,rgba(255,255,255,0.5),#fff);
      padding-bottom:10px; 
      padding: 35px 35px 15px 35px;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
      }

      .loginBtn {
        width: 100%;
        font-size: 20px;
        letter-spacing: 10px;
      }

      .el-form-item_content{
        margin-bottom: 22px;
      }
    }
  }
</style>