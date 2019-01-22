<template>
  <div class="overlay" :class="{active: $store.getters.popupState('terms')}">
    <div class="popup terms" :class="{active: $store.getters.popupState('terms')}">
      <preloader/>
      <div class="popup__wrapper">
        <div class="popup__inner">
          <div class="popup__title">Football Slots Rules</div>
          <div class="popup__terms">
            <rules/>
          </div>
          <div class="popup__checkbox">
            <input type="checkbox" v-model="accepted">
            I Accept Football Slots Rules
          </div>
          <div class="popup__buttons">
            <customButton :text="'Accept'" :disabled="!termsAccepted" @click.native="acceptTerms()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
import terms from '@/components/terms.vue'
import rules from '@/components/rules.vue'
import preloader from '@/components/ui/preloader.vue'
export default {
  name: 'termsPopup',
  components: {
    customButton,
    terms,
    rules,
    preloader
  },
  data () {
    return {
      accepted: false
    }
  },
  computed: {
    termsAccepted: function () {
      return this.accepted
    }
  },
  methods: {
    closePopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'terms', show: false })
    },
    acceptTerms: function () {
      this.$store.dispatch('USER_ACCEPT_TERMS')
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>
