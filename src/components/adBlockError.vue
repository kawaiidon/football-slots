<template>
  <div class="addblock-error">
    <div class="addblock-error__logo">

    </div>
    <div class="addblock-error__desc">
      PLEASE DISABLE ADBLOCK AND RELOAD PAGE
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  @import '@/assets/styles/colors.scss';
  .addblock-error{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 555555;
    height: 100vh;
    width: 100vw;
    background-color: $grey;
    &__logo{
      height: 150px;
      width: 150px;
      background-image: url('../assets/adblock.png');
      background-size: cover;
    }
    &__desc{
      margin-top: 20px;
      text-align: center;
      font-size: 28px;
      text-transform: uppercase;
      color: #fff;
    }
  }
</style>
