<template>
  <div class="index">
    <div class="head">
      <div class="bg-header"></div>
      <div class="bg-header"></div>
      <!-- <div class="bg-header"></div> -->
      <div class="shade">
        <div class="formCard">
          <div slot="title" style="overflow:hidden;">
            <span
              class="loginButton hvr-underline-from-center"
              :class="{active:cardFormShowing=='login'}"
            >登录</span>
            <!-- <span style="font-size:2rem;vertical-align:middle">&nbsp;·&nbsp;</span> -->
            <i class="far fa-circle" style="margin-left:1rem;margin-right:1rem;font-size:12px;"></i>
            <span
              class="signupButton hvr-underline-from-center"
              :class="{active:cardFormShowing=='signup'}"
            >注册</span>
            <!-- <el-button icon="el-icon-close" circle style="float:right;"></el-button> -->
          </div>
          <el-button
            icon="el-icon-close"
            style="position:absolute;right:1rem;top:1rem;"
            circle
            @click="hideBar"
          ></el-button>
          <el-divider></el-divider>
          <div class="loginForm" v-show="cardFormShowing=='login'">
            <el-form
              id="login"
              status-icon
              label-position="top"
              label-width="80px"
              ref="loginform"
              :model="loginform"
              :rules="loginrule"
              hide-required-asterisk
              style="overflow:hidden;clear:both;"
            >
              <el-form-item prop="account">
                <div slot="label">
                  <el-popover placement="top" width="200" trigger="hover">
                    <h3>提示</h3>
                    <article>账号可以输入用户名或邮箱</article>
                    <div slot="reference">账号</div>
                  </el-popover>
                </div>
                <el-input v-model="loginform.account" clearable placeholder="请输入邮箱/用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  v-model="loginform.pass"
                  show-password
                  clearable
                  placeholder="输入密码"
                  @keyup.enter.native="startLogin"
                ></el-input>
              </el-form-item>
              <el-form-item class="rememberMe" style="float:left;">
                <el-switch v-model="loginform.remember"></el-switch>
                <span style="margin-left:.2rem;">下次自动登录</span>
              </el-form-item>
              <el-form-item class="forgetpassword" style="float:right">
                <el-button type="text">忘记密码?</el-button>
              </el-form-item>

              <el-button
                type="primary"
                style="width:100%;"
                round
                @click="startLogin"
                :loading="loginLoading"
              >登录</el-button>
              <div style="margin-top:2rem;" v-if="hasSocialMethods">
                <el-divider>社交帐号登录</el-divider>
                <ul class="socialMethods">
                  <li>QQ</li>
                  <li>QQ</li>
                  <li>QQ</li>
                  <li>QQ</li>
                </ul>
              </div>
            </el-form>
          </div>
          <div class="signupForm" v-show="cardFormShowing=='signup'" style="overflow:hidden;">
            <el-form
              id="signup"
              status-icon
              label-position="left"
              label-width="80px"
              ref="signupform"
              :model="signupform"
              :rules="signuprule"
              hide-required-asterisk
              size="medium"
            >
              <el-form-item label="用户名" prop="username">
                <el-popover placement="top" width="200" trigger="hover">
                  <h3>提示</h3>
                  <article>用户名可以作为你登录时输入的账号</article>
                  <el-input slot="reference" v-model="signupform.username" placeholder="输入你的用户名"></el-input>
                </el-popover>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="signupform.nickname" placeholder="起个名字吧"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <!-- <span slot="label">
                  <el-popover placement="top" width="200" trigger="hover">
                    <h3>密码要求</h3>
                    <article>长度为6到16个字符</article>
                    <article>包含字母、数字和符号</article>
                    <el-link slot="reference">密码</el-link>
                  </el-popover>
                </span>-->
                <el-popover placement="top" width="200" trigger="hover">
                  <h3>密码要求</h3>
                  <article>长度为6到16个字符</article>
                  <article>必须包含大小写字母、数字，可以使用特殊符号</article>

                  <el-input
                    slot="reference"
                    v-model="signupform.password"
                    show-password
                    placeholder="输入密码"
                  ></el-input>
                  <el-button
                    type="info"
                    size="small"
                    style="margin-top:5px;"
                    @click="generatePassword"
                  >帮你生成密码</el-button>
                </el-popover>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirm_password">
                <el-input v-model="signupform.confirm_password" show-password placeholder="再输入一次"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email_address">
                <el-input v-model="signupform.email_address" placeholder="输入邮箱地址">
                  <!-- <el-button slot="append" @click="sendVerifyCode" :disabled="!email_legal">获取验证码</el-button> -->
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="验证码" prop="verify_code">
                <el-input v-model="signupform.verify_code" placeholder="输入验证码"></el-input>
              </el-form-item>-->
              <el-form-item style="text-align:left;">
                <span slot="label">
                  <el-link href target="_blank">使用协议</el-link>
                </span>
                <el-checkbox-button label="我已阅读并同意" name="type" v-model="signupform.agreement"></el-checkbox-button>
              </el-form-item>
              <!-- <el-form-item style="text-align:right;">
              <el-switch v-model="signupform.agreement"></el-switch>
              <span style="margin-left:.4rem;">
                同意
                <el-button type="text">《使用协议》</el-button>
              </span>
              </el-form-item>-->
              <el-button
                type="primary"
                style="width:100%;"
                :disabled="!signupform.agreement"
                @click="signup"
                :loading="signupLoading"
                round
              >注册</el-button>
            </el-form>
          </div>
          <!-- <router-view></router-view> -->
        </div>
      </div>
      <div class="topbar">
        <a class="logo hvr-pulse-grow" style="display:block;text-decoration:none;" href>TEC CLUB</a>
        <el-drawer :visible.sync="drawer_opened" direction="ttb" size="auto">
          <div slot="title" id="drawer-title">
            TEC CLUB
            <small style="color:#666;font-size:1rem;margin-left:.3rem;">四川大学腾讯俱乐部</small>
          </div>

          <div class="drawer-items">
            <div class="drawer-item">
              <div
                class="link-item scroll-trigger hvr-outline-in"
                @click="handleDrawer('Notifications')"
              >Notifications</div>
            </div>
            <div class="drawer-item">
              <div
                class="link-item scroll-trigger hvr-outline-in"
                @click="handleDrawer('About')"
              >About</div>
            </div>
            <div class="drawer-item">
              <div
                class="link-item scroll-trigger hvr-outline-in"
                @click="handleDrawer('Contact')"
              >Contact</div>
            </div>
            <div class="drawer-item">
              <div
                class="link-item scroll-trigger hvr-outline-in"
                @click="handleDrawer('Enter')"
              >Enter</div>
            </div>
            <el-divider>{{NickName}}</el-divider>
            <div class="drawer-item" style="overflow:hidden" v-show="!loged">
              <el-button type="primary" class="hvr-buzz" @click="handleDrawer('login')">登录</el-button>
              <el-button style="float:right" class="hvr-buzz" @click="handleDrawer('signup')">注册</el-button>
            </div>
            <div class="drawer-item" v-show="loged">
              <a class="link-item hvr-outline-in" @click="handleDropdown('enter_home')">进入主页</a>
            </div>
            <div class="drawer-item" v-show="loged">
              <a class="link-item hvr-outline-in" @click="handleDropdown('personal_center')">个人中心</a>
            </div>
            <div class="drawer-item" v-show="loged">
              <a class="link-item hvr-outline-in" @click="handleDropdown('new_inform')">新建通知</a>
            </div>
            <div class="drawer-item" v-show="loged">
              <a class="link-item hvr-outline-in">其它功能</a>
            </div>
            <div class="drawer-item" v-show="loged">
              <a class="link-item hvr-outline-in" @click="handleDropdown('quit_login')">退出登录</a>
            </div>
          </div>
        </el-drawer>
        <div class="menu-trigger hidden-lg-and-up hvr-grow-shadow" @click="drawer_opened=true">
          <i class="fas fa-bars" style="color:#e5e5e5;font-size:30px;"></i>
        </div>
        <div class="items hidden-md-and-down">
          <a class="menu-item hvr-outline-in scroll-trigger" href="#Notifications">Notifications</a>
          <a class="menu-item hvr-outline-in scroll-trigger" href="#About">ABOUT</a>
          <a class="menu-item hvr-outline-in scroll-trigger" href="#Contact">Contact</a>
          <!-- <el-button type="text" class="item">按钮1</el-button>
        <el-button type="text" class="item">按钮2</el-button>
          <el-button type="text" class="item">按钮3</el-button>-->
        </div>

        <!-- <button class="login">登录</button> -->
        <!-- <button class="signup">注册</button> -->
        <!-- <div>
        
        <el-button round>登录</el-button>
        <el-divider direction="vertical"></el-divider>
        
        <el-button type="primary" round>注册</el-button>
        </div>-->
        <!-- 只有大屏幕才显示，其它屏幕直接隐藏成菜单栏 -->
        <div class="hidden-md-and-down">
          <el-avatar
            class="avatar hvr-float-shadow"
            icon="el-icon-user-solid"
            v-show="!loged"
            size="large"
          ></el-avatar>
          <el-dropdown @command="handleDropdown">
            <el-avatar
              class="avatar-loged hvr-float-shadow"
              :src="loginform.avator"
              v-show="loged"
              size="large"
              fit="scale-down"
            ></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="enter_home">进入主页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-user" command="personal_center">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command="new_inform">新建通知</el-dropdown-item>
              <el-dropdown-item icon="el-icon-link" command="other_function">其它功能</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" divided command="quit_login">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span
            class="loginNickName"
            style="position:relative;color:#e5e5e5;left:10px;"
          >{{ NickName }}</span>
          <!-- <el-button icon="el-icon-user-solid" @click="onClickAvatar" circle></el-button> -->
        </div>
      </div>
      <el-row type="flex" justify="center">
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <div class="center_wrap" style="display:none">
            <div class="title">SCU Tencent Club</div>

            <div class="desc hidden-xs-only">致力于为川大师生提供一个了解腾讯、了解互联网企业的平台，同时提供最新的招聘信息与腾讯于校园落地活动的信息</div>
            <div class="learnmore">
              <el-button
                type="primary"
                style="font-size:18px;text-transform:uppercase;font-family: 'Anton', sans-serif;letter-spacing:2px;"
                class="hvr-icon-forward"
                size="large"
                @click="goToHome"
              >
                Enter
                <i class="fas fa-angle-double-right hvr-icon"></i>
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="section-title">blog</div> -->
      <!-- <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <div slot="title">
        <span class="loginButton hvr-underline-from-center">登录</span>
        <span style="font-size:2rem;vertical-align:middle">&nbsp;·&nbsp;</span>
        <span class="signupButton hvr-underline-from-center">注册</span>
      </div>
      <router-view></router-view>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>-->
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
    <section id="Notifications">
      <div class="sec-title">Notifications</div>
      <div class="content">
        <!-- VueLazyLoad暂时不用，因为不好实现无法加载的提醒，但其实应该是用这个 -->
        <!-- <img style="height:300px;width:100%; display: block;" class="cardImg" v-lazy="testURL" /> -->

        <!-- ！！！ -->
        <!-- 以下是带图片的通知卡片，但是通知很少有图片，所以准备做一个不带图片的通知卡片 -->

        <!-- <el-col :sm="24" :md="12" :lg="6" class="not-col">
          <el-card :body-style="{ padding: '0px'}" shadow="hover">
            <el-image
              src="http://localhost:3000/public/images/progressiveImages/bg3P.jpg"
              style="width: 100%;height:300px;"
              fit="cover"
              lazy
            >
              <div slot="placeholder" style="height:inherit;">
                <img :src="loadingURL" style="width:100%;height:300px;object-fit:none;" />
              </div>
            </el-image>
            <div style="padding: 14px;">Title</div>
          </el-card>
        </el-col>-->

        <!-- ！！！ -->

        <!-- 这个是无图像通知卡片 -->
        <el-col :sm="24" :md="12" :lg="8" class="not-col">
          <el-card>
            <div slot="header" class="not-header clearfix" style="text-align:left;overflow:hidden;">
              <h3 style="padding:2px 0;display:inline-block">开学通知</h3>
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                <el-button
                  type="primary"
                  style="float:right;font-size:18px;margin:10px 0px;"
                  circle
                  plain
                  icon="el-icon-more"
                ></el-button>
              </el-tooltip>
            </div>
            <div
              class="not-main-content"
            >各位同学，提醒各位请尽快办理入住手续，及时交书费、学费以及住宿费。各位同学，提醒各位请尽快办理入住手续，及时交书费、学费以及住宿费。各位同学，提醒各位请尽快办理入住手续，及时交书费、学费以及住宿费。</div>
          </el-card>
        </el-col>
      </div>
      <div class="footer">
        <el-button type="primary" icon="el-icon-s-opportunity" round>查看更多</el-button>
      </div>
    </section>
    <section id="About">
      <div class="sec-title">
        About us
        <div
          class="subtitle"
          style="color:#aaa;font-size:18px;letter-spacing:30px;margin-left:15px;"
        >关于我们</div>
      </div>
      <div class="content">
        <p>外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面外面</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat, corporis laboriosam, sit vitae eveniet cum voluptatibus fuga exercitationem blanditiis hic qui alias eligendi, unde ullam expedita vero iste sed?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat, corporis laboriosam, sit vitae eveniet cum voluptatibus fuga exercitationem blanditiis hic qui alias eligendi, unde ullam expedita vero iste sed?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaerat, corporis laboriosam, sit vitae eveniet cum voluptatibus fuga exercitationem blanditiis hic qui alias eligendi, unde ullam expedita vero iste sed?</p>
      </div>
    </section>
    <section id="Contact">
      <div class="sec-title">
        Contact us
        <div class="subtitle" style="font-size:18px;letter-spacing:30px;margin-left:15px;">联系我们</div>
      </div>
      <div class="content">
        <el-col :sm="24" :md="12" style="padding-left:20px;padding-right:20px;">
          <el-input placeholder="Your Name *" suffix-icon="el-icon-user" v-model="contactForm.name"></el-input>
          <el-input
            placeholder="Your Email *"
            suffix-icon="el-icon-message"
            v-model="contactForm.email"
          ></el-input>
          <el-input
            placeholder="Your Phone *"
            suffix-icon="el-icon-mobile-phone"
            v-model.number="contactForm.phone"
          ></el-input>
        </el-col>
        <el-col :sm="24" :md="12" style="padding-left:20px;padding-right:20px;">
          <el-input
            type="textarea"
            rows="8"
            placeholder="Your Message *"
            v-model="contactForm.message"
          ></el-input>
        </el-col>
        <div class="footer" style="margin-top:50px;">
          <button
            class="hvr-bounce-to-right hvr-icon-forward"
            style="background-color:#333;color:white;border:none;padding:15px 25px;border-radius:5px;font-size:18px;text-transform:uppercase;font-family: 'Anton', sans-serif;letter-spacing:2px;"
            @click="sendFeedback"
          >
            Send It!
            <i class="fas fa-chevron-right hvr-icon"></i>
          </button>
        </div>
      </div>
    </section>
    <div id="footer">
      <el-col :sm="24" :md="{span:12, offset:6}" :lg="{span:8,offset:8}">
        <p
          style="letter-spacing: 1.5px;font-size:18px;font-family: 'Ubuntu', sans-serif;"
        >SCU TEC &copy; Copyright 2019.</p>
        <p style="font-family: 'Beth Ellen', cursive; ">Designed By AnCo</p>
      </el-col>
    </div>
    <div class="backToTop hvr-icon-bob animated infinite pulse delay-5s">
      <el-tooltip effect="dark" content="回到顶部" placement="top">
        <el-button plain round type="primary" style="transition:all .3s" @click="goBackToTop">
          <i class="fas fa-angle-up hvr-icon"></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import $ from "jquery";
