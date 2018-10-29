<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">Dashboard</h1>
          <p v-if="user" class="lead text-muted">Welcome {{user.name}}</p>
          <h4 v-if="profile">Todo: 显示数据</h4>
          <div v-if="!profile">
            <p>没有相关的个人信息，请添加您的个人信息！</p>
            <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {
    // 获取个人信息数据
    getProfileData() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          this.$store.dispatch("setProfile", res.data);
        })
        .catch(err => {
          console.log(err.response.data);
          this.$store.dispatch("setProfile", {});
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    profile() {
      return this.$store.getters.profile;
    }
  },
  created() {
    this.getProfileData();
  }
};
</script>

<style scoped>
</style>
