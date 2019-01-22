<template>
  <div class="entries-list">
    <adBanner :place="'my_entries_top'"/>
    <div class="entires-item"
      v-for="(entrie, i) in entiresList"
      :key="i"
    >
      <div class="entires-item__num">
        Entry {{ entrie.num }}
      </div>
      <div class="entires-item__outcomes">
        <div class="outcomes-list">
          <div class="outcomes-list__item"
            v-for="(outcome, i) in entrie.outcomes"
            :key="i"
            >
            <div class="outcome-item" :class="{vinner: entrie.is_win}">
              <div class="outcome-item__head">
                <div class="outcome-item__date">
                  {{outcome.game_at_short}}
                </div>
                <div class="outcome-item__teams">
                  <div class="outcome-team">
                    <div class="outcome-team__logo" v-bind:style="{'background-image': `url(${outcome.away_team.logo_url})`}"></div>
                    <div class="outcome-team__name">
                      {{outcome.away_team.full_name}}
                    </div>
                  </div>
                  <div class="outcome-team">
                    <div class="outcome-team__logo" v-bind:style="{'background-image': `url(${outcome.home_team.logo_url})`}"></div>
                    <div class="outcome-team__name">
                      {{outcome.home_team.full_name}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="outcome-item__info">
                <div class="outcome-item__col">
                  <div class="outcome-player">
                    <div class="outcome-player__photo" v-if="outcome.subject_type === 'Player'" v-bind:style="{'background-image': `url(${outcome.subject !== null ? outcome.subject.photo_url : playerIcon})`}"></div>
                    <div class="outcome-player__photo" v-else v-bind:style="{'background-image': `url(${outcome.subject !== null ? outcome.subject.logo_url : playerIcon})`}"></div>
                    <div class="outcome-player__name">
                      {{outcome.subject_name}}
                    </div>
                  </div>
                </div>
                <div class="outcome-item__col">
                  {{outcome.measure}}
                </div>
                <div class="outcome-item__col">
                  {{outcome.goal}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="entires-item__ad">
        <adBanner :place="`my_entries_between${i + 1}`"/>
      </div>
    </div>
    <div class="entries-list__pagination">
      <pagination :itemsPerPage="5"/>
    </div>
    <adBanner v-if="entiresList.length < 1" :place="'my_entries_bottom'"/>
  </div>
</template>

<script>
import pagination from '@/components/ui/pagination.vue'
import adBanner from '@/components/adBanner.vue'

export default {
  name: 'entriesList',
  components: {
    adBanner,
    pagination
  },
  props: {
    entiresList: {}
  },
  data () {
    return {
      playerIcon: require('../assets/player.png'),
      teamIcon: require('../assets/team.png')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';
.entries-list{
  position: relative;
  &:empty{
    &:before{
      content: "No entries on this week";
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &__pagination{
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }
}
.entires-item{
  margin-top: 15px;
  position: relative;
  &.finished{

  }
  &__ad{
    margin-top: 10px;
  }
  &__num{
    text-align: left;
    font-size: 28px;
    color: $white;
    font-family: "SFSportsNight";
  }
  &__date{
    margin-left: auto;
  }
  &__outcomes{
    margin-top: 15px;
  }
}
.outcomes-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__item{
    position: relative;
    margin-bottom: 20px;
    width: 49%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
}
.outcome-item{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 110px;
  background-color: rgba($white, 0.1);
  border-radius: 2px;
  background-color: #42475c;
  &.vinner{
    .outcome-item__info, .outcome-player__name{
      color: #FFC409!important;
    }
    &:before{
      content: "";
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translate(-50%);
      box-shadow: 0px 10px 40px #FFC409;
      height: 80px;
      width: 90%;
      z-index: -1;
    }
  }
  &__head{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    text-align: center;
    background-color: rgba($white, 0.1);
    font-size: 12px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  }
  &__date{
    margin-right: auto;
    margin-left: 10px;
  }
  &__teams{
    display: flex;
  }
  &__info{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 30px);
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.1);
  }
  &__col{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    &:first-child{
      box-sizing: border-box;
      padding-left: 20px;
      justify-content: center;
      align-items: flex-start;
    }
    &:nth-child(2){
      width: 30%;
    }
    &:nth-child(3){
      width: 30%;
    }
  }
}
.outcome-team{
  display: flex;
  align-items: center;
  margin-right: 34px;
  &__logo{
    height: 16px;
    width: 16px;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &__name{
    margin-left: 8px;
  }
}
.outcome-player{
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  // flex-wrap: wrap;
  &__photo{
    height: 60px;
    width: 50px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('../assets/player.png');
  }
  &__name{
    margin-left: 15px;
    color: $green;
    text-align: left;
  }
}
@media screen and (max-width: 768px) {
  .entries-list{
    &__pagination{
      margin-top: 40px;
    }
  }
  .entires-item{
    margin-top: 10px;
    &__num{

    }
    &__outcomes{
      margin-top: 10px;
    }
  }
  .outcomes-list{
    &__item{
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .outcome-item{
    height: auto;
    display: block;
    border-radius: 2px;
    overflow: hidden;
    &__head{
      height: 40px;
      font-size: 10px;
    }
    &__teams{
      flex-direction: column;
    }
    &__desc{
      margin-top: 5px;
      line-height: 1.4;
    }
    &__info{
      margin-top: 0px;
      height: auto;
      font-size: 12px;
      height: 45px;
    }
    &__col{
      height: 45px;
      width: 33%;
      justify-content: flex-start;
      padding-top: 6px;
    }
  }
  .outcome-player{
    height: 100%;
    align-items: flex-start;
    &__photo{
      width: 28px;
      height: 32px;
    }
    &__name{
      margin-left: 10px;
    }
  }
  .outcome-team{
    margin-right: 15px;
  }
}
</style>
