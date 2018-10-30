<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">
                <i :class="icon"></i>
            </span>
        </div>
        <input :type="type" class="form-control form-control-lg" :placeholder="placeholder" :name="name" 
            :value="value" @input="$emit('input',$event.target.value)" />
    </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    name: String,
    error: String,
    icon: String,
    value: String
  }
};
</script>

<style>
</style>
