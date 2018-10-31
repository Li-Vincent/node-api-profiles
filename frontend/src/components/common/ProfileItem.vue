<template>
    <!-- Profile Item -->
    <div class="card card-body bg-light mb-3" v-if="profile">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                <img class="rounded-circle" style="width: 150px" :src="profile.user.avatar" :alt="profile.user.name" />
            </div>
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                <h3>{{profile.user.name}}</h3>
                <p>{{profile.status}}</p>
                <p v-if="profile.location">{{profile.location}}</p>
                <router-link :to="`/profile/${profile.handle}`" class="btn btn-info">更多信息</router-link>
            </div>
            <div class="col-lg-6 d-none d-lg-block" v-if="profile.skills">
                <h4>技能</h4>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(skill,index) in profile.skills" :key="index">
                        <i class="fa fa-check pr-1"></i>
                        {{skill}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProfileItem",
  props: {
    profile: Object
  }
};
</script>

<style>
</style>
