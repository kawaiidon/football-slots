<template>
  <div class="placeholder">
    <div class="placeholder__title">
      {{announce}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'announce',
  computed: {
    announce: function () {
      return this.$store.state.slotsAnnounce !== null ? this.$store.state.slotsAnnounce : 'Now you can not play'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/colors.scss';
  .placeholder{
    height: 240px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($white, 0.15);
    border-radius: 2px;
    &__title{
      line-height: 38px;
      font-size: 30px;
      color: #FFFFFF;
      text-shadow: 0px 2px 40px #4ED8AE;
      font-family: "SFSportsNight";
    }
  }
  @media screen and (max-width: 768px) {

  }
</style>
