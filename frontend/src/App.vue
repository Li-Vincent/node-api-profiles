<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
    <loading v-show="loading"></loading>
    <common-footer></common-footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import CommonFooter from "./components/Footer";
import Loading from "./components/common/Loading";
import jwt_decode from "jwt-decode";

export default {
  name: "App",
  components: {
    NavBar,
    CommonFooter,
    Loading
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    // 解析token 并设置登录状态
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);

      // 获取当前时间
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // 处理token过期
        this.$store.dispatch("clearCurrentState");
        this.$router.push("/login");
      } else {
        this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
        this.$store.dispatch("setUser", decoded);
      }
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
.content {
  box-sizing: border-box;
  min-height: 100%;
  padding-top: 58.5px;
  padding-bottom: 72px;
}
</style>
