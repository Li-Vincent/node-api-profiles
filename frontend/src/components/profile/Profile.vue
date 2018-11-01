<template>
    <div class="profile">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-6">
                            <a @click="$router.go(-1)" class="btn btn-light mt-3 mb-1 float-left">返回</a>
                        </div>
                        <div class="col-6">
                        </div>
                    </div>
                    <profile-header v-if="profile" :profile="profile"></profile-header>
                    <profile-intro v-if="profile" :profile="profile"></profile-intro>
                    <profile-exp-edu v-if="profile && (profile.experience || profile.education)" :experience="profile.experience" :education="profile.education"></profile-exp-edu>
                    <profile-github v-if="profile && profile.githubusername" :username="profile.githubusername"></profile-github>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader'
import ProfileIntro from './ProfileIntro'
import ProfileExpEdu from './ProfileExpEdu'
import ProfileGithub from './ProfileGithub'

export default {
    name: "Profile",
    data() {
        return {
            profile: {}
        }
    },
    components: {
        ProfileHeader,
        ProfileIntro,
        ProfileExpEdu,
        ProfileGithub
    },
    created() {
    },
    methods: {
        getProfileData(handle) {
            this.$axios.get(`/api/profile/handle/${handle}`)
                .then(res => {
                    this.profile = res.data;
                    this.$store.dispatch("setProfile", res.data);
                })
                .catch(err => {
                    console.log(err.response.data);
                    this.profile = {};
                    this.$store.dispatch("setProfile", null);
                });
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getProfileData(to.params.handle);
        })
    }

}
</script>

<style>
</style>
