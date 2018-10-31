<template>
    <!-- Experience -->
    <div class="mt-4">
        <h4 class="mb-2">个人履历</h4>
        <table class="table" v-if="experience.length>0">
            <thead>
                <tr>
                    <th>公司</th>
                    <th>职位</th>
                    <th>年份</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="exp in experience" :key="exp._id">
                    <td>{{exp.company}}</td>
                    <td>{{exp.title}}</td>
                    <td>
                        {{exp.from}} ~ {{exp.to}}
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="deleteExp(exp._id)">
                            删除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <hr>
            <p class="text-muted">您还没有添加个人履历！</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "Experience",
  props: {
    experience: Array
  },
  methods: {
    deleteExp(id) {
      //   this.$axios
      //     .delete("/api/profile/experience/" + id)
      //     .then(res => {
      //       this.$store.dispatch("setProfile", res.data);
      //     })
      //     .catch(err => console.log(err.response));
      this.$emit("deleteExperience", id);
    }
  }
};
</script>

<style>
</style>
