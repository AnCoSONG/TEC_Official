<template>
  <div class="Login">
    <div class="form">
      <router-link to="/login" class="title" id="login">登录</router-link>
      <span style="padding:10px;font-size:10px;">
        <i class="far fa-circle"></i>
      </span>
      <router-link to="/signup" class="title" id="signup">注册</router-link>
      <el-row class="line">
        <input type="text" class="input" placeholder="Username" v-model="loginform.account" />
      </el-row>
      <el-row class="line">
        <input type="password" class="input" placeholder="Password" v-model="loginform.password" />
      </el-row>
      <el-row class="line clearfix">
        <el-switch v-model="loginform.remember" active-text="记住我" style="float:right;"></el-switch>
        <router-link to style="text-decoration:none;float:left">忘记密码?</router-link>
      </el-row>
      <el-row class="line clearfix">
        <button type="submit" class="submit" style="width:100%;display:block">登录</button>
      </el-row>
    </div>
    <!-- <div class="form1">
      <h1 style="padding-top:100px;">登录</h1>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginform: {
        account: "",
        password: "",
        remember: true
      }
    };
  },
  created() {
    //首先验证登录态
    // axios.get("http://localhost:3000/login").then(res => {
    //   console.log(res);
    //   if (res.data.res === "success") {
    //     this.$store.commit("LogIn", res.data.userinfo);
    //     this.$router.push("home");
    //   }
    // });
  },
  methods: {
    async login() {}
  }
};
</script>

<style scoped>
.Login {
  background-color: #e5e5e5;
  height: 100vh;
}

.form {
  text-align: center;
  /* vertical-align: middle; */
  transform: translate(0, 40%);
  background-color: white;
  margin: 0 auto;
  width: 300px;
  background-color: white;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  letter-spacing: 1.5px;
  margin-bottom: 20px;
  font-size: 25px;
  padding: 10px;
  font-weight: 600;
  color: #666;
  display: inline-block;
  text-decoration: none;
}

.title#login {
  border-bottom: 2px solid #666;
}

.input {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: 200ms border-bottom ease-in-out;
}

.input:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.line {
  margin: 20px 0;
}

.line:first-child {
  margin-top: 40px;
}

.submit {
  border: 1px solid #333;
  padding: 10px 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}
.submit:hover {
  background-color: #333;
  color: #e5e5e5;
  cursor: pointer;
}

.input::-webkit-input-placeholder {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 20px;
  margin-bottom: 4px;
}
.input::-moz-placeholder {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 20px;
  margin-bottom: 4px;
}
</style>
