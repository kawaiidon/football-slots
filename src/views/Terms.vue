<template>
  <main>
    <div class="container">
      <h2 class="title">Terms and conditions</h2>
      <terms/>
    </div>
    <registerPopup/>
    <loginPopup/>
  </main>
</template>

<script>
// @ is an alias to /src
import registerPopup from '@/components/popups/registerPopup.vue'
import loginPopup from '@/components/popups/loginPopup.vue'
import adBanner from '@/components/adBanner.vue'
import terms from '@/components/terms.vue'

export default {
  name: 'Terms',
  components: {
    registerPopup,
    loginPopup,
    adBanner,
    terms
  }
}
</script>
<style lang="scss">
  .main-texts{
    line-height: 1.4;
    text-align: left;
    b{
      margin: 10px 0;
      display: inline-block;
      font-weight: bold;
    }
    a{
      color: #fff;
    }
  }
  @media screen and (max-width: 768px) {
    .main-texts{
      margin-top: 30px;
      font-size: 14px;
      b{
        margin: 5px 0;
      }
    }
  }
</style>
