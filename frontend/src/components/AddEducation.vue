<template>
    <!-- Add Experience -->
    <div class="add-education">
        <div class="container">
            <div class="row">
                <div class="col-md-8 m-auto">
                    <a @click.prevent="$router.go(-1)" class="btn btn-light">
                        返回
                    </a>
                    <h1 class="display-4 text-center">添加教育经历</h1>
                    <p class="lead text-center">你所毕业的学校, 参加的培训等</p>
                    <small class="d-block pb-3">* 表示为必填项</small>
                    <form method="POST" @submit.prevent="submit">
                        <TextField placeholder="* 学校或培训" name="school" v-model="eduInfo.school" :error="errors.school" required="required" />
                        <TextField placeholder="* 学历" name="degree" v-model="eduInfo.degree" :error="errors.degree" required="required" />
                        <TextField placeholder="* 专业" name="major" v-model="eduInfo.major" :error="errors.major" required="required" />
                        <h6>开始时间</h6>
                        <TextField type="date" name="from" v-model="eduInfo.from" :error="errors.from" />
                        <h6>结束时间</h6>
                        <TextField type="date" name="to" v-model="eduInfo.to" :error="errors.to" :disabled="eduInfo.current" />
                        <div class="form-check mb-4">
                            <input class="form-check-input" type="checkbox" v-model="eduInfo.current" :error="errors.current" name="current" value="" id="current" />
                            <label class="form-check-label" for="current">
                                当前在校
                            </label>
                        </div>
                        <TextArea placeholder="在校表现" name="description" v-model="eduInfo.description" :error="errors.description" info="其他工作职责等" />
                        <input type="submit" class="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
import TextArea from "./common/TextAreaGroup";

export default {
    name: "AddEducation",
    data() {
        return {
            eduInfo: {
                school: "",
                degree: "",
                major: "",
                from: "",
                to: "",
                current: false,
                description: ""
            },
            errors: {}
        };
    },
    components: {
        TextField,
        TextArea
    },
    methods: {
        submit() {
            if (this.eduInfo.current) {
                this.eduInfo.to = "在读";
            }
            this.$axios
                .post("/api/profile/education ", this.eduInfo)
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
        }
    }
};
</script>

<style>
</style>
