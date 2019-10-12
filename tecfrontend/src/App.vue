<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>-->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
//扩展
let pow = Math.pow,
  sqrt = Math.sqrt,
  sin = Math.sin,
  cos = Math.cos,
  PI = Math.PI,
  c1 = 1.70158,
  c2 = c1 * 1.525,
  c3 = c1 + 1,
  c4 = (2 * PI) / 3,
  c5 = (2 * PI) / 4.5;
$.extend($.easing, {
  easeInOutQuad: function(x) {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
  },
  easeInOutCubic: function(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
  },
  easeInOutExpo: function(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? pow(2, 20 * x - 10) / 2
      : (2 - pow(2, -20 * x + 10)) / 2;
  }
});

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=DM+Serif+Text|Playfair+Display|Righteous|Ubuntu|Cinzel|Play|Beth+Ellen|Anton|Varela+Round&display=swap");
#app {
  font-family: Karla, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
::-webkit-scrollbar-track {
  border-radius: 3px;
}
::-webkit-scrollbar-track-piece {
  /* display: none; */
  background-color: #333;
  border-radius: 3px;
}
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #aaa;
  background-clip: padding-box;
  min-height: 28px;
  /* transition: 1s background-color ease-in-out; */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #666;
}

.fade-enter {
  opacity: 0;
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
