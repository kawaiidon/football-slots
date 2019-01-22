<template>
  <main v-bind:style="{'background-position': `50% ${scroll}px`}">
    <div class="container">
      <h2>SIMPLY SPIN TO WIN CASH FOR FREE</h2>
      <adBanner :place="'slots_top'"/>
      <slotMachine/>
      <adBanner :place="'slots_bottom'"/>
    </div>
    <pollPopup/>
    <spinsPopup/>
    <termsPopup/>
    <registerOfferPopup/>
    <registerPopup/>
    <loginPopup/>
  </main>
</template>

<script>
import slotMachine from '@/components/slotMachine.vue'
import pollPopup from '@/components/popups/pollPopup.vue'
import spinsPopup from '@/components/popups/spinsPopup.vue'
import adBanner from '@/components/adBanner.vue'
import termsPopup from '@/components/popups/termsPopup.vue'
import registerPopup from '@/components/popups/registerPopup.vue'
import loginPopup from '@/components/popups/loginPopup.vue'
import registerOfferPopup from '@/components/popups/registerOfferPopup.vue'

export default {
  name: 'Slots',
  components: {
    slotMachine,
    pollPopup,
    spinsPopup,
    termsPopup,
    registerPopup,
    loginPopup,
    registerOfferPopup,
    adBanner
  },
  data () {
    return {
      scroll: 0
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.scroll = -(window.scrollY / 2)
    }
  }
}
</script>
<style scoped lang="scss">
  // main{
  //   background-image: url('../assets/slot-bg-1.jpg');
  //   background-position: 50% 50%;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   transition: 0.1s;
  // }
  @media screen and (max-width: 768px) {
    main{
      background-position: 50% 50%!important;
      background-attachment: fixed;
    }
  }
</style>
