<template>
  <main>
    <div class="container">
      <h2 class="title">
        My Entries
      </h2>
      <div class="entries-filters">
        <div class="entries-filters__item">

        </div>
      </div>
      <entriesList
        :entiresList="entiresList"
        enriesType="'current'"
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
      return this.$store.getters.entriesList
    }
  },
  mounted: function () {
    this.getUserEntries()
  },
  methods: {
    getUserEntries: function () {
      this.$store.dispatch('GET_USER_ENTIRES', { type: '' })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
