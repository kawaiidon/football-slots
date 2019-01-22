<template>
  <div class="pagination" v-show="options.total_pages > 1">
    <div class="pagination__item" :class="{active: options.current_page == index + 1}" v-for="(page, index) in options.total_pages" :key="page" @click="showPage(index + 1)">
      <div class="pagination__num">
        {{index + 1}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    'itemsPerPage': {
      default: 0
    }
  },
  data () {
    return {
      count: 0
    }
  },
  mounted () {

  },
  computed: {
    options: function () {
      return this.$store.getters.pagination
    }
  },
  methods: {
    showPage: function (page) {
      this.$store.dispatch('GET_USER_ENTIRES', { type: '', page: page, total: 5 })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/colors.scss';
  .pagination{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    &__item{
      position: relative;
      margin: 0 15px;
      cursor: pointer;
      font-size: 18px;
      transition: 0.3s;
      &:before{
        content: "";
        position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        height: 40px;
        width: 40px;
        border-radius: 50px;
        background-color: $green;
        transform: scale(0);
        transition: 0.3s;
        opacity: 0.3;
        z-index: 1;
      }
      &:hover, &.active{
        &:before{
          transform: scale(1);
        }
      }
    }
    &__num{
      position: relative;
      z-index: 3;
    }
  }
  @media screen and (max-width: 768px) {
    .pagination{
      &__item{
        margin: 15px;
        font-size: 14px;
      }
    }
  }
</style>
