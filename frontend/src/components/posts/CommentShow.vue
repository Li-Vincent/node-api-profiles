<template>
    <div class="card card-body mb-3">
        <div class="row">
            <div class="col-md-2">
                <router-link :to="`/profile/${comment.name}`">
                    <img class="rounded-circle d-nonse d-md-block" width="150px" :src="comment.avatar" :alt="comment.name" />
                </router-link>
                <br />
                <p class="text-center lead">{{comment.name}}</p>
            </div>
            <div class="col-md-10">
                <p class="lead">{{comment.text}}</p>
                <button type="button" class="btn btn-danger mr-1" v-if="user!=null && user.id==comment.user" @click="deleteComment()">
                    <i class="fa fa-times" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "CommentShow",
  props: {
    comment: Object,
    postId: String,
    errors: Object
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    deleteComment() {
      this.$axios
        .delete(`/api/posts/comment/${this.postId}/${this.comment._id}`)
        .then(res => {
          this.$emit("update");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }
};
</script>

<style>
</style>
