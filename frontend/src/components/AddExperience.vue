<template>
    <!-- Add Experience -->
    <div class="section add-experience">
        <div class="container">
            <div class="row">
                <div class="col-md-8 m-auto">
                    <a @click.prevent="$router.go(-1)" class="btn btn-light mt-3">
                        返回
                    </a>
                    <h1 class="display-4 text-center">添加个人经历</h1>
                    <p class="lead text-center">有关于工作的任何经验</p>
                    <small class="d-block pb-3">* 为必填项</small>
                    <form method="POST" @submit.prevent="submit">
                        <TextField placeholder="* 工作内容" name="title" v-model="expInfo.title" :error="errors.title" required />
                        <TextField placeholder="* 公司" name="company" v-model="expInfo.company" :error="errors.company" required />
                        <TextField placeholder="地点" name="location" v-model="expInfo.location" :error="errors.location" />
                        <h6>* 开始时间</h6>
                        <TextField type="date" name="from" v-model="expInfo.from" :error="errors.from" />
                        <h6>结束时间</h6>
                        <TextField type="date" name="to" v-model="expInfo.to" :error="errors.to" :disabled="expInfo.current" />
                        <div class="form-check mb-4">
                            <input class="form-check-input" type="checkbox" name="current" v-model="expInfo.current" :error="errors.current" id="current" />
                            <label class="form-check-label" for="current">
                                当前职位
                            </label>
                        </div>
                        <TextArea placeholder="工作描述" name="description" v-model="expInfo.description" :error="errors.description" info="其他工作职责等" />
                        <input type="submit" class="btn btn-info btn-block mb-3" value="提交" />
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
    name: "AddExperience",
    data() {
        return {
            expInfo: {
                title: "",
                company: "",
                location: "",
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
            if (this.expInfo.current) {
                this.expInfo.to = "在职";
            }
            this.$axios
                .post("/api/profile/experience", this.expInfo)
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
