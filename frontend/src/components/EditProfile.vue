<template>
  <div class="create-profile">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a @click.prevent="$router.go(-1)" class="btn btn-light mt-3">返回</a>
          <h1 class="display-5 text-center">编辑个人资料</h1>
          <small class="d-block pb-3">*表示必填项</small>
          <form @submit.prevent="submit" method="POST">
            <TextField placeholder="* Profile handle" name="handle" required="true" v-model="profileInfo.handle" :error="errors.handle" info="此处的handle是在后端接口中需要用来查询数据的, 通常是写你email的名字" />
            <SelectList name="status" info="请告知我们您目前所从事的岗位" v-model="profileInfo.status" :error="errors.status" :options="options" />
            <TextField placeholder="公司" name="company" v-model="profileInfo.company" :error="errors.company" info="可以是你自己的公司或者是你的在职公司" />
            <TextField placeholder="网址" name="website" v-model="profileInfo.website" :error="errors.website" info="你公司网址或者是你在职公司网址" />
            <TextField placeholder="地址" name="location" v-model="profileInfo.location" :error="errors.location" info="你所在的城市及所在区 (例如. 北京市昌平区)" />
            <TextField placeholder="*编程语言技能" name="skills" v-model="profileInfo.skills" :error="errors.skills" info="请使用逗号隔开你所掌握的语言 (例如: HTML,CSS,JavaScript,PHP)" />
            <TextField placeholder="Github 用户名" name="githubusername" v-model="profileInfo.githubusername" :error="errors.githubusername" info="如果你希望将你的项目分享给大家, 可以填写你的github用户名" />
            <TextArea placeholder="自我介绍" name="bio" v-model="profileInfo.bio" :error="errors.bio" info="简单介绍一下自己" />
            <div class="mb-3">
              <button type="button" class="btn btn-light" @click="displaySocialInputs=!displaySocialInputs">添加社交账号</button>
              <span class="text-muted">选项</span>
            </div>
            <div v-show="displaySocialInputs">
              <InputGroup placeholder="微信(公众号)" name="wechat" v-model="profileInfo.wechat" :error="errors.wechat" icon="fa fa-wechat" />
              <InputGroup placeholder="QQ" name="QQ" v-model="profileInfo.QQ" :error="errors.QQ" icon="fa fa-qq" />
              <InputGroup placeholder="微博" name="weibo" v-model="profileInfo.weibo" :error="errors.weibo" icon="fa fa-weibo" />
              <InputGroup placeholder="手机号" name="phone" v-model="profileInfo.phone" :error="errors.phone" icon="fa fa-phone-square" />
            </div>
            <input type="submit" value="提交" class="btn btn-block btn-info mb-3">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
import TextArea from "./common/TextAreaGroup";
import SelectList from "./common/SelectListGroup";
import InputGroup from "./common/InputGroup";

export default {
  name: "EditProfile",
  data() {
    return {
      profileInfo: {
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "0",
        skills: "",
        githubusername: "",
        bio: "",
        wechat: "",
        QQ: "",
        weibo: "",
        phone: ""
      },
      options: [
        { value: "0", text: "*选择您的职业" },
        { value: "Frontend Developer", text: "前端初级工程师" },
        { value: "Junior Developer", text: "前端中级工程师" },
        { value: "Senior Developer", text: "前端高级工程师" },
        { value: "Manager", text: "项目管理" },
        { value: "Backend Developer", text: "后端开发" },
        { value: "Instructor", text: "人工智能" },
        { value: "Intern", text: "Python机器学习" },
        { value: "Other", text: "其他" }
      ],
      errors: {},
      displaySocialInputs: false
    };
  },
  components: {
    TextField,
    TextArea,
    SelectList,
    InputGroup
  },
  methods: {
    submit() {
      this.$axios
        .post("/api/profile", this.profileInfo)
        .then(res => {
          this.errors = {};
          this.$store.dispatch("setProfile", res.data);
          this.$router.push("/dashboard");
        })
        .catch(err => {
          if (err.response.data) {
            console.log(err.response.data);
            this.errors = err.response.data;
          }
        });
    },
    // 获取个人信息数据
    getProfileData() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          this.$store.dispatch("setProfile", res.data);
          this.getCurrentProfile();
        })
        .catch(err => {
          this.$store.dispatch("setProfile", null);
        });
    },
    getCurrentProfile() {
      let profile = this.$store.getters.profile;
      if (profile != null) {
        profile.handle = profile.handle ? profile.handle : "";
        profile.company = profile.company ? profile.company : "";
        profile.website = profile.website ? profile.website : "";
        profile.location = profile.location ? profile.company : "";
        profile.githubusername = profile.githubusername
          ? profile.githubusername
          : "";
        profile.bio = profile.bio ? profile.bio : "";

        profile.social = profile.social ? profile.social : {};
        profile.wechat = profile.social.wechat ? profile.social.wechat : "";
        profile.QQ = profile.social.QQ ? profile.social.QQ : "";
        profile.weibo = profile.social.weibo ? profile.social.weibo : "";
        profile.phone = profile.social.phone ? profile.social.phone : "";
        profile.skills = profile.skills.length ? profile.skills.join(",") : "";

        this.profileInfo = profile;
      }
    }
  },
  created() { },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.profile == null) {
        vm.getProfileData();
      } else {
        vm.getCurrentProfile();
      }
    });
  }
};
</script>

<style>
</style>
