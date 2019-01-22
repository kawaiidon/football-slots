<template>
  <footer class="footer">
    <div class="footer__wrapper container">
      <div class="footer__menu">
        <div class="footer-menu">
          <router-link to="/terms" class="footer-menu__link">
            TERMS
          </router-link>
          <router-link to="/privacy" class="footer-menu__link">
            PRIVACY
          </router-link>
        </div>
      </div>
      <div class="footer__copyright">
        © 2018 fastsweeps.club
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/colors.scss';
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    &__wrapper{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &__copyright{
      opacity: 0.5;
      font-size: 14px;
    }
  }
  .footer-menu{
    &__link{
      margin-right: 40px;
      font-size: 14px;
      color: $white;
      text-decoration: none;
      transition: 0.3s;
      font-family: "SFSportsNight";
      letter-spacing: 1px;
      &:hover{
        color: $pink;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .footer{
      &__copyright{
        font-size: 11px;
      }
    }
    .footer-menu{
      &__link{
        margin-right: 15px;
      }
    }
  }
</style>
