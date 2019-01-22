<template>
  <div class="banner" v-if="banner">
    <div class="banner__wrapper"  v-if="banner.kind === 'custom'">
      <a
        :href="`${banner.link}`"
        class="custom-banner"
        :style="{'background-image': `url('${bannerImage}')`}"
        target="_blank">
      </a>
    </div>
    <div class="banner__wrapper" style="height: 93px;" v-else-if=" banner.kind === 'html'">
      <div v-html="banner.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  components: {

  },
  props: {
    adId: {
      type: Number,
      default: 0
    },
    adType: {
      type: String,
      default: ''
    },
    place: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    banner () {
      let currentBanners = this.$store.getters.banners.filter(banner => banner.places.indexOf(this.place) > -1)
      let bannersCount = currentBanners.length - 1
      let randomPicker = Math.round(Math.random() * (bannersCount - 0) + 0)
      setTimeout(_ => {
        (window.admanager = window.admanager || []).push({})
      }, 1000)
      return currentBanners[randomPicker]
    },
    showBanner () {
      if (this.banner.length > 0) return true
    },
    isMobile () {
      return this.$store.state.mobile
    },
    bannerImage () {
      if (this.isMobile && this.banner.mobile_image_url !== null) {
        return this.banner.mobile_image_url
      } else {
        return this.banner.image_url
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .banner{
    width: 728px;
    margin: auto;
    position: relative;
    &__wrapper{
      height: 90px;
    }
  }
  .custom-banner{
    display: block;
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  @media screen and (max-width: 768px) {
    .banner{
      // margin: 0px 0 20px 0;
      width: 100%;
      &__wrapper{
        height: 60px;
      }
    }
  }
</style>