export default {
  name: "index",
  // components: {
  //   HelloWorld
  // }
  data() {
    // var validateVerifycode = (rule, value, callback) => {
    //   if (value === "") {
    //     callback("请输入验证码");
    //   } else {
    //     //从服务器验证验证码是否正确
    //     setTimeout(function() {
    //       callback();
    //     }, 1000);
    //   }
    // };

    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback("请输入用户名");
      } else {
        //向服务器请求是否有重名用户,重名则callback错误
        setTimeout(function() {
          //待改
          callback();
        }, 1000);
      }
    };
    var validateEmail = (rule, value, callback) => {
      let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!pattern.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        this.email_legal = true;
        // console.log(this.email_legal);
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pattern.test(value)) {
        callback(new Error("密码不符合规则"));
      } else {
        callback();
      }
    };
    //验证确认密码的validator需要自定义：因为要比较两个密码是否相同
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signupform.password) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //contact
      contactForm: {
        name: "",
        email: "",
        phone: "",
        message: ""
      },

      loadingURL: "http://localhost:3000/public/images/loading.gif",
      testURL: "http://localhost:3000/public/images/progressiveImages/bg1P.jpg",
      //加载布尔值
      loginLoading: false,
      signupLoading: false,
      //密码难度
      // passwordDifficulty: 0,
      //其它参数
      drawer_opened: false,
      hasSocialMethods: false,
      // input: "",
      loged: false,
      cardFormShowing: "",
      NickName: "👈请登录",
      // centerDialogVisible: false,
      //登录可以使用
      //u_id/username/email进行，这里account其实是代表三种
      loginform: {
        account: "",
        pass: "",
        remember: true,
        avator: "https://avatars.dicebear.com/v2/identicon/default.svg"
      },
      email_legal: false, //邮箱是否合法
      signupform: {
        username: "",
        nickname: "",
        password: "",
        confirm_password: "",
        email_address: "",
        // verify_code: "",
        agreement: false
      },
      // 登录表单验证
      loginrule: {
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ]
      },
      //注册的表单验证
      signuprule: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "起个名字再走",
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        confirm_password: [
          {
            validator: validateConfirmPassword,
            trigger: "blur"
          }
        ],
        email_address: [
          {
            validator: validateEmail,
            trigger: "blur"
          }
        ]
        // verify_code: [
        //   {
        //     validator: validateVerifycode,
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },

  computed: {
    // signFormPassed: function() {
    //   console.log(this); //
    //   this.$refs["signupform"].validate(function(res, object) {
    //     console.log(res);
    //     return res && this.signupform.agreement;
    //   });
    //   console.log("pre out");
    //   // return result && this.signupform.agreement;
    // }
  },
  created() {},

  mounted() {
    this.$nextTick(function() {
      // 这里注册本页事件
      console.log("DOM渲染完成，JQuery可以执行！");

      $(".center_wrap").fadeIn(2000);
      $(".bg-header").css("background-color", "#aaa");
      var self = this;
      $(".avatar").on("click", function() {
        // self.centerDialogVisible = true;

        self.showBar("login");
        // self.$router.push("login");
      });

      $(".loginButton").on("click", function() {
        // self.$router.push("login");
        self.cardFormShowing = "login";
        self.$refs["signupform"].resetFields();
        self.email_legal = false;
      });

      $(".signupButton").on("click", function() {
        // self.$router.push("signup");
        self.cardFormShowing = "signup";
        self.$refs["loginform"].resetFields();
        self.email_legal = false;
      });

      // $(".shade").on("click", function() {
      //   self.hideBar();
      // });

      // 这里开始切换壁纸
      console.log($(".bg-header"));
      let bg1 = $($(".bg-header")[0]);

      let bg2 = $($(".bg-header")[1]);
      // bg2.css("background-image", "url(../assets/bg2.jpg)");

      let image_list = []; //通过后端拿到list...然后再用后端的图片
      //现在这种localhost图片只能电脑测试，不能在其它地址，因为别的设备拿不到localhost
      //可以直接把这个写css里面
      bg1.css(
        "background-image",
        "url(http://localhost:3000/public/images/progressiveImages/bg2P.jpg)"
      );
      bg2.css(
        "background-image",
        "url(http://localhost:3000/public/images/progressiveImages/bg3P.jpg)"
      );

      bg1.hide();
      setInterval(function() {
        bg1.fadeToggle(1000);
        bg2.fadeToggle(1000);
        // 可以留多一点的图片列表，方便css切换
        // 由于webpack打包之后图片名称无法确定，所以只能使用云端的图片，应该可以使用本地后端的图片
      }, 8000);
      // 从本地后端资源服务器取图片 OK!
      // bg2.css(
      //   "background-image",
      //   "url(http://127.0.0.1:3000/public/images/bg2.jpg)"
      // );
      // console.log($('a.scroll-trigger[href*="#"]'));

      //绑定顶部按钮实现页面滚动

      $("a.scroll-trigger").click(function() {
        // console.log(this.hash);
        // self.drawer_opened = false;
        // console.log(1);
        // console.log(self, this);
        var target = $(this.hash);
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            "easeInOutExpo"
          );
          return false;
        }
      });

      $(document).scroll(function() {
        let scrH = $(document).scrollTop();
        if (scrH > 300) {
          // console.log("in");
          if (!$(".backToTop").hasClass("active")) {
            console.log(2);
            $(".backToTop").fadeIn(500);

            $(".backToTop").addClass("active");
          }

          // $(".backToTop").fadeIn();
        } else {
          // console.log("out");
          if ($(".backToTop").hasClass("active")) {
            console.log(1);
            $(".backToTop").fadeOut(500);
            $(".backToTop").removeClass("active");
          }
        }
      });

      //测试users get 拿数据
      $.get("http://127.0.0.1:3000/users", function(data, status) {
        console.log(data, status);
      });

      //验证是否已经登录
      axios
        .get("http://localhost:3000/login")
        .then(res => {
          console.log(res);
          if (res.data.res === "success") {
            if (res.data.code === 0) {
              this.$notify.success({
                title: "欢迎回来!"
              });
              if (res.data.userinfo.pending === 1) {
                this.$message.warning({
                  title: "您还未验证账户",
                  message: "您的账户目前处于PENDING状态，请查看邮件并填写验证码"
                });
              }
              this.$store.commit("LogIn", res.data.userinfo);
              self.NickName = res.data.userinfo.nickname;
              //设置为已登录
              self.loged = true;
              // $(".avatar-loged img").attr("src", res.data.userinfo.avator);
              self.loginform.avator = res.data.userinfo.avator;
            }
          } else if (res.data.res === "error") {
            this.$notify.error({
              title: "您的登录已过期",
              message: "请重新登录"
            });
            this.$store.commit("LogOut");
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  methods: {
    // preventScroll(event) {
    //   event.preventDefault();
    // },
    showBar(name) {
      let self = this;
      //禁止滚动
      $("body").css("overflow-y", "hidden");
      self.cardFormShowing = name; //默认显示登录
      $(".shade").fadeIn();
      // $("body").on("scroll", self.preventScroll(event));
      // $("html").addClass("popover");
      // $(".loginButton").addClass("active");
    },

    hideBar() {
      let self = this;
      //启用滚动
      $("body").css("overflow-y", "auto");

      $(".shade").fadeOut();

      // $("html").removeClass("popover");
      // $("body").off("scroll", self.preventScroll(event));
      // this.cardFormShowing = "hide";
      this.$refs["signupform"].resetFields();
      this.$refs["loginform"].resetFields();
    },

    //弃用
    // sendVerifyCode() {
    //   //调用后端发送邮件到这个地址
    //   // console.log(this.$refs["signupform"].validateField("email_address"));
    //   // alert("发送验证码到邮箱" + this.signupform.email_address);
    //   let self = this;
    //   setTimeout(function() {
    //     self.$notify({
    //       title: "成功",
    //       message: `已发送到${self.signupform.email_address}邮箱`,
    //       type: "success"
    //     });
    //   }, 1000);
    // },
    async startLogin() {
      //进入loading
      this.loginLoading = true;
      var self = this;
      let reval = await axios
        .post("http://localhost:3000/login", {
          loginform: self.loginform
        })
        .catch(err => {
          // 异常处理
          this.$notify.error({
            title: "错误",
            message: "服务器异常,请联系管理员"
          });
          //验证后,需要将loading关掉
          self.loginLoading = false;
          self.hideBar();
          return;
        });
      // 开始检查返回数据
      console.log(reval);
      if (reval.data.res === "success") {
        if (reval.data.code === 0) {
          this.$notify.success({
            title: "欢迎你!"
          });
        } else if (reval.data.code === 1) {
          this.$notify.success({
            title: "欢迎回来!"
          });
        } else {
          alert("您已登录，但是可能服务器存在问题");
        }
        // console.log(reval.data.userinfo.pending);
        this.$store.commit("LogIn", reval.data.userinfo);

        if (reval.data.userinfo.pending === 1) {
          this.$message.warning({
            title: "您还未验证账户",
            message: "您的账户目前处于PENDING状态，请查看邮件并填写验证码"
          });
        }
        //这里需要设置用户名和头像
        //设置名 应该是从后端拿到然后返回一个username
        self.NickName = reval.data.userinfo.nickname;
        //设置为已登录
        self.loged = true;
        //先设置再hide，hide后会清空
        self.hideBar();
        //头像可以用前台返回的数据
        //设置头像 也是从后端拿到路径然后设置 没有头像的就默认
        // 头像生成可以考虑用
        //http://www.htmleaf.com/jQuery/jquery-tools/201906285712.html
        //这个是Avatars库，用来生成头像，后端可以考虑使用

        //将头像设置在loged的img里面
        // console.log($(".avatar-loged img"));
        $(".avatar-loged img").attr("src", reval.data.userinfo.avator);
      } else if (reval.data.res === "error" && reval.data.code === 100) {
        this.$notify.warning({
          title: "密码有误"
        });
      } else if (reval.data.res === "error" && reval.data.code === 200) {
        this.$notify.warning({
          title: "用户名不存在"
        });
      } else {
        alert("其它错误", reval.data.code);
      }

      //验证后,需要将loading关掉
      self.loginLoading = false;

      // setTimeout(function() {
      //   if (
      //     self.loginform.account === "anco" &&
      //     self.loginform.pass === "Sjy525923"
      //   ) {
      //     self.$notify({
      //       title: "欢迎你!",
      //       type: "success"
      //     });

      //   } else {
      //     self.$notify.error({
      //       title: "错误",
      //       message: "无该用户或密码错误"
      //     });
      //   }
      // }, 1000);
    },

    handleDropdown(command) {
      // alert(3);
      switch (command) {
        case "personal_center":
          if (this.drawer_opened) {
            this.drawer_opened = false;
          }
          this.gotoPersonalCenter();
          break;
        case "new_inform":
          if (this.drawer_opened) {
            this.drawer_opened = false;
          }
          this.gotoNewInform();
          break;
        case "quit_login":
          // alert(2);
          this.logout();
          break;
        case "enter_home":
          this.goToHome();
          break;
        default:
          break;
      }
    },

    goToHome() {
      if (this.$store.getters.getStoreLoginStatus) {
        this.$notify({
          type: "info",
          title: "进入主页"
        });
      } else {
        this.$notify({
          type: "info",
          title: "请先登录"
        });
      }
      this.$router.push("home");
    },

    gotoPersonalCenter() {
      this.$notify({
        type: "success",
        title: "进入个人中心"
      });
    },

    gotoNewInform() {
      this.$notify({
        type: "success",
        title: "新建通知"
      });
    },

    //弃用
    // quitLogin() {
    //   // alert(1);
    //   this.loged = false;
    //   let username = this.NickName;
    //   this.NickName = "👈请登录";

    //   //可能还需要先给服务器通信，告诉服务器它注销了

    //   //最后提示用户退出成功
    //   this.$notify.success({
    //     title: "退出成功",
    //     message: `用户${username}成功退出`
    //   });
    // },

    //注册
    async signup() {
      this.signupLoading = true;
      // console.log(this.signFormPassed);
      let result = await axios
        .post("http://localhost:3000/signup", {
          signupform: this.signupform
        })
        .catch(err => {
          this.signupLoading = false;
          this.$message({
            showClose: true,
            message: `出错,${err.message}`,
            type: "error"
          });
          console.log(err);
        });
      this.signupLoading = false;

      if (result.data.success) {
        this.hideBar();
        this.$notify.success({
          title: "注册成功",
          message: "请查收邮箱并验证邮箱账户以实现绑定"
        });

        // prompt("请输入验证码");
        // this.$prompt({
        //   title: "测试",
        //   message: "请输入验证码"
        // });
        this.$prompt("请输入验证码", "重要", {
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              console.log("确认");
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "验证中...";
              (async function() {
                let captchaData = await axios
                  .get("http://localhost:3000/signup")
                  .catch(err => {
                    console.log(err);
                  });
                // console.log(instance);
                if (instance.inputValue == captchaData.data.captcha) {
                  done();
                  //访问一个put接口将pending update为0
                  axios
                    .put("http://localhost:3000/signup", {
                      uid: result.data.uid
                    })
                    .then(res => {
                      this.$notify.success({
                        title: "验证通过",
                        message: "账号绑定成功，请重新登录"
                      });
                    })
                    .catch(_ => {
                      console.log(_);
                    });
                } else {
                  instance.confirmButtonLoading = false;
                  instance.confirmButtonText = "请重试...";
                }
              }.call(this));
            } else {
              done();
            }
          }
        })
          .then(_ => {})
          .catch(_ => {});
      }
      // console.log(result);

      // console.log(result);
    },

    handleDrawer(command) {
      switch (command) {
        case "login":
          this.drawer_opened = false;
          this.showBar("login");
          break;
        case "signup":
          this.drawer_opened = false;
          this.showBar("signup");
          break;
        case "Notifications":
          this.drawer_opened = false;
          var target = $("#Notifications");
          if (target.length) {
            $("html, body").animate(
              {
                scrollTop: target.offset().top
              },
              1000,
              "easeInOutExpo"
            );
          }
          break;
        case "Contact":
          this.drawer_opened = false;
          var target = $("#Contact");
          if (target.length) {
            $("html, body").animate(
              {
                scrollTop: target.offset().top
              },
              1000,
              "easeInOutExpo"
            );
          }
          break;
        case "About":
          this.drawer_opened = false;
          var target = $("#About");
          if (target.length) {
            $("html, body").animate(
              {
                scrollTop: target.offset().top
              },
              1000,
              "easeInOutExpo"
            );
          }
          break;
        case "Enter":
          this.goToHome();
          break;
      }
    },

    async logout() {
      let res = await axios.delete("http://localhost:3000/login").catch(err => {
        console.log(err);
      });

      console.log("res", res);
      if (res.data.res === "success") {
        if (res.data.code === 0) {
          this.loged = false;
          this.NickName = "👈请登录";
          this.$store.commit("LogOut"); //退出再说

          this.$notify.success({
            title: "已退出"
          });
        } else if (res.data.code === 1) {
          this.$notify.warning({
            title: "您未登录"
          });
          this.$store.commit("LogOut"); //已退出 就更新以下vuex
          this.loged = false;
          this.NickName = "👈请登录";
          this.hideBar();
        }
      } else {
        this.$notify.error({
          title: "注销出错"
        });
      }
    },

    generatePassword() {
      function randomPassword(size) {
        let seed = new Array(
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "m",
          "n",
          "p",
          "Q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "+",
          "-",
          "*",
          "/",
          "#",
          "#",
          "@",
          "!",
          "$",
          "(",
          ")",
          "="
        ); //数组
        let seedlength = seed.length; //数组长度
        let createPassword = "";
        for (let i = 0; i < size; i++) {
          let j = Math.floor(Math.random() * seedlength);
          createPassword += seed[j];
        }
        return createPassword;
      }

      let size = Math.floor(Math.random() * 11) + 6; //可以生成6-16位
      // size += Math.floor(Math.random() * 10); //+=一个0-9内的数字,使长度满足6-16
      let result = randomPassword(size);
      let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
      while (!pattern.test(result)) {
        result = randomPassword(size);
      }
      this.signupform.password = result;
      this.$refs["signupform"].validateField("password");
    },
    goBackToTop() {
      // console.log(1);
      $("html, body").animate(
        {
          scrollTop: 0
        },
        1000,
        "easeInOutExpo"
      );
    },
    sendFeedback() {
      let contactForm = this.contactForm;
      //验证contactForm
      this.$notify({
        type: "info",
        title: "待完成发送反馈功能"
      });
    }
  }
};
</script>

<style scoped>
.index {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  min-width: 300px;
  display: flex;
  flex-flow: nowrap column;
}
img.cardImg {
  object-fit: cover;
}

/*阴影*/
/* .is-hover-shadow:hover {
  box-shadow: 0 1px 15px 2px rgba(0, 0, 0, 0.2) !important;
} */

img[lazy="loading"],
img[lazy="error"] {
  object-fit: none;
}

.not-col {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.not-main-content {
  line-height: 1.5rem;
  letter-spacing: 2px;
}

.head {
  min-height: 100vh;
  height: 100vh;
}

.loginForm {
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
}

.formCard {
  position: relative;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 200;
  width: 30%;
  margin: 0 auto;
  margin-top: 15vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.loginButton,
.signupButton {
  font-size: 1.2rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.2rem;
  transition: 200ms color ease-in-out;
  transition: 200ms background-color ease-in-out;
}

.loginButton.active,
.signupButton.active {
  color: white;
  background-color: #333;
}

.loginButton:hover,
.signupButton:hover {
  cursor: pointer;
}

.socialMethods {
  list-style: none;
  margin: 0;
  padding: 0;
}
.socialMethods li {
  display: inline-block;
  margin-left: 1rem;
  margin-right: 1rem;
}
.shade {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: none;
}
.bg-header {
  position: absolute;
  width: 100%;
  height: 100vh;
  /* background-image: url(../assets/bg.jpg); */
  background-blend-mode: multiply;
  /* background-color: #aaa; */
  background-size: cover;
  background-position: center;
  z-index: -1;
  transition: 2s background-color ease-in-out;
}

.topbar {
  display: flex;
  flex-flow: nowrap row;
  width: 80%;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 2rem;

  background-color: transparent;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  border-radius: 1rem;
  align-items: center;
}
.drawer-height {
  height: auto !important;
}
.drawer-items {
  padding: 20px;
  padding-top: 0px;
}
.drawer-items .drawer-item:first-child {
  padding-top: 0px;
}
.drawer-items .drawer-item {
  padding: 5px;
  padding-left: 0px;
}
.drawer-items .drawer-item:last-child {
  margin-bottom: 5px;
}

.drawer-items .drawer-item .link-item {
  font-family: "Droid Serif", "Kaushan Serif", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  padding: 0.5rem;
  border-radius: 0.2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-decoration: none;
  transition: 200ms color ease-in-out;

  transition: 200ms background-color ease-in-out;
}
.drawer-items .drawer-item .link-item:hover {
  color: white;
  cursor: pointer;

  background-color: black;
}
#drawer-title {
  font-size: 2rem;
  color: #333;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
/* .topbar.fixed { */
/* position: fixed; */
/* position: absolute; */
/* width: 96%; */
/* background-color: rgba(255, 255, 255, 0.3); */
/* } */

/* .item {
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: 1rem;
  color: #333;
} */

.logo {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  /* font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", */
  /* Arial, sans-serif; */
  /* font-family: K2D, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol"; */
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  color: #e5e5e5;
}

.logo:hover {
  cursor: pointer;
}
.menu-item {
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",
    Arial, sans-serif;
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: 1.2rem;
  padding: 0.5rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  border-radius: 0.2rem;
  color: #e5e5e5;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-decoration: none;
  transition: 200ms color ease-in-out;

  transition: 200ms background-color ease-in-out;
}

.menu-item:hover {
  color: white;

  background-color: black;
}

/* .menu-active {
  background-color: #409eff;
  color: white;
} */

.avatar:hover {
  cursor: pointer;
}

.center_wrap {
  margin-top: 10rem;
}

.center_wrap .title {
  color: #e5e5e5;
  text-transform: uppercase;
  /* font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif; */
  /* font-family: "Righteous", cursive; */
  font-family: "Play", sans-serif;
  font-weight: 600;
  font-size: 4rem;
  letter-spacing: 0.8rem;
}

.center_wrap .desc {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  margin-top: 2.4rem;
  color: #e5e5e5;
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: 0.3rem;
  /* text-shadow: 0 0 0 #333; */
}

.center_wrap .learnmore {
  text-align: left;
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #333;
  letter-spacing: 0.2rem;
  margin: 2rem auto;
  width: 20%;
  font-family: "Times New Roman", Times, serif;
  border-top: 2px dotted #333;
  border-bottom: 2px dotted #333;
}

.avatar-loged:hover {
  cursor: pointer;
}

.menu-trigger:hover {
  cursor: pointer;
}

/*通知section*/
#Notifications,
#About,
#Contact {
  padding: 150px 0px;
}
#About {
  background-image: url(../assets/progressiveImages/aboutP.jpg);
  background-color: #444;
  background-blend-mode: multiply;
  color: #e5e5e5;
}
#Notifications .sec-title,
#About .sec-title,
#Contact .sec-title {
  font-size: 45px;
  text-transform: uppercase;
  font-family: "Cinzel", serif;
  letter-spacing: 2px;
  margin-bottom: 75px;
  color: #333;
}

