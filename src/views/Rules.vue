<template>
  <main>
    <div class="container">
      <h2 class="title">Football Slots Rules</h2>
      <div class="rules">
        <rules/>
      </div>
    </div>
    <termsPopup/>
    <loginPopup/>
    <registerPopup/>
  </main>
</template>

<script>
import adBanner from '@/components/adBanner.vue'
import customButton from '@/components/ui/customButton.vue'
import rules from '@/components/rules.vue'
import termsPopup from '@/components/popups/termsPopup.vue'
import loginPopup from '@/components/popups/loginPopup.vue'
import registerPopup from '@/components/popups/registerPopup.vue'

export default {
  name: 'Rules',
  components: {
    adBanner,
    customButton,
    rules,
    loginPopup,
    registerPopup,
    termsPopup
  },
  data () {
    return {

    }
  },
  mounted: function () {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
