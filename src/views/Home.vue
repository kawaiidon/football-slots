<template>
  <main>
    <div class="container">
      <adBanner :place="''"/>
        main
      <adBanner :place="''"/>
    </div>
    <registerPopup/>
    <loginPopup/>
    <termsPopup/>
  </main>
</template>

<script>
import registerPopup from '@/components/popups/registerPopup.vue'
import loginPopup from '@/components/popups/loginPopup.vue'
import termsPopup from '@/components/popups/termsPopup.vue'
import adBanner from '@/components/adBanner.vue'

export default {
  name: 'home',
  components: {
    registerPopup,
    loginPopup,
    termsPopup,
    adBanner
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  main{

  }
</style>
