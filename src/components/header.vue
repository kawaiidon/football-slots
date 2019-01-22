<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link class="header__logo" to="/"></router-link>
      <div class="header__notifier" v-if="hasNewEntries"></div>
      <div class="header__burger" :class="{active: mobileMenu}" @click="showMobileMenu()">
        <span></span><span></span><span></span>
      </div>
      <div class="header__menu" :class="{active: mobileMenu}">
        <div class="header-menu">
          <div class="header-menu__links">
            <router-link to="/" class="header-link">
              slots
            </router-link>
            <!-- <router-link to="/slots" class="header-link">
              slots
            </router-link> -->
            <router-link to="/howto" class="header-link">
              how to play
            </router-link>
            <router-link to="/rules" class="header-link">
              rules
            </router-link>
          </div>
          <div class="header-menu__right-block" v-if="authenticated">
            <div class="header-menu__links">
              <router-link to="/entries" class="header-link" :class="{notified: hasNewEntries}">
                My Entries
              </router-link>
              <router-link to="/results" class="header-link" :class="{notified: hasWins}">
                My Results
              </router-link>
              <router-link to="/profile" class="header-link">
                profile
              </router-link>
              <div class="header-link" @click="logout()">
                logout
              </div>
            </div>
            <div class="header__user">
              <div class="header-user">
                <div class="header-user__wrapper">
                  {{user.first_name}} {{user.last_name}}
                </div>
                <div class="header-user__avatar">

                </div>
              </div>
            </div>
          </div>
          <div class="header-menu__links right" v-if="!authenticated">
            <div class="header-link" @click="showLoginPopup()">
              login
            </div>
            <div class="header-link" @click="showRegisterPopup()">
              Register to win real cash!
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {

  },
  data () {
    return {
      mobileMenu: false
    }
  },
  created: function () {
    let self = this
    window.addEventListener('click', function (e) {
      if (!self.$el.contains(e.target)) {
        self.mobileMenu = false
      }
    })
  },
  watch: {
    $route (to, from) {
      this.mobileMenu = false

      if (to.name === 'entries') {
        this.$store.commit('NEW_ENTRIES', false)
        localStorage.setItem('user-new-entrues', false)
      }
    }
  },
  computed: {
    authenticated () {
      return this.$store.getters.isAuthenticated
    },
    user () {
      return this.$store.getters.userInfo
    },
    hasNewEntries () {
      return this.$store.getters.newEntries
    },
    hasWins () {
      return this.$store.getters.newWins
    }
  },
  methods: {
    showLoginPopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'login', show: true })
    },
    showRegisterPopup: function () {
      this.$store.commit('POPUPS_STATE', { name: 'register', show: true })
    },
    showMobileMenu: function () {
      this.mobileMenu = !this.mobileMenu
    },
    logout: function () {
      this.$store.dispatch('USER_LOGOUT')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/colors.scss';
  .container{
    padding: 0 20px;
  }
  .header{
    position: relative;
    height: 60px;
    // background: $grey;
    // border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
    // box-shadow: 0 1px 4px rgba(74, 74, 74, 0.36);
    z-index: 3;
    &__wrapper{
      padding: 0 30px;
      box-sizing: border-box;
    }
    &__logo{
      height: 50px;
      width: 120px;
      background-position: 50% 50%;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('../assets/pivit_new_logo.svg');
    }
    &__wrapper{
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
    }
    &__burger{
      display: none;
    }
    &__menu{
      margin-left: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    &__user{
      margin-left: 52px;
    }
  }
  .header-user{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &__wrapper{
      display: flex;
      align-items: center;
      // text-transform: uppercase;
      font-size: 14px;
      margin-right: 10px;
      color: $white;
    }
    &__avatar{
      height: 20px;
      width: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-image: url('../assets/user.svg');
    }
  }
  .header-menu{
    width: 100%;
    display: flex;
    align-items: flex-end;
    &__right-block{
      margin-left: auto;
      display: flex;
      align-items: center;
    }
    &__links{
      display: flex;
      justify-content: center;
      align-items: center;
      &.right{
        margin-left: auto;
      }
    }
  }

  .header-link{
    position: relative;
    margin-left: 10px;
    cursor: pointer;
    text-transform: uppercase;
    margin-left: 38px;
    transition: 0.2s;
    font-size: 14px;
    color: $white;
    text-decoration: none;
    font-family: "SFSportsNight";
    letter-spacing: 1px;
    &:hover, &.router-link-exact-active{
      // color: $pink;
      // text-shadow: 1px 1px 11px rgba($white, 0.5);
      &:after{
        opacity: 0.1;
        top: -3px;
      }
    }
    &:after{
      content: "";
      position: absolute;
      left: -8px;
      top: 10px;
      height: calc(100% + 4px);
      width: calc(100% + 16px);
      background-color: $white;
      opacity: 0;
      border-radius: 2px;
      transition: 0.3s;
    }
    &:first-child{
      margin-left: 0;
    }
    &.notified{
      &:before{
        content: "";
        position: absolute;
        left: -24px;
        top: 1px;
        height: 15px;
        width: 15px;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url('../assets/alarm-bell.svg');
      }
    }
  }
  @media screen and (max-width: 768px) {
    .header{
      position: fixed;
      top: 0;
      right: 0;
      height: 45px;
      width: 100%;
      background-color: #565b6e;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      z-index: 40;
      &__wrapper{
        padding: 0 14px;
      }
      &__logo{
        height: 25px;
        width: 54px;
      }
      &__user{
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        margin: 0;
      }
      &__menu{
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0;
        height: 100vh;
        width: 60vw;
        background-color: $grey;
        z-index: 30;
        border-left: 0.5px solid rgba(0, 0, 0, 0.3);
        transform: translateX(60vw);
        opacity: 0;
        transition: 0.2s;
        transition-timing-function: ease-in;
        &:before, &:after{
          content: "";
          position: absolute;
          left: 0;
          height: 4px;
          width: 100%;
          background-color: $green;
          opacity: 0.3;
        }
        &:before{
          top: 0;
        }
        &:after{
          bottom: 0;
        }
        &.active{
          opacity: 1;
          transform: translateX(0vw);
          transition-timing-function: ease-out;
        }
      }
      &__notifier{
        margin-left: auto;
        margin-right: 40px;
        height: 15px;
        width: 15px;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url('../assets/alarm-bell.svg');
      }
      &__burger{
        position: fixed;
        top: 15px;
        right: 20px;
        margin-left: auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        height: 18px;
        width: 20px;
        z-index: 35;
        span{
          display: block;
          width: 20px;
          height: 2px;
          background-color: #ffffff;
          transition: 0.3s;
          &:nth-child(2) {
            transition: 0s;
          }
        }
        &.active{
          span{
            position: absolute;
            &:first-child{
              top: 10px;
              transform: rotate(-45deg);
            }
            &:nth-child(2) {
              opacity: 0;
            }
            &:last-child{
              top: 10px;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
    .header-menu{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &__links{
        flex-direction: column;
      }
      &__right-block{
        margin-left: inherit;
        margin-top: 15px;
        padding-top: 15px;
        margin-left: inherit;
        border-top: 0.5px solid rgba(0, 0, 0, 0.3);
      }
      &__btn{
        margin: 6px 0;
        font-size: 12px;
        margin-left: 0;
      }
    }

    .header-menu__links.right {
      margin-left: 0;
    }

    .header-user{
      justify-content: center;
      flex-direction: column-reverse;
      &__wrapper{
        margin-top: 10px;
        margin-right: 0;
      }
      &__avatar{
        height: 50px;
        width: 50px;
      }
    }
    .header-link{
      margin: 10px 0;
    }
  }
  @media screen and (max-width: 768px) and (orientation: landscape)  {
    .header{
      &__menu{
        display: block;
        height: 500px;
        width: 30vw;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }
    .header-menu{
      margin-top: 100px;
      height: 485px;
    }
  }
</style>
