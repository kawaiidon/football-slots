<template>
  <div class="overlay" :class="{active: $store.getters.popupState('login')}" @click.self="closePopup()">
    <div class="popup login" :class="{active: $store.getters.popupState('login'), loading: $store.state.preloader}">
      <preloader/>
      <div class="popup__close-btn" @click="closePopup()"></div>
      <div class="popup__wrapper">
        <div class="popup__inner">
          <!-- <div class="popup__title">Login</div> -->
          <form class="popup-form" v-on:submit.prevent="submitLoginForm('login')" data-vv-scope="login">
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="loginForm.email"
                  :name="'email'"
                  v-validate="'required|email'"
                  :placeholder="'Email address'"
                  :error="errors.first('login.email')"
                />
              </div>
            </div>
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="loginForm.password"
                  :name="'password'"
                  :type="'password'"
                  v-validate="'required'"
                  :placeholder="'Password'"
                  :error="errors.first('login.password')"
                />
              </div>
            </div>
            <div class="popup-form__row">
              <div class="popup-form__button">
                <customButton :text="'Login'" :disabled="disabled"/>
              </div>
              <div class="popup__big-link" @click="showRegister()">
                or register if you don't have an account
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
import customInput from '@/components/ui/customInput.vue'
import preloader from '@/components/ui/preloader.vue'
export default {
  name: 'LoginPopup',
  components: {
    customButton,
    customInput,
    preloader
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: '',
        commit: 'Login'
      },
      buttonDisabled: false
    }
  },
  computed: {
    disabled: function () {
      return this.errors.any('login')
    }
  },
  methods: {
    closePopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'login', show: false })
      this.errors.clear('login')
    },
    submitLoginForm (scope) {
      this.$validator.validateAll(scope).then(valid => {
        if (valid) {
          let formData = new FormData()

          formData.append('client[email]', this.loginForm.email.toLowerCase())
          formData.append('client[password]', this.loginForm.password)
          formData.append('client[commit]', 'Login')

          this.$store.dispatch('USER_LOGIN', formData)
        } else {
          console.log(valid)
        }
      })
    },
    showRegister: function () {
      this.closePopup()
      this.$store.commit('POPUPS_STATE', { name: 'register', show: true })
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>
