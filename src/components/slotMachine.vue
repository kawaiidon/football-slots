<template>
  <div class="slot">
    <div class="slot__title">
      {{slotsDesc}}
    </div>
    <div class="slot__wrapper" v-if="slotsEnabled">
        <div class="slot__items">
          <div class="slot__item">
            <div class="slot-item slot-first" :class="{blured : movingFirst, animate: movingFirst}">
              <div class="slot-item__date">
                {{outcome.game_at_short_est}}
              </div>
              <div class="slot-item__teams">
                <div class="slot-team">
                  <div class="slot-team__logo"
                  :class="{blured: !movingFirst}"
                  v-bind:style="{'background-image': `url(${outcome.away_team !== null ? outcome.away_team.logo_url : defaultPics.awayTeam})`}"></div>
                  <div class="slot-team__name">
                    {{outcome.away_team !== null ? outcome.away_team_name : 'Away team' }}
                  </div>
                </div>
                <div class="slot-team">
                  <div class="slot-team__logo"
                  :class="{blured: !movingFirst}"
                  v-bind:style="{'background-image': `url(${outcome.home_team !== null ? outcome.home_team.logo_url : defaultPics.homeTeam})`}"></div>
                  <div class="slot-team__name">
                    {{outcome.home_team !== null ? outcome.home_team_name : 'Home team' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slot__item">
            <div class="slot-item slot-second" :class="{blured : movingSecond, animate: movingSecond}">
              <div class="slot-player">
                <div class="slot-player__photo" v-if="outcome.subject_type === 'Player'"
                :class="{blured: !movingFirst}"
                v-bind:style="{'background-image': `url(${outcome.subject !== null ? outcome.subject.photo_url : defaultPics.player})`}"></div>
                <div class="slot-player__photo" v-else v-bind:style="{'background-image': `url(${outcome.subject !== null ? outcome.subject.logo_url : teamIcon})`}"></div>
                <div class="slot-player__name">
                  {{outcome.subject_name}}
                </div>
              </div>
            </div>
          </div>
          <div class="slot__item">
            <div class="slot-item slot-third" :class="{blured : movingThird, animate: movingThird}">
              {{outcome.measure}}
            </div>
          </div>
          <div class="slot__item">
            <div class="slot-item slot-fourth" :class="{blured : movingFourth, animate: movingFourth}">
              {{outcome.goal}}
            </div>
          </div>
        </div>
        <div class="slot__progress">
          <div class="progressbar">
            <div class="progressbar__title">
              {{ counter }} spins of {{ maxTurns }}
            </div>
            <div class="progressbar__bar" v-bind:style="{width: progress}"></div>
          </div>
        </div>
    </div>
    <div class="slot__sidebar" v-if="slotsEnabled">
      <div class="slot__btn" :class="{disabled : movingFourth}" @click="spin()">
        <span>spin</span>
      </div>
      <div class="slot__desc result" :class="{show : !movingFourth}">
        {{outcome.description}}
      </div>
    </div>
    <slotsPlaceholder v-if="!slotsEnabled"/>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
import slotsPlaceholder from '@/components/slotsPlaceholder.vue'
import { players, teams } from '../data/slots'

export default {
  name: 'Slotmachine',
  components: {
    customButton,
    slotsPlaceholder
  },
  data () {
    return {
      movingFirst: false,
      movingSecond: false,
      movingThird: false,
      movingFourth: false,
      teamIcon: require('../assets/team.png'),
      playerIcon: require('../assets/player.png'),
      spinTime: 100
    }
  },
  computed: {
    slotsEnabled: function () {
      return this.$store.getters.isEnabled
    },
    progress: function () {
      let persent = (this.counter / this.maxTurns) * 100
      return persent + '%'
    },
    authenticated () {
      return this.$store.getters.isAuthenticated
    },
    counter () {
      return this.$store.getters.spinCounter
    },
    totalSpins () {
      return this.$store.getters.totalSpins
    },
    outcome () {
      if (Object.keys(this.$store.getters.lastOutcome).length === 0) {
        return {
          game_at: 'game date',
          away_team: null,
          home_team: null,
          subject: null,
          subject_type: 'Player',
          subject_name: 'Player name',
          measure: 'measure',
          goal: 'goal'
        }
      } else {
        return this.$store.getters.lastOutcome
      }
    },
    slotsDesc () {
      return this.$store.state.slotsDesc !== null ? this.$store.state.slotsDesc : 'Pro football sweeps'
    },
    questions: function () {
      return this.$store.state.questionsList
    },
    defaultPics: function () {
      let pics

      let totalPlayers = players.length - 1
      let totalTeams = teams.length - 1

      if (this.$store.state.spinCounter === 0) {
        pics = {
          awayTeam: teams[Math.round(Math.random() * (totalTeams - 3) + 3)].url,
          homeTeam: teams[Math.round(Math.random() * ((totalTeams - 3) - 0) + 0)].url,
          player: players[Math.round(Math.random() * (totalPlayers - 0) + 0)].url
        }
      } else {
        pics = {
          awayTeam: this.teamIcon,
          homeTeam: this.teamIcon,
          player: this.playerIcon
        }
      }

      return pics
    },
    maxTurns: function () {
      return this.$store.state.totalSpins !== null ? this.$store.state.totalSpins : 8
    }
  },
  mounted: function () {
    this.$store.watch(state => state.animateSlot, (newValue, oldValue) => {
      if (newValue) {
        this.movingFirst = true
        this.movingSecond = true
        this.movingThird = true
        this.movingFourth = true
      } else {
        setTimeout(_ => {
          this.movingFirst = false
        }, this.spinTime + 200)

        setTimeout(_ => {
          this.movingSecond = false
        }, this.spinTime + 400)

        setTimeout(_ => {
          this.movingThird = false
        }, this.spinTime + 700)

        setTimeout(_ => {
          this.movingFourth = false
        }, this.spinTime + 900)
      }
    })
  },
  watch: {
    counter () {
      if (this.counter === this.maxTurns) {
        this.$store.commit('NEW_ENTRIES', true)
        localStorage.setItem('user-new-entrues', true)
        setTimeout(_ => {
          this.$store.commit('POPUPS_STATE', { name: 'spins', show: true })
        }, 1500)
      }
    }
  },
  methods: {
    spin: function () {
      if (this.authenticated) {
        if (this.counter < this.maxTurns) {
          this.$store.dispatch('ROLL_SPIN', { type: 'registered' })

          this.checkQuestions()
        } else {
          this.$store.commit('POPUPS_STATE', { name: 'spins', show: true })
        }
      } else {
        this.$store.commit('DEMO_SPIN', true)
        if (this.counter < 2) {
          this.$store.dispatch('ROLL_SPIN', { type: 'demo' })
        } else {
          this.$store.commit('POPUPS_STATE', { name: 'register', show: true })
        }
      }
    },
    checkQuestions: function () {
      // переписать
      if (this.questions.length > 0) {
        let currentQUestion = this.questions.filter(question => question.spin_number === (this.totalSpins + 1))

        this.$store.commit('CURRENT_QUESTION', {})

        if (currentQUestion.length > 0) {
          this.$store.commit('CURRENT_QUESTION', currentQUestion)
          this.$store.commit('POPUPS_STATE', { name: 'poll', show: true })
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/colors.scss';
  .slot{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 15px;
    &__wrapper {
      display: flex;
      flex-direction: column;
      width: 910px;
    }
    &__items {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      height: 240px;
      border-radius: 2px;
      background-color: rgba($white, 0.15);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    }
    &__item{
      position: relative;
      // margin: 0 10px;
      height: 100%;
      width: 25%;
      overflow: hidden;
      pointer-events: none;
      font-family: "SFSportsNight";
      letter-spacing: 1px;
      &:after{
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 1px;
        height: 216px;
        opacity: 0.3;
        border-right: solid 1px $white;
      }
      &:last-child{
        &:after{
          display: none;
        }
      }
    }
    &__sidebar{
      width: 220px;
    }
    &__btn{
      position: relative;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 240px;
      border-radius: 2px;
      cursor: pointer;
      transition: 0.3s;
      background-color: $pink;
      color: $white;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      font-family: "SFSportsNight";
      &:before{
          content: "";
          height: 150%;
          width: 150%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          background-image: linear-gradient(109deg, #ff8a8a, #ffd9bf);
          z-index: 5;
          transition: 0.3s;
          border-radius: 400px;
      }
      span{
        position: relative;
        display: block;
        font-size: 22px;
        letter-spacing: 4px;
        text-transform: uppercase;
        transition: 0.3s;
        z-index: 10;
      }
      &:hover, &:active{
        background-color: $red;
        &:before{
          transform: translate(-50%, -50%) scale(1);
        }
      }
      &.disabled{
        pointer-events: none;
        opacity: 0.4;
      }
    }
    &__title{
      margin: 20px 0;
      width: 100%;
      line-height: 1.31;
      color: $white;
      font-size: 16px;
      text-align: left;
    }
    &__desc{
      width: 100%;
      line-height: 1.31;
      color: $white;
      font-size: 16px;
      text-align: left;
      &.show{
        opacity: 1;
      }
      &.result{
        margin-left: 10px;
        margin-top: 10px;
      }
    }
    &__progress{
      margin-top: 10px;
      width: 100%;
      height: 48px;
      border-radius: 2px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
  .progressbar{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba($white, 0.15);
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(74,74,74,.36);
    box-sizing: border-box;
    padding: 0px;
    &__bar{
      background-color: rgba($white, 0.2);
      transition: 0.3s;
      height: 100%;
      border-radius: 2px;
      width: 0%;
      z-index: 3;
      opacity: 0.5;
    }
    &__title{
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: absolute;
      padding-left: 32px;
      top: 0;
      left: 0;
      z-index: 5;
      color: $white;
      font-size: 28px;
      font-family: "SFSportsNight";
    }
  }
  .slot-item{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    will-change: filter;
    transition: 0.1s;
    color: #fff;
    text-transform: uppercase;
    font-size: 18px;
    text-shadow: 5px 0px 4px rgba(0, 0, 0, 0.3);
    &.slot-third, &.slot-fourth{
      font-size: 20px;
    }
    &__date{

    }
    &__teams{
      margin-top: 10px;
    }
    &.blured{
      filter: blur(5px);
    }
    &.animate{
      animation-name: spin;
      animation-duration: 0.3s;
      animation-iteration-count: infinite;
      &.slot-first{
        animation-delay: 0.1s;
        transition-delay: 0.1s;
      }
      &.slot-second{
        animation-delay: 0.2s;
        transition-delay: 0.2s;
      }
      &.slot-third{
        animation-delay: 0.3s;
        transition-delay: 0.3s;
      }
      &.slot-fourth{
        animation-delay: 0.4s;
        transition-delay: 0.4s;
      }
    }
  }
  .slot-team{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 5px 0;
    width: 200px;
    &__logo{
      height: 65px;
      width: 65px;
      background-position: 50% 50%;
      background-size: contain;
      background-repeat: no-repeat;
    }
    &__name{
      margin-left: 15px;
      width: 120px;
      word-break: break-word;
    }
  }
  .slot-player{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    &__photo{
      height: 100px;
      width: 80px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url('../assets/player.png');

    }
    &__name{
      margin: 15px 0;
    }
  }
  @keyframes spin {
    from{
      top: 100%;
    }
    to {
      top: -100%;
    }
  }
  @media screen and (max-width: 768px) {
    .slot{
      position: relative;
      margin-bottom: 20px;
      &__btn{
        position: absolute;
        bottom: 76px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 62px;
        margin: 0;
      }
      &__wrapper{
        width: 100%;
      }
      &__items{
        position: relative;
        flex-direction: row;
        flex-wrap: wrap;
        height: auto;
        background: none;
        box-shadow: none;
      }
      &__item{
        margin: 0 auto 10px;
        width: 100%;
        max-width: 400px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        &:after{
          display: none;
        }
        &:first-child{
          width: 100%;
          height: 115px;
        }
        &:nth-child(2) {
          width: 55%;
          height: 115px;
        }
        &:nth-child(3) {
          margin-left: 10px;
          margin-right: 0;
          height: 50px;
          width: 41%;
        }
        &:nth-child(4) {
          margin-left: 10px;
          position: absolute;
          right: 0;
          bottom: 0;
          height: 50px;
          width: 41%;
        }
      }
      &__sidebar{
        width: 100%;
      }
      &__desc{
        line-height: 1.4;
        &.result{
          margin-left: 0;
          height: 22px;
        }
      }
      &__progress{
        margin-top: 80px;
        height: 32px;
      }
    }

    .slot-item{
      text-transform: inherit;
      font-size: 16px;
      &.slot-third, &.slot-fourth{
        font-size: 16px;
      }
      &__teams{
        width: 100%;
        margin-top: 0;
      }
      &__date{
        display: none;
      }
    }

    .slot-team{
      width: 100%;
      justify-content: center;
      margin: 0;
      padding: 5px 0;
      &__logo{
        height: 40px;
        width: 40px;
      }
      &__name{
        margin-left: 15px;
      }
    }

    .slot-player{
      flex-wrap: nowrap;
      &__photo{
        width: 44px;
        height: 60px;
      }
    }

    .progressbar{
      &__title{
        padding-left: 16px;
        font-size: 16px;
      }
    }
  }
</style>
