<template>
  <!-- Profiles -->
  <div class="profiles">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="display-4 text-center mt-4">开发者们</h1>
          <p class="lead text-center">让世界丰富多彩的你们!</p>
          <ProfileItem v-if="profiles.length>0" :profile="profile" v-for="profile in profiles" :key="profile._id"></ProfileItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileItem from "./common/ProfileItem";

export default {
  name: "Profiles",
  data() {
    return {
      profiles: []
    };
  },
  components: {
    ProfileItem
  },
  methods: {
    getProfiles() {
      this.$axios
        .get("/api/profile/all")
        .then(res => {
          this.profiles = res.data;
          this.$store.dispatch("setProfiles", res.data);
        })
        .catch(err => {
          this.profiles = [];
          console.log(err.response.data);
          this.$store.dispatch("setProfiles", []);
        });
    }
  },
  created() {
    this.getProfiles();
  }
};
</script>

<style>
</style>
