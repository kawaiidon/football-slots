<template>
  <div class="input">
    <div class="input__wrapper">
      <label class="input__label" v-if="label">
        {{ label }}
      </label>
      <input class="input__field"
        :disabled="disabled"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        ref="input"
        @input="onInput"
      />
      <div class="input__error" v-if="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customInput',
  $_veeValidate: {
    value () {
      return this.$el.value
    },
    name () {
      return this.name
    }
  },
  props: {
    name: String,
    value: {
      type: null,
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validate: (val) => {
        return ['text', 'url', 'email', 'password', 'search'].indexOf(val) !== -1
      }
    },
    label: '',
    disabled: '',
    placeholder: '',
    error: {
      type: String
    }
  },
  mounted () {
    this.$el.value = this.value
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
  .input{
    &__wrapper{
      position: relative;
    }
    &__field{
      display: block;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 0px;
      border: none;
      border: 1px solid rgba(#777, 0.5);
      outline: none;
      font-size: 16px;
      transition: 0.3s;
      background: none;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      font-weight: 300;
      &:focus{
        border: 1px solid rgba(#777, 1);
      }
      &.error{
        border: 1px solid rgba(181, 81, 81, 0.5);
        &:focus{
          border: 1px solid rgba(181, 81, 81, 1);
        }
      }
    }
    &__error{
      position: absolute;
      bottom: -14px;
      left: 0;
      color: rgb(181, 81, 81);
      font-size: 12px;
    }
  }
</style>
