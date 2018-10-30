<template>
    <div class="form-group">
        <textarea class="form-control form-control-lg" :placeholder="placeholder" :name="name" 
            :class="{'is-invalid':error}" :value="value" @input="$emit('input',$event.target.value)" />
        <div class="invalid-feedback" v-if="error">
            {{error}}
        </div>
        <small v-if="info" className="form-text text-muted">{{info}}</small>
    </div>
</template>

<script>
export default {
  name: "TextAreaGroup",
  props: {
    value: String,
    placeholder: String,
    name: String,
    error: String,
    info: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
