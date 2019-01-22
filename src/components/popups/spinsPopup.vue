<template>
  <div class="overlay" :class="{active: $store.getters.popupState('spins')}">
    <div class="popup outcomes" :class="{active: $store.getters.popupState('spins')}">
      <div class="popup__wrapper">
        <div class="popup__inner">
          <div class="popup__title">Sweeps Entry</div>
          <div class="outcomes">
            <div class="outcomes__list-wrapper">
              <ol class="outcomes__list">
                <li class="outcomes-item" v-for="(outcome, i) in outcomesList" :key="i">
                  <div class="outcomes-item__wrapper">
                    <div class="outcomes-item__num">
                      {{i + 1}}
                    </div>
                    <div class="outcomes-item__logo" v-if="outcome.subject_type === 'Player'" v-bind:style="{'background-image': `url(${outcome.subject !== null ? outcome.subject.photo_url : playerIcon})`}"></div>
                    <div class="outcomes-item__logo" v-else v-bind:style="{'background-image': `url(${outcome.subject !== null ? outcome.subject.logo_url : playerIcon})`}"></div>
                    <div class="outcomes-item__text">
                      {{outcome.game_at_short_est}} - {{outcome.away_team.name}} at {{outcome.home_team.name}} {{outcome.description}}
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <div class="outcomes__buttons">
              <customButton class="outcomes__button" :text="'Play again'" @click.native="startNewRound"/>
              <customButton class="outcomes__button" :text="'Checkout entries'" @click.native="redirectToList"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
export default {
  name: 'NewSpinRoundPopup',
  components: {
    customButton
  },
  data () {
    return {
      playerIcon: require('@/assets/player.png'),
      teamIcon: require('@/assets/team.png')
    }
  },
  computed: {
    outcomesList: function () {
      return this.$store.state.outcomesList
    }
  },
  methods: {
    startNewRound: function () {
      this.rebootSlots()
      this.newSpin()
    },
    redirectToList: function () {
      this.rebootSlots()
      this.$router.push('entries')
    },
    rebootSlots: function () {
      this.$store.commit('POPUPS_STATE', { name: 'spins', show: false })
      setTimeout(_ => {
        this.$store.commit('FIRST_SPIN', { id: 0, total: 8 })
        this.$store.commit('NEW_INCREMENT_SPIN', 0)
        this.$store.commit('FETCH_OUTCOME', {})
        this.$store.commit('DELETE_USER_OUTCOMES')
      }, 100)
    },
    newSpin: function () {
      setTimeout(_ => {
        this.$store.dispatch('ROLL_SPIN', { type: 'register' })
        this.$store.commit('ANIMATE_SLOT', true)
      }, 100)
    }
  }
}
</script>

<style src='./popup.scss' lang="scss"></style>

<style scoped lang="scss">
  .outcomes{
    &__title{
      text-transform: uppercase;
    }
    &__list{
      margin: 20px 0;
    }
    &__buttons{
      display: flex;
      justify-content: center;
    }
    &__button{
      width: 230px;
      &:first-child{
        margin-right: 15px;
      }
    }
  }
  .outcomes-item{
    margin-bottom: 10px;
    &__wrapper{
      display: flex;
      align-items: center;
    }
    &__logo{
      margin-left: 20px;
      height: 40px;
      width: 40px;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
    &__text{
      width: 100%;
      display: flex;
      margin-left: 20px;
    }
    &__teams{
      margin-left: 5px;
    }
    &__result{

    }
  }
  @media screen and (max-width: 768px) {
    .outcomes{
      &__list-wrapper{
        overflow: hidden;
        max-height: 65vh;
        min-height: 35vh;
      }
      &__list{
        height: 65vh;
        overflow-x: scroll;
      }
      &__buttons{
        margin-top: 20px;
      }
    }
  }
</style>
