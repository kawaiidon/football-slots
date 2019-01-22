<template>
  <div class="overlay" :class="{active: $store.getters.popupState('video')}">
    <div class="popup poll" :class="{active: $store.getters.popupState('video')}">
      <div class="popup__wrapper">
        <div class="popup__title">Video</div>

      </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
export default {
  name: 'VideoPopup',
  components: {
    customButton
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    closePopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'video', show: false })
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>
