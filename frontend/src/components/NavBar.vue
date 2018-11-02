<template>
  <nav class="navbar my-nav navbar-expand-sm navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">个人信息在线交流平台</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/profiles" class="nav-link">开发者们</router-link>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-show="isLogin">
          <router-link to="/posts" class="nav-link">留言板 </router-link>
        </li>
        <li class="nav-item" v-show="isLogin">
          <router-link to="/dashboard" v-if="user" class="nav-link"><img class="rounded-circle headerImg" :src="user.avatar" :alt="user.name">{{user.name}}</router-link>
        </li>
        <li class="nav-item" v-show="!isLogin">
          <router-link to="/register" class="nav-link">注册</router-link>
        </li>
        <li class="nav-item" v-show="!isLogin">
          <router-link to="/login" class="nav-link">登录</router-link>
        </li>
        <li class="nav-item" v-show="isLogin">
          <a @click.prevent="logout" class="nav-link" >退出</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    isLogin() {
      if (this.$store.getters.isAuthenticated) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout() {
      // 删除localStorage
      localStorage.removeItem("jwtToken");
      // 清空store
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-nav {
  position: relative;
  margin-bottom: -58.5px;
  z-index: 9;
}
.headerImg {
  width: 25px;
  margin-right: 5px;
  vertical-align: center;
}
.dialog-index {
  position: relative;
  z-index: 9999;
}
</style>
