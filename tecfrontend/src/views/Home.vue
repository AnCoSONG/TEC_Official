<template>
  <div class="home">
    <el-container>
      <el-header height="auto">
        <div class="header-box">
          <a class="logo" href="/">TEC CLUB</a>
          <div class="menu">
            <el-input size="medium" placeholder="搜索" class="search">
              <i
                slot="suffix"
                id="searchButton"
                class="el-icon-search"
                style="height:100%;line-height:36px;"
              ></i>
            </el-input>
            <!-- <el-button icon="el-icon-search" type="primary"></el-button> -->
            <!-- <i class="far fa-minus-square"></i> -->
            <div class="menu-trigger">
              <i class="fas fa-minus-square trigger-icon"></i>
            </div>
          </div>
          <!-- <el-avatar :src="user_avatar"></el-avatar>  -->
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>
            <button>
              <input type="text" />
            </button>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      msg: "This is home page"
    };
  },
  computed: {
    user_avatar: function() {
      console.log(this.$store.state.USERINFO);
      return this.$store.state.USERINFO.avator;
    }
  },

  mounted() {
    let self = this;
    this.$nextTick(function() {
      $(".el-input__inner").on("focus", function() {
        console.log("focus");
        $(".el-input__inner").animate({ width: "300px" });
        $("#searchButton").css({ color: "#333", cursor: "pointer" });
      });
      $(".el-input__inner").on("blur", function() {
        console.log("blur");
        $(".el-input__inner").animate({ width: "200px" });

        $("#searchButton").css({ color: "#C0C4CC", cursor: "auto" });
      });
      console.log($(".menu-trigger"));
      $(".menu-trigger").on("mouseenter", function() {
        $(".trigger-icon").css("transform", "rotate(180deg)");
      });
      $(".menu-trigger").on("mouseleave", function() {
        $(".trigger-icon").css("transform", "rotate(0deg)");
      });
    });
  },
  methods: {}
};
</script>

<style scoped>
.home {
  background-color: rgba(0, 0, 0, 0.05);
  height: 100vh;
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.header-box {
  padding: 20px 40px;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  transition: all 200ms ease-in-out;
}

/* .header-box:hover {
  padding: 10px 40px;
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
  color: #333;
  display: block;
  text-decoration: none;
}
.logo:hover {
  cursor: pointer;
}

.menu {
  font-size: 40px;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-around;
  align-items: center;
}

.menu * {
  margin: 0 5px;
  transition: all 300ms ease-in-out;
}

.el-input__inner {
  width: 200px;
}
</style>

