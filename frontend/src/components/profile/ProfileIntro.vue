<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card card-body bg-light mb-3" v-if="profile.bio">
                <h3 class="text-center text-info">个人介绍</h3>
                <p class="lead">
                    {{profile.bio}}
                </p>
                <hr>
                <h3 class="text-center text-info">个人技能</h3>
                <div class="d-flex flex-wrap justify-content-center align-items-center">
                    <div class="row">
                        <div class="p-3" v-for="(skill,index) in profile.skills" :key="index">
                            <i class="fa fa-check"></i> {{skill}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileIntro",
    props: {
        profile: Object
    }
}
</script>

<style>
</style>
