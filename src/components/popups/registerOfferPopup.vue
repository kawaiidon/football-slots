<template>
  <div class="overlay" :class="{active: $store.getters.popupState('offer')}" @click.self="closePopup()">
    <div class="popup" :class="{active: $store.getters.popupState('offer')}">
      <div class="popup__close-btn" @click="closePopup()"></div>
      <div class="popup__wrapper">
        <div class="popup__inner">
          <div class="popup__title">Please register</div>
          <div class="offer-popup">
            <div class="offer-popup__desc">
              Please register or login if you want to continue your entry
            </div>
            <div class="offer-popup__buttons">
              <customButton
                class="offer-popup__button"
                :text="'Register'"
                @click.native="showRegisterPopup()"
              />
              <customButton
                class="offer-popup__button"
                :text="'Login'"
                @click.native="showLoginPopup()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
export default {
  name: 'pleaseRegisterPopup',
  components: {
    customButton
  },
  methods: {
    closePopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'offer', show: false })
    },
    showRegisterPopup: function () {
      this.closePopup()
      this.$store.commit('POPUPS_STATE', { name: 'register', show: true })
    },
    showLoginPopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'offer', show: false })
      this.$store.commit('POPUPS_STATE', { name: 'login', show: true })
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>

<style scoped lang="scss">
  .offer-popup{
    &__desc{

    }
    &__buttons{
      margin-top: 20px;
      display: flex;
    }
    &__button{
      &:first-child{
        margin-right: 20px;
      }
    }
  }
  @media screen and (max-width: 768px) {

  }
</style>
