<template>
  <div class="overlay" :class="{active: $store.getters.popupState('register')}" @click.self="closePopup()">
    <div class="popup register" :class="{active: $store.getters.popupState('register'), loading: $store.state.preloader}">
      <preloader/>
      <div class="popup__close-btn" @click="closePopup()"></div>
      <div class="popup__wrapper">
        <div class="popup__inner">
          <div class="popup__title">WIN 500$ BY PLAYING FOOTBALL SWEEPSTAKES!</div>
          <form class="popup-form" v-on:submit.prevent="submitRegisterForm('register')" data-vv-scope="register">
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="registerForm.email"
                  :name="'email'"
                  v-validate="'required|email'"
                  :placeholder="'Email address'"
                  :error="errors.first('register.email')"
                />
              </div>
            </div>
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="registerForm.firstName"
                  :name="'firstName'"
                  v-validate="'required'"
                  :placeholder="'First name'"
                  :error="errors.first('register.firstName')"
                />
              </div>
            </div>
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="registerForm.lastName"
                  :name="'lastName'"
                  v-validate="'required'"
                  :placeholder="'Last name'"
                  :error="errors.first('register.lastName')"
                />
              </div>
            </div>
            <!-- <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <input class="popup-form__input" :class="{'error': errors.has('birthdate') }" placeholder="Birthdate" type="text" name="birthdate" value="" v-model="registerForm.birthdate"
                v-mask="'##/##/####'" v-validate="'required|date_format:MM/DD/YYYY|date_between:10/09/1900,01/01/2000'">
                <span class="popup-form__error">{{ errors.first('birthdate') }}</span>
              </div>
            </div> -->
            <!-- <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <select class="popup-form__input" name="country" v-model="registerForm.country" v-validate="'required'">
                  <option :value="country.name" v-for="country in countriesList">{{country.name}}</option>
                </select>
                <span class="popup-form__error">{{ errors.first('country') }}</span>
              </div>
            </div> -->
            <!-- <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <input class="popup-form__input" :class="{'error': errors.has('zipCode') }" placeholder="Zip code" type="text" name="zipCode" value="" v-model="registerForm.zipCode" v-validate="'required|decimal'">
                <span class="popup-form__error">{{ errors.first('zipCode') }}</span>
              </div>
            </div> -->
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="registerForm.password"
                  ref="'password'"
                  :name="'password'"
                  :type="'password'"
                  v-validate="{required: true, min: 6, is: registerForm.password_confirmation}"
                  :placeholder="'Password'"
                  :error="errors.first('register.password')"
                />
              </div>
            </div>
            <div class="popup-form__row">
              <div class="popup-form__input-wrapper">
                <customInput
                  class="popup-form__input"
                  v-model="registerForm.password_confirmation"
                  :name="'password_confirmation'"
                  :type="'password'"
                  v-validate="{required: true, is: registerForm.password}"
                  :placeholder="'Password confirmation'"
                  :error="errors.first('register.password_confirmation')"
                />
              </div>
            </div>
            <div class="popup-form__row">
              <div class="popup-form__button large">
                <customButton :text="'Register'" :disabled="disabled"/>
              </div>
              <img v-if="registered" style="position: absolute;" src="http://postback.zeroredirect1.com/zppostback/87125141-5851-11e8-b95a-0e497388635c?cid=" alt="">
              <div class="popup__desc transparent">
                Clicking “Register” confirms you’re age 18+ (21+ in state of MA) and agree to our <router-link class="popup__link" :to="{ name: 'terms'}" target="_blank">Terms & Privacy Policy</router-link>. You’ll also get offers and messages from the Pivit companies.
              </div>
              <div class="popup__big-link" @click="showLogin()">
                or login if you already registered
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
import countries from '../../data/countries'

export default {
  name: 'registerPopup',
  components: {
    customButton,
    customInput,
    preloader
  },
  data () {
    return {
      countriesList: countries.countries,
      registered: false,
      registerForm: {
        email: '',
        password: '',
        password_confirmation: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        country: 'United States',
        zipCode: ''
      }
    }
  },
  mounted: function () {

  },
  computed: {
    disabled: function () {
      return this.errors.any('register')
    }
  },
  methods: {
    closePopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'register', show: false })
      this.errors.clear('register')
    },
    submitRegisterForm (scope) {
      this.$validator.validateAll(scope).then(valid => {
        if (valid) {
          let formData = new FormData()

          formData.append('client[email]', this.registerForm.email.toLowerCase())
          formData.append('client[password]', this.registerForm.password)
          formData.append('client[first_name]', this.registerForm.firstName)
          formData.append('client[last_name]', this.registerForm.lastName)
          // formData.append('client[birthdate]', this.registerForm.birthdate)
          // formData.append('client[birthdate(1i)]', this.registerForm.birthday.year)
          // formData.append('client[birthdate(2i)]', this.registerForm.birthday.month)
          // formData.append('client[birthdate(3i)]', this.registerForm.birthday.day)
          // formData.append('client[country]', this.registerForm.country)
          // formData.append('client[zip_code]', this.registerForm.zipCode)
          formData.append('client[commit]', 'Register')

          this.registered = true
          this.$store.dispatch('USER_REGISTER', formData)
        }
      })
    },
    showLogin () {
      this.closePopup()
      this.$store.commit('POPUPS_STATE', { name: 'login', show: true })
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>
