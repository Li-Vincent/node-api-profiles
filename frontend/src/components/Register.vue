<template>
  <!-- Register -->
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center mt-4">注册</h1>
          <p class="lead text-center">创建新的账户</p>
          <form @submit.prevent="submit" autocomplete="off" method="POST">
            <TextField placeholder="用户名" name="name" v-model="newUser.name" :error="errors.name" />
            <TextField type="email" placeholder="邮箱地址" name="email" v-model="newUser.email" :error="errors.email" info="我们使用了gravatar全球公认头像, 如果需要有头像显示, 请使用在gravatar注册的邮箱" />
            <TextField type="password" placeholder="密码" name="password" v-model="newUser.password" :error="errors.password" />
            <TextField type="password" placeholder="密码" name="password2" v-model="newUser.password2" :error="errors.password2" />
            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入通用组件
import TextField from "./common/TextFieldGroup";

export default {
  name: "Register",
  components: {
    TextField
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {}
    };
  },
  methods: {
    submit() {
      this.$axios
        .post("/api/users/register", this.newUser)
        .then(res => {
          // 同步执行mutation操作
          //   this.$store.commit("setUser", res.data);
          // 异步执行actions操作
          this.$store.dispatch("setUser", res.data);

          this.errors = {};
          //页面跳转
          this.$router.push("/login");
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    }
  }
};
</script>

<style>
</style>
