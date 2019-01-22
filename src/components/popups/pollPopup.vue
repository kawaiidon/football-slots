<template>
  <div class="overlay" :class="{active: $store.getters.popupState('poll')}">
    <div class="popup poll" :class="{active: $store.getters.popupState('poll')}">
      <preloader/>
        <!-- <div class="popup__close-btn" @click="closePopup()"></div> -->
        <div class="popup__wrapper">
          <div class="popup__inner">
          <div class="popup__title">Answer these easy questions to reveal your entry</div>
          <questionsSlider/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
import preloader from '@/components/ui/preloader.vue'
import questionsSlider from '@/components/questionsSlider.vue'
export default {
  name: 'PollPopup',
  components: {
    customButton,
    questionsSlider,
    preloader
  },
  data () {
    return {

    }
  },
  // mounted: function () {
  //   this.$store.dispatch('GET_POLL_QUESTIONS')
  // },
  methods: {
    closePopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'poll', show: false })
      this.$store.commit('ANIMATE_SLOT', false)
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>
