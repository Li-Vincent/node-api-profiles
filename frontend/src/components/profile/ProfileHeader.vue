<template>
    <div class="row ">
        <div class="col-md-12">
            <div class="card card-body bg-info text-white mb-3" v-if="profile.user">
                <div class="row">
                    <img :src="profile.user.avatar" width="200px" class="rounded-circle m-auto" alt="profile.user.name">
                </div>
                <div class="text-center">
                    <h1 class="display-4 text-center">{{profile.user.name}}</h1>
                    <p class="lead text-center">{{profile.status}}</p>
                    <p class="text-center">{{profile.location}}</p>
                    <p>
                        <a class="text-white p-2" href="#" v-if="profile.githubusername">
                            <i class="fa fa-2x fa-github"></i>
                        </a>
                        <a class="text-white p-2" href="#" v-if="profile.social && profile.social.wechat">
                            <i class="fa fa-2x fa-wechat"></i>
                        </a>
                        <a class="text-white p-2" href="#" v-if="profile.social && profile.social.QQ">
                            <i class="fa fa-2x fa-qq "></i>
                        </a>
                        <a class="text-white p-2" href="#" v-if="profile.social && profile.social.weibo">
                            <i class="fa fa-2x fa-weibo "></i>
                        </a>
                        <a class="text-white p-2" href="#" v-if="profile.social && profile.social.phone">
                            <i class="fa fa-2x fa-mobile "></i>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileHeader",
    props: {
        profile: Object
    }
}
</script>

<style>
</style>
