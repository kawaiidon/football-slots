<template>
  <main>
    <div class="container">
      <h2 class="title">User profile</h2>
      <div class="user-info">
        <div class="user-info__row">
          <div class="user-info__title">
            Name
          </div>
          <div class="user-info__input">
            <customInput
              class="user-info__field"
              v-model="firstName"
              name="first_name"
              v-validate="'required'"
              :error="errors.first('first_name')"
              value="firstName"
              @input="checkInput($event, 'first_name')"
            />
            <customInput
              class="user-info__field"
              v-model="lastName"
              name="last_name"
              v-validate="'required'"
              :error="errors.first('last_name')"
              @input="checkInput($event, 'last_name')"
            />
          </div>
        </div>
        <div class="user-info__row">
          <div class="user-info__title">
            Birthday
          </div>
          <div class="user-info__input">
            <customInput
              class="user-info__field"
              v-model="birthdate"
              name="birthdate"
              :error="errors.first('birthdate')"
              @input="checkInput($event, 'birthdate')"
              v-mask="'##/##/####'"
              v-validate="'required|date_format:MM/DD/YYYY|date_between:10/09/1900,01/01/2000'"
            />
          </div>
        </div>
        <div class="user-info__row">
          <div class="user-info__title">
            Email
          </div>
          <div class="user-info__input">
            <customInput
              class="user-info__field"
              v-model="email"
              name="email"
              v-validate="'required|email'"
              :error="errors.first('email')"
              @input="checkInput($event, 'email')"
            />
          </div>
        </div>
        <div class="user-info__row">
          <div class="user-info__title">
            New password
          </div>
          <div class="user-info__input">
            <customInput
              class="user-info__field"
              v-model="password"
              name="password"
              type="password"
              v-validate="'required'"
              :error="errors.first('password')"
              ref="password"
              @input="checkInput($event, 'password')"
            />
          </div>
        </div>
        <customButton
          class="user-info__btn"
          :text="'Save'"
          :disabled="disabled"
          @click.native="saveInformation()"
        />
      </div>
    </div>
    <termsPopup/>
    <preloader/>
  </main>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
import customInput from '@/components/ui/customInput.vue'
import adBanner from '@/components/adBanner.vue'
import termsPopup from '@/components/popups/termsPopup.vue'
import preloader from '@/components/ui/preloader.vue'

export default {
  name: 'Profile',
  components: {
    customInput,
    customButton,
    adBanner,
    termsPopup,
    preloader
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      country: '',
      email: '',
      zipCode: '',
      birthdate: '',
      password: '',
      password_confirmation: '',
      changedFields: []
    }
  },
  mounted: function () {
    this.firstName = this.user.first_name
    this.lastName = this.user.last_name
    this.email = this.user.email
    this.birthdate = this.user.birthdate
  },
  computed: {
    user: function () {
      return this.$store.state.user
    },
    disabled: function () {
      return this.changedFields.length === 0 || this.errors.items.length > 0
    }
  },
  methods: {
    checkInput: function (data, name) {
      if (this.user[name] !== data) {
        this.changedFields = this.changedFields.filter((item) => name !== item.name)
        let field = {}

        field['name'] = name
        field['data'] = data

        this.changedFields.push(field)
      } else {
        this.changedFields = this.changedFields.filter((item) => name !== item.name)
      }
    },
    saveInformation: function () {
      let formData = new FormData()

      this.changedFields.forEach(field => {
        formData.append(`client[${field.name}]`, field.data)
      })

      this.$store.dispatch('EDIT_USER', formData).then(
        this.changedFields = []
      )
    }
  }
}
</script>
<style scoped lang="scss">
  .user-info{
    width: 600px;
    margin: 60px auto 0;
    &__row{
      display: flex;
      margin-bottom: 50px;
      padding-bottom: 15px;
      box-sizing: border-box;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
      flex-wrap: wrap;
      &:last-child{
        margin-bottom: 0;
      }
    }
    &__title{
      width: 200px;
      text-align: left;
      font-size: 18px;
      text-transform: uppercase;
    }
    &__input{
      display: flex;
    }
    &__field{
      margin-right: 30px;
    }
    &__password{

    }
  }
</style>
