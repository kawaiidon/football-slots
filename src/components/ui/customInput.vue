<template>
  <div class="input">
    <div class="input__wrapper">
      <label class="input__label" v-if="label">
        {{ label }}
      </label>
      <input class="input__field"
        :value="value"
        :disabled="disabled"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :ref="refer"
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
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: String
    },
    refer: {
      type: String,
      default: 'input'
    },
    error: {
      type: String
    }
  },
  mounted () {
    this.$el.value = this.value
    const dict = {
      custom: {
        email: {
          required: 'Email is required.'
        },
        firstName: {
          required: 'First name is required.'
        },
        lastName: {
          required: 'Last name is required.'
        },
        zipCode: {
          required: 'Zip code is required.'
        },
        password: {
          required: 'Password is required.',
          is: 'The password does not match.'
        },
        password_confirmation: {
          required: 'Password confirmation is required.',
          confirmed: 'The password does not match.',
          is: 'The password does not match.'
        },
        birthdate: {
          required: 'Birthdate is required.',
          date_between: 'You must be 18 years old or older'
        }
      }
    }
    this.$validator.localize('en', dict)
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/colors.scss';
  .input{
    &__wrapper{
      position: relative;
    }
    &__field{
      display: block;
      width: 100%;
      height: 25px;
      box-sizing: border-box;
      padding: 0;
      border-radius: 0px;
      border: none;
      border-bottom: 0.5px solid rgba($white, 0.2);
      outline: none;
      font-size: 16px;
      transition: 0.3s;
      background: none;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      font-weight: 300;
      color: $white;
      option{
        color: #000;
      }
      &::-webkit-input-placeholder {
        color: rgba($white, 0.4);
      }
      &::-moz-placeholder {
        color: rgba($white, 0.4);
      }
      &:-ms-input-placeholder {
        color: rgba($white, 0.4);
      }
      &:-moz-placeholder {
        color: rgba($white, 0.4);
      }
      &:focus{
        border-bottom: 1px solid rgba($white, 1);
        &::-webkit-input-placeholder {
          color: rgba($white, 1);
        }
        &::-moz-placeholder {
          color: rgba($white, 1);
        }
        &:-ms-input-placeholder {
          color: rgba($white, 1);
        }
        &:-moz-placeholder {
          color: rgba($white, 1);
        }
      }
      &.error{
        border-bottom: 1px solid rgba($red, 0.4);
        &:focus{
          border-bottom: 1px solid rgba($red, 1);
        }
        &::-webkit-input-placeholder {
          color: $red;
        }
        &::-moz-placeholder {
          color: $red;
        }
        &:-ms-input-placeholder {
          color: $red;
        }
        &:-moz-placeholder {
          color: $red;
        }
      }
    }
    &__error{
      position: absolute;
      top: 26px;
      left: 0;
      color: $red;
      font-size: 12px;
      text-align: left;
    }
  }
</style>
