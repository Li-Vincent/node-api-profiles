<template>
    <!-- Education -->
    <div class="mt-4">
        <h4 class="mb-2">教育经历</h4>
        <table class="table" v-if="education.length>0">
            <thead>
                <tr>
                    <th>学校</th>
                    <th>学历</th>
                    <th>年份</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="edu in education" :key="edu._id">
                    <td>{{edu.school}}</td>
                    <td>{{edu.major}}</td>
                    <td>
                        {{edu.from}} - {{edu.to}}
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="deleteEdu(edu._id)">
                            删除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <hr>
            <p class="text-muted">您还没有添加教育经历！</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "Education",
  props: {
    education: Array
  },
  methods: {
    deleteEdu(id) {
      //   this.$axios
      //     .delete("/api/profile/education/" + id)
      //     .then(res => {
      //       this.$store.dispatch("setProfile", res.data);
      //     })
      //     .catch(err => console.log(err.response));
      this.$emit("deleteEducation", id);
    }
  }
};
</script>

<style>
</style>