#Notifications .content,
#About .content,
#Contact .content {
  max-width: 80%;
  margin: 75px auto;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
}
#About .sec-title {
  color: #f5f5f5;
}
#About .content {
  font-family: Lora, Times New Roman, serif;
  max-width: 50%;
  text-align: left;
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: 2px;
}
#Contact {
  background-image: url("../assets/contact-bg.jpg");
  background-size: cover;
  background-position: center;
}

#Contact .content {
  max-width: 60%;
}

#Contact .content .el-input,
#Contact .content .el-textarea {
  margin: 15px 0px;
}

#Contact .content .el-input input.el-input__inner {
  height: 50px !important;
}

#footer {
  /* background-image: url(../assets/map-image.png); */
  background-size: cover;
  /* background-color: #333; */
  background-position: center;
  background-blend-mode: exclusion;
  color: #333;
  background-repeat: no-repeat;
  padding-top: 75px;
  padding-bottom: 100px;
}

.backToTop {
  position: fixed;
  right: 75px;
  bottom: 100px;
  display: none;
  /* opacity: 0; */
  /* transition: opacity 1s ease-in-out; */
}

/* .backToTop.active {
   opacity: 1; 
 display: block;
  bottom: 110px; 
} */

/* .section-title::before,
.section-title::after {
  content: "";
  border-top: 2px solid #333;
  display: block;
  position: relative;
  width: 180px;
  top: 0px;
}

.section-title::before {
  left: 0px;
}
.section-title::after {
  right: 0px;
} */

