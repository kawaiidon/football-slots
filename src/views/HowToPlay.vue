<template>
  <main>
    <div class="container">
      <h2 class="title">How to play</h2>
      <div class="how-text">
        <p>Win up to $500 cash playing Football Slots for free.</p>

        <p>Spin 8 times to get your predictions for this weeks’ football games.</p>

        <p>If all 8 of your predictions are correct you’ll be eligible to win.</p>

        <p>Entries are unlimited, the more entries you have the greater your chance of winning.</p>

        <p>Check My Win Results on Tuesday to see if you won!</p>
      </div>
    </div>
    <termsPopup/>
    <registerPopup/>
    <loginPopup/>
  </main>
</template>

<script>
import adBanner from '@/components/adBanner.vue'
import termsPopup from '@/components/popups/termsPopup.vue'
import registerPopup from '@/components/popups/registerPopup.vue'
import loginPopup from '@/components/popups/loginPopup.vue'

export default {
  name: 'HowToPlay',
  components: {
    adBanner,
    termsPopup,
    registerPopup,
    loginPopup
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
  .how-text{
    text-align: left;
    p{
      margin: 10px 0;
    }
  }
</style>
