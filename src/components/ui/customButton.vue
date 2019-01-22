<template>
<button :disabled="disabled" v-html="text" :class="buttonClass"></button>
</template>

<script>
export default {
  name: 'customButton',
  props: {
    'text': String,
    'disabled': Boolean,
    'buttonStyle': {
      default: 'green'
    }
  },
  data () {
    return {
      buttonClass: ('button ' + this.buttonStyle)
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/colors.scss';
  .button{
    height: 48px;
    width: 100%;
    padding: 0;
    background: none;
    font-size: 14px;
    letter-spacing: 0.233333px;
    border: none;
    transition: 0.3s;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    &:active{
      transform: scale(1.03);
    }
    &.green {
      background: #11BA95;
      color: #fff;
      &:hover, &:active{
        background: #2fedc4;
      }
    }
    &.blue{
      background: #7db9e8;
      // background: linear-gradient(to right, $blue 5%,#00cbdf 100%,#7db9e8 100%);
      color: #fff;
      &:hover, &:active{
        background: #00cbdf;
        // background: linear-gradient(to right, #cc7dcf 5%,#ff78b1 100%,#7db9e8 100%);
      }
    }
    &.red{
      background: #d94242;
      color: #fff;
      &:hover, &:active{
        background: #e84e4e;
      }
    }
    &.gold{
      background: $gold;
      color: #fff;
      &:hover, &:active{
        background: $goldLight;
      }
    }
    &:disabled{
      opacity: 0.7;
      pointer-events: none;
      background-color: $grey;
    }
  }
  @media screen and (max-width: 768px) {
    .button{
      font-size: 16px;
      height: 45px;
    }
  }
</style>