@media (max-width: 800px) {
  .center_wrap {
    margin-top: 12rem;
  }
  .center_wrap .title {
    font-size: 2.8rem;
  }
  .center_wrap .desc {
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
    line-height: 1.3rem;
    width: 75%;
  }
  .formCard {
    width: 80vw;
    height: 100%;
    margin: 0 auto;
  }
  .loginForm {
    margin-top: 20%;
  }
  .signupForm {
    margin-top: 10%;
  }
  .center_wrap .learnmore {
    text-align: center;
  }

  #Contact .content {
    max-width: 80%;
  }
}

@media (max-width: 1000px) and (min-width: 800px) {
  .center_wrap .title {
    font-size: 3rem;
  }
  .center_wrap .desc {
    font-size: 0.8rem;
    letter-spacing: 0.2rem;
    line-height: 1.5rem;
    width: 65%;
  }

  .formCard {
    width: 60%;
  }

  .center_wrap .learnmore {
    text-align: center;
  }
}

@media (max-width: 1100px) and (min-width: 1000px) {
  .center_wrap .title {
    font-size: 3.8rem;
  }

  .center_wrap .desc {
    font-size: 0.9rem;
  }

  .formCard {
    width: 45%;
  }
}

@media (min-width: 1100px) and (max-width: 1350px) {
  .center_wrap .title {
    font-size: 4rem;
  }
  .center_wrap .desc {
    font-size: 1rem;
  }
}

@media (min-width: 1350px) {
  .center_wrap .title {
    font-size: 5rem;
  }
}
/* .signup {
  padding: 0.5rem;
  background-color: rgb(0, 132, 255);
  color: white;
  border-radius: 0.2rem;
  border: none;
}

.login {
  padding: 0.5rem;
  background-color: white;
  color: #333;
  border-radius: 0.2rem;
  border: 1px solid #ddd;
} */
</style>

