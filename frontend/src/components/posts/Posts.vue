<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mt-3">
          <post-form @update="getPosts"></post-form>
          <div v-if="posts.length>0">
            <post-show @update="getPosts" v-for="post in posts" :key="post._id" :post="post" :error="errors"></post-show>
          </div>
          <p v-else class="text-muted mt-4">{{errors.noPostFound}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "./PostForm";
import PostShow from "./PostShow";

export default {
  name: "Posts",
  components: {
    PostForm,
    PostShow
  },
  data() {
    return {
      posts: [],
      errors: {}
    };
  },
  methods: {
    getPosts() {
      this.$axios
        .get("/api/posts")
        .then(res => {
          this.posts = res.data;
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPosts();
    });
  }
};
</script>

<style>
</style>
