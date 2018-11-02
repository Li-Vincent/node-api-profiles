<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4 mt-4">个人信息</h1>
          <p v-if="user" class="lead text-muted">
            Welcome
            <router-link :to="`/profile/${profile.handle}`" v-if="profile">{{user.name}}</router-link>
            <router-link to="/profiles" v-else>开发者们</router-link>
          </p>
          <div v-if="profile">
            <ProfileTab/>
            <!-- 删除当前账户 -->
            <div class="mb-1">
              <button class="btn btn-danger" @click="deleteUser">删除当前账户</button>
            </div>
            <!-- 个人履历 -->
            <Experience :experience="profile.experience" @deleteExperience="deleteExp"></Experience>
            <!-- 教育经历 -->
            <Education :education="profile.education" @deleteEducation="deleteEdu"></Education>
          </div>
          <div v-else>
            <p>没有相关的个人信息，请添加您的个人信息！</p>
            <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ProfileTab from "./common/ProfileTab";
import Experience from "./common/Experience";
import Education from "./common/Education";

export default {
  name: "Dashboard",
  data() {
    return {
      profile: null
    };
  },
  components: {
    ProfileTab,
    Experience,
    Education
  },
  methods: {
    // 获取个人信息数据
    getProfileData() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          this.profile = res.data;
          this.$store.dispatch("setProfile", res.data);
        })
        .catch(err => {
          this.$store.dispatch("setProfile", null);
        });
    },
    deleteUser() {
      this.$axios
        .delete("/api/profile/all")
        .then(res => {
          this.profile = null;
          this.$store.dispatch("clearCurrentState");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除单条个人经历
    deleteExp(id) {
      this.$axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
          this.profile = res.data;
          this.$store.dispatch("setProfile", res.data);
        })
        .catch(err => console.log(err.response));
    },
    // 删除单条教育经历
    deleteEdu(id) {
      this.$axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
          this.profile = res.data;
          this.$store.dispatch("setProfile", res.data);
        })
        .catch(err => console.log(err.response));
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() { },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProfileData();
    });
  }
};
</script>

<style scoped>
</style>
