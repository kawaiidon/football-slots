<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
    <notifications
      group="auth"
      position="bottom right"
      classes="notice"
      width="300px"
    />
    <!-- <adblock @passValue="add = $event"></adblock>
    <adBlockError v-if="add === 'detected'"/> -->
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
// import adblock from 'vue-adblock'
// import adBlockError from '@/components/adBlockError.vue'
export default {
  name: 'app',
  components: {
    Header,
    Footer
    // adblock,
    // adBlockError
  },
  data () {
    return {
      add: ''
    }
  },
  mounted: function () {
    this.$store.dispatch('FETCH_BANNERS')
    // this.showUserTerms()
    this.checkMobile()
    this.checkPeriod()
  },
  computed: {
    authenticated () {
      return this.$store.getters.isAuthenticated
    },
    accepted () {
      return this.$store.state.user.is_rules_accepted
    }
  },
  watch: {
    $route (to, from) {

    }
  },
  methods: {
    // удалить всё с эти связанное
    showUserTerms: function () {
      if (!this.accepted && this.authenticated) {
        this.$store.commit('POPUPS_STATE', { name: 'terms', show: true })
      }
    },
    checkMobile: function () {
      let mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
      this.$store.commit('MOBILE', mobile)
    },
    checkPeriod: function () {
      this.$store.dispatch('CHECK_PERIOD')
    }
  }
}
</script>

<style lang="scss">
  @import '/assets/styles/reset.scss';
  @import '/assets/styles/colors.scss';
  @font-face {
      font-family: "SFSportsNight";
      src: url("assets/fonts/SFSportsNightNSUpright.ttf") format("truetype");
      font-style: normal;
      font-weight: normal;
  }

  #app {
    min-height: 100vh;
    position: relative;
    // font-family: 'Source Sans Pro', sans-serif;
    font-family: 'Niramit', sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $white;
    background-color: $grey;
    line-height: 1.4;
    text-align: center;
    overflow: hidden;
  }

  main{
    min-height: calc(100vh - 200px);
    padding: 40px 0 90px;
    box-sizing: border-box;
    position: relative;
    &:before{
      content: "";
      position: absolute;
      top: -20%;
      left: -20%;
      height: 700px;
      width: 700px;
      border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
      background-color: $green;
      animation: border 10s infinite;
      opacity: 0.05;
      z-index: 2;
    }
    &:after{
      content: "";
      position: absolute;
      bottom: -20%;
      right: -20%;
      height: 700px;
      width: 700px;
      border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
      background-color: $green;
      animation: border 10s infinite;
      opacity: 0.05;
      z-index: 2;
    }
  }

  @keyframes border {
    from {
      transform: scale(1);
      opacity: 0.05;
      border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.1;
      border-radius: 70% 60% 30% 90% / 90% 70% 40% 50%;
    }
    to{
      transform: scale(1);
      opacity: 0.05;
      border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    }
  }

  .container {
      position: relative;
      min-width: 1170px;
      max-width: 1170px;
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
      z-index: 4;
  }

  h2{
    margin-bottom: 40px;
    font-size: 28px;
    font-family: "SFSportsNight";
    text-align: center;
    color: $goldLight;
    text-shadow: 0px 0px 100px rgba($goldLight, 0.9);
  }

  .notice {
    box-sizing: border-box;
    border-radius: 2px;
    padding: 15px;
    margin: 5px;

    .notification-title {
      color: $white;
      text-transform: uppercase;
      font-size: 14px;
    }

    .notification-content {
      color: $white;
      text-align: left;
    }

    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #E54D42;
      border-left-color: #B82E24;
    }

    &.success {
      background: $green;
      border-left-color: #42A85F;
    }
  }
  @media screen and (max-width: 768px) {
    main{
      padding: 60px 0;
    }
    .container{
      overflow-x: hidden;
      min-width: inherit;
      max-width: 450px;
    }
    h2{
      margin-bottom: 20px;
    }
  }
</style>
