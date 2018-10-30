<template>
    <div class="form-group">
        <select class="form-control form-control-lg" :name="name" @input="$emit('input',$event.target.value)" :value="value" :class="{'is-invalid':error}">
            <option v-for="(option,index) in options" :key="index" :value="option.value">{{option.text}}</option>
        </select>
        <div class="invalid-feedback" v-if="error">
            {{error}}
        </div>
        <small v-if="info" className="form-text text-muted">{{info}}</small>
    </div>
</template>

<script>
export default {
  name: "SelectListGroup",
  props: {
    name: String,
    error: String,
    info: String,
    options: Array,
    value: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
