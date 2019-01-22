<template>
  <div class="rules-texts"  v-html="rules">

  </div>
</template>
<script>

export default {
  name: 'rules',
  data () {
    return {
      rules: ''
    }
  },
  mounted () {
    this.fetchRules()
  },
  methods: {
    fetchRules: function () {
      this.$store.dispatch('FETCH_RULES').then((response) => {
        this.rules = response.data.rules
      })
    }
  }
}
</script>
<style lang="scss">
  .rules-texts{
    // margin-top: 50px;
    text-align: left;
    line-height: 1.4;
    b{
      font-weight: bold;
    }
    ul{
      margin-top: 25px;
      list-style-type: decimal;
    }
    ol {
      list-style-type: decimal;
      ol {
        list-style-type: lower-latin;
      }
    }
    li{
      padding-left: 5px;
      margin-left: 15px;
      margin-bottom: 25px;
      list-style: inherit;
    }
    &__sublist{
      margin-left: 20px;
    }
  }
  @media screen and (max-width: 768px) {
    .rules-texts{
      ul{
        margin-top: 25px;
      }
      li{
        margin-bottom: 10px;
      }
      &__sublist{
        margin-left: 0px;
        margin-top: 25px;
      }
    }
  }
</style>
