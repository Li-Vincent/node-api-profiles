<template>
    <div class="post">
        <div class="container">
            <div class="row" v-if="post">
                <div class="col-md-12">
                    <a @click="$router.go(-1)" class="btn btn-light mb-3">返回</a>
                    <post-show v-if="post" :post="post" :showAction="false"></post-show>
                    <comment-form :post_id="post._id" @update="getPost"></comment-form>
                    <comment-show @update="getPost" v-if="post.comments" v-for="comment in post.comments" :key="comment._id" :comment="comment" :postId="post._id" :error="errors"></comment-show>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentForm from "./CommentForm";
import CommentShow from "./CommentShow";
import PostShow from "./PostShow";

export default {
  name: "Post",
  data() {
    return {
      post: null,
      errors: {}
    };
  },
  components: {
    CommentForm,
    CommentShow,
    PostShow
  },
  methods: {
    getPost() {
      this.$axios
        .get(`/api/posts/${this.$route.params.post_id}`)
        .then(res => {
          this.post = res.data;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPost();
    });
  }
};
</script>

<style>
</style>
