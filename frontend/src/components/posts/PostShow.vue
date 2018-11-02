<template>
  <div class="card card-body mb-3">
    <div class="row">
      <div class="col-md-2">
        <router-link :to="`/profile/${post.name}`">
          <img class="rounded-circle d-nonse d-md-block" width="150px" :src="post.avatar" :alt="post.name" />
        </router-link>
        <br />
        <p class="text-center lead">{{post.name}}</p>
      </div>
      <div class="col-md-10">
        <p class="lead">{{post.text}}</p>
        <div v-if="showAction">
          <button type="button" class="btn btn-light mr-1" @click="like(post._id)" :disabled="canUnlike">
            <i class="text-info fa fa-thumbs-up"></i>
            <span class="badge badge-light">{{post.likes.length}}</span>
          </button>
          <span></span>
          <button type="button" class="btn btn-light mr-1" @click="unlike(post._id)" v-if="canUnlike">
            <i class="text-secondary fa fa-thumbs-down"></i>
          </button>
          <router-link :to="`/posts/${post._id}`" class="btn btn-info mr-1">
            评论
          </router-link>
          <button type="button" class="btn btn-danger mr-1" v-if="user!=null && user.id==post.user" @click="deletePost(post._id)">
            <i class="fa fa-times" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostShow",
  data() {
    return {
      error: {}
    };
  },
  props: {
    post: Object,
    errors: Object,
    showAction: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    canUnlike() {
      if (this.$store.getters.user) {
        return this.post && this.post.likes.length > 0
          ? this.post.likes
              .map(item => item.user)
              .indexOf(this.$store.getters.user.id) != -1
          : false;
      } else {
        return false;
      }
    }
  },
  methods: {
    like(id) {
      this.$axios
        .post(`/api/posts/like/${id}`)
        .then(res => {
          this.$emit("update");
        })
        .catch(err => {
          console.log(err.response.data);
          this.error = err.response.data;
        });
    },
    unlike(id) {
      this.$axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => {
          this.$emit("update");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    deletePost(id) {
      this.$axios
        .delete(`/api/posts/${id}`)
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
