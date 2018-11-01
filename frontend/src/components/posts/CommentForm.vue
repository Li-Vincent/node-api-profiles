<template>
    <div class="post-form mb-3">
        <div class="card card-info">
            <div class="card-header bg-info text-white">
                说点啥...
            </div>
            <div class="card-body">
                <form @submit.prevent="submitComment()" method="POST">
                    <text-area name="text" placeholder="随便写点啥" v-model="text" :error="errors.text"></text-area>
                    <input type="submit" class="btn btn-dark">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import TextArea from "../common/TextAreaGroup";

export default {
  name: "CommentForm",
  data() {
    return {
      text: "",
      errors: {}
    };
  },
  props: {
    post_id: String
  },
  components: {
    TextArea
  },
  methods: {
    submitComment() {
      const user = this.$store.getters.user;
      const newComment = {
        text: this.text,
        name: user.name,
        avatar: user.avatar
      };
      this.$axios
        .post(`/api/posts/comment/${this.post_id}`, newComment)
        .then(res => {
          this.errors = {};
          this.text = "";
          this.$emit("update");
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  }
};
</script>

<style>
</style>
