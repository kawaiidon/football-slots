<template>
  <main>
    <div class="container">
      <h2 class="title">
        MY WIN RESULTS
      </h2>
      <div class="entries-filters">
        <div class="entries-filters__item">

        </div>
      </div>
      <entriesList
        :entiresList="entiresList"
        entriesType="'results'"
      />
    </div>
    <preloader/>
    <termsPopup/>
  </main>
</template>

<script>
import preloader from '@/components/ui/preloader.vue'
import entriesList from '@/components/entriesList.vue'
import termsPopup from '@/components/popups/termsPopup.vue'

export default {
  name: 'Spins',
  components: {
    preloader,
    entriesList,
    termsPopup
  },
  data () {
    return {
    }
  },
  computed: {
    entiresList: function () {
      return this.$store.getters.resultsList
    }
  },
  mounted: function () {
    this.getUserResults()
  },
  methods: {
    getUserResults: function () {
      this.$store.dispatch('GET_USER_ENTIRES', { type: '/results' })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
