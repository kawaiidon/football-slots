<template>
  <div class="preloader" v-if="$store.state.preloader"></div>
</template>

<script>
export default {
  name: 'preloader',
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
  .preloader{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 165;
    background-color: rgba(#66748C, 0.2);
    filter: blur(2px);
    &:before, &:after {
      content: "";
      position: absolute;
      top: calc(50% - 15px);
      left: calc(50% - 15px);
      width: 30px;
      height: 30px;
      border-radius: 30px;
      background-color: $green;
      opacity: 0.6;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }
    &:after {
      animation-delay: -1.0s;
    }
  }
  @-webkit-keyframes sk-bounce {
    0%, 100% { transform: scale(0.0) }
    50% { transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
    }
  }
</style>
