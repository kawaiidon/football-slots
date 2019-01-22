<template>
  <main>
    <div class="container">
      Thanks for signing up! Stay tuned for updates as we review your account.
    </div>
    <registerPopup/>
    <loginPopup/>
  </main>
</template>

<script>
import registerPopup from '@/components/popups/registerPopup.vue'
import loginPopup from '@/components/popups/loginPopup.vue'
import adBanner from '@/components/adBanner.vue'

export default {
  name: 'Privacy',
  components: {
    registerPopup,
    loginPopup,
    adBanner
  }
}
</script>
<style scoped lang="scss">

</style>
