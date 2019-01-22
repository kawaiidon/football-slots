import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import router from '@/router.js'
// import './plugins/axios'
const BASE_URL = 'https://api.pivit.io'

Vue.use(Vuex)
Vue.use(VueCookie)
// Vue.use(axios)

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common['Token'] = token
}

export default new Vuex.Store({
  state: {
    //  user
    isAuthenticated: false,
    token: localStorage.getItem('user-token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    hasNewEntries: JSON.parse(localStorage.getItem('user-new-entrues')) || false,
    hasWinResults: false,
    //  slots
    spinsDemo: true,
    animateSlot: false,
    spinId: null,
    spinCounter: 0,
    totalSpinCounter: 0,
    slotsEnabled: true,
    slotsAnnounce: null,
    slotsDesc: null,
    totalSpins: null,
    outcome: {},
    outcomesList: [],
    //  popups
    popups: {
      login: false,
      register: false,
      poll: false,
      video: false,
      terms: false,
      spins: false,
      offer: false
    },
    //  misc
    mobile: false,
    preloader: false,
    pagination: {},
    entriesList: {},
    resultsList: {},
    questionsList: {},
    currentQuestion: {},
    banners: [],
    addBlock: false
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userInfo: state => state.user,
    spinCounter: state => state.spinCounter,
    totalSpins: state => state.totalSpinCounter,
    lastOutcome: state => state.outcome,
    entriesList: state => state.entriesList,
    resultsList: state => state.resultsList,
    newEntries: state => state.hasNewEntries,
    newWins: state => state.hasWinResults,
    banners: state => state.banners ? state.banners : [],
    isEnabled: state => state.slotsEnabled,
    currentQuestion: state => state.currentQuestion,
    popupState: state => name => state.popups[name],
    pagination: state => state.pagination
  },
  mutations: {
    MOBILE(state, amount) {
      state.mobile = amount
    },
    ADDBLOCK(state, amount) {
      state.addBlock = amount
    },
    USER_LOGIN(state, amount) {
      state.token = amount.token
      state.isAuthenticated = amount.status
      state.user = amount.user
    },
    EDIT_USER(state, amount) {
      state.user = amount
    },
    ANIMATE_SLOT(state, amount) {
      state.animateSlot = amount
    },
    POPUPS_STATE(state, amount) {
      state.popups[amount.name] = amount.show
    },
    FIRST_SPIN(state, amount) {
      state.spinId = amount.id
      state.totalSpins = amount.total
    },
    DEMO_SPIN(state, amount) {
      state.spinsDemo = amount
    },
    FETCH_OUTCOME(state, amount) {
      state.outcome = amount
    },
    FETCH_QUESTIONS(state, amount) {
      state.questionsList = amount
    },
    CURRENT_QUESTION(state, amount) {
      state.currentQuestion = amount
    },
    INCREMENT_SPIN(state) {
      state.spinCounter++
    },
    INCREMENT_TOTAL_SPINS(state) {
      state.totalSpinCounter++
    },
    NEW_INCREMENT_SPIN(state, amount) {
      state.spinCounter = amount
    },
    PRELOADER(state, amount) {
      state.preloader = amount
    },
    USER_OUTCOMES(state, amount) {
      state.outcomesList.push(amount)
    },
    DELETE_USER_OUTCOMES(state) {
      state.outcomesList = []
    },
    USER_ENTIRES(state, amount) {
      state.entriesList = amount
    },
    USER_ENTIRES_RESULTS(state, amount) {
      state.resultsList = amount
    },
    NEW_ENTRIES(state, amount) {
      state.hasNewEntries = amount
    },
    FETCH_BANNERS(state, amount) {
      state.banners = amount
    },
    PERIOD(state, amount) {
      state.slotsEnabled = amount
    },
    ANNOUNCE(state, amount) {
      state.slotsAnnounce = amount
    },
    SLOTS_DESC(state, amount) {
      state.slotsDesc = amount
    },
    RESULTS_WINS(state, amount) {
      state.hasWinResults = amount
    },
    PAGINATION_META(state, amount) {
      state.pagination = amount
    }
  },
  actions: {
    POPUPS_STATE(context, popup) {
      context.commit('POPUPS_STATE', {
        name: popup.name,
        show: popup.show
      })
    },
    USER_LOGOUT(context, show) {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user')
      context.commit('USER_LOGIN', {
        'token': null,
        'status': false,
        'user': {}
      })
      context.commit('USER_ENTIRES', {})
      context.commit('NEW_ENTRIES', false)

      delete axios.defaults.headers.common['Token']

      Vue.notify({
        group: 'auth',
        type: 'warn',
        text: 'Goodbye!'
      })
    },
    USER_LOGIN(context, data) {
      context.commit('PRELOADER', true)
      let url = `${BASE_URL}/session.json`

      axios.post(url, data)
        .then(response => {
          context.commit('PRELOADER', false)
          if (response.status === 201 || response.status === 200) {
            context.commit('POPUPS_STATE', {
              name: 'login',
              show: false
            })
            context.commit('USER_LOGIN', {
              'token': response.data.token,
              'status': true,
              'user': response.data.client
            })
            axios.defaults.headers.common['Token'] = response.data.token

            localStorage.setItem('user-token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.client))

            if (context.state.spinCounter > 0 && context.state.spinsDemo) {
              context.commit('ANIMATE_SLOT', true)
              context.dispatch('ROLL_SPIN', {
                type: 'registered'
              })
            }

            Vue.notify({
              group: 'auth',
              type: 'success',
              text: `Welcome back, ${response.data.client.first_name} ${response.data.client.last_name}!`
            })
          }
        })
        .catch(e => {
          Vue.notify({
            group: 'auth',
            type: 'error',
            text: e.response.data.message
          })
          context.commit('PRELOADER', false)
          localStorage.removeItem('user-token', token)
        })
    },
    USER_REGISTER(context, data) {
      context.commit('PRELOADER', true)
      let url = `${BASE_URL}/sign_up`

      axios.post(url, data)
        .then(response => {
          context.commit('PRELOADER', false)
          if (response.status === 201 || response.status === 200) {
            context.commit('POPUPS_STATE', {
              name: 'register',
              show: false
            })
            context.commit('POPUPS_STATE', {
              name: 'terms',
              show: true
            })
            context.commit('USER_LOGIN', {
              'token': response.data.token,
              'status': true,
              'user': response.data.client
            })

            axios.defaults.headers.common['Token'] = response.data.token

            localStorage.setItem('user-token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.client))

            if (context.state.spinCounter > 0 && context.state.spinsDemo) {
              context.commit('ANIMATE_SLOT', true)
              context.dispatch('ROLL_SPIN', {
                type: 'registered'
              })
            }

            Vue.notify({
              group: 'auth',
              type: 'success',
              text: `Welcome ${response.data.client.first_name} ${response.data.client.last_name}!`
            })
          }
        })

        .catch(e => {
          e.response.data.errors.forEach(item => {
            let name = Object.keys(item)
            let desc = item[name]
            Vue.notify({
              group: 'auth',
              title: name[0],
              type: 'error',
              text: desc
            })
          })

          context.commit('PRELOADER', false)
        })
    },
    USER_ACCEPT_TERMS(context, data) {
      let url = `${BASE_URL}/profile/accept_rules.json`
      context.commit('PRELOADER', true)
      axios.post(url, data)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data))
          context.commit('EDIT_USER', response.data)
          context.commit('POPUPS_STATE', {
            name: 'terms',
            show: false
          })
          context.commit('PRELOADER', false)
        })
        .catch(e => {
          console.log(e)
        })
    },
    FETCH_BANNERS(context, data) {
      let url = `${BASE_URL}/advertisement`

      axios.get(url, data)
        .then(response => {
          context.commit('FETCH_BANNERS', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    FETCH_RULES(context, data) {
      let url = `${BASE_URL}/rules`
      return new Promise((resolve, reject) => {
        axios.get(url, data)
          .then(response => {
            resolve(response)
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    EDIT_USER(context, data) {
      context.commit('PRELOADER', true)
      let url = `${BASE_URL}/profile.json`
      return new Promise((resolve, reject) => {
        axios.patch(url, data)
          .then(response => {
            context.commit('PRELOADER', false)
            localStorage.setItem('user', JSON.stringify(response.data))
            context.commit('EDIT_USER', response.data)
            resolve(response)
          })
          .catch(e => {
            Vue.notify({
              group: 'auth',
              type: 'error',
              text: e.response.data.message
            })
            context.commit('PRELOADER', false)
            reject(e)
          })
      })
    },
    GET_USER_ENTIRES(context, {
      type = '',
      page = 1,
      per = 5
    }) {
      let url = `${BASE_URL}/tickets${type}.json?page=${page}&per=${per}`
      context.commit('PRELOADER', true)
      axios(url, {
          method: 'get'
        })
        .then(response => {
          context.commit('PRELOADER', false)
          context.commit('PAGINATION_META', response.data.meta)
          let sortedData = response.data.tickets.sort(function (a, b) {
            return b.id - a.id
          })
          if (type === '/results') {
            context.commit('USER_ENTIRES_RESULTS', sortedData)
          } else {
            context.commit('USER_ENTIRES', sortedData)
          }
        })
        .catch(e => {
          context.commit('PRELOADER', false)
          console.log(e)
        })
    },
    GET_POLL_QUESTIONS(context, data) {
      // let url = `${BASE_URL}/questions.json`
      let url = `${BASE_URL}/profile/questions.json`
      context.commit('PRELOADER', true)

      axios(url, {
          method: 'get'
        })
        .then(response => {
          context.commit('PRELOADER', false)
          context.commit('FETCH_QUESTIONS', response.data)
        })
        .catch(e => {
          context.commit('PRELOADER', false)
          console.log(e)
        })
    },
    POST_TEXT_POLL_ANSWER(context, data) {
      let url = `${BASE_URL}/questions/${data.id}/answer.json`
      context.commit('PRELOADER', true)
      return new Promise((resolve, reject) => {
        axios(url, {
            method: 'post',
            data: data.answer
          })
          .then(response => {
            context.commit('PRELOADER', false)
            resolve(response)
          })
          .catch(e => {
            console.log(e)
            reject(e)
          })
      })
    },
    ROLL_SPIN(context, data) {
      context.commit('ANIMATE_SLOT', true)

      if (this.state.spinCounter === 0) {
        let url
        if (data.type === 'demo') {
          url = `${BASE_URL}/demo/session.json`
        } else {
          url = `${BASE_URL}/tickets.json`
        }

        axios(url, {
            method: 'post'
          })
          .then(response => {
            if (data.type === 'demo') {
              axios.defaults.headers.common['Demo-Session'] = response.data.token
              let url = `${BASE_URL}/demo/ticket.json`
              axios(url, {
                  method: 'post'
                })
                .then(response => {
                  context.commit('FIRST_SPIN', {
                    id: response.data.id,
                    total: response.data.outcomes_count
                  })
                  spin()
                })
                .catch(e => {
                  console.log(e)
                  context.commit('ANIMATE_SLOT', false)
                  Vue.notify({
                    group: 'auth',
                    type: 'error',
                    text: 'Service unavailable, please try again later'
                  })
                })
            } else {
              context.commit('FIRST_SPIN', {
                id: response.data.id,
                total: response.data.outcomes_count
              })
              context.dispatch('GET_POLL_QUESTIONS')
              spin()
            }
          })
          .catch(e => {
            context.commit('ANIMATE_SLOT', false)
            if (e.response.data.code === 'rules_acceptance_required') {
              context.commit('POPUPS_STATE', {
                name: 'terms',
                show: true
              })
            } else if (e.response.data.code === 'verification_failed') {
              console.log('Verification failed')
              router.push({
                name: 'bot'
              })
            } else {
              Vue.notify({
                group: 'auth',
                type: 'error',
                text: 'Service unavailable, please try again later'
              })
            }
          })
      } else {
        spin()
      }

      function spin() {
        let url

        if (data.type === 'demo') {
          url = `${BASE_URL}/demo/sweep.json`
        } else {
          url = `${BASE_URL}/tickets/${context.state.spinId}/sweep.json`
        }
        axios(url, {
            method: 'post'
          })
          .then(response => {
            if (response.data !== null) {
              context.commit('FETCH_OUTCOME', response.data)
              context.commit('INCREMENT_SPIN')
              context.commit('INCREMENT_TOTAL_SPINS')
              context.commit('USER_OUTCOMES', response.data)

              if (data.type === 'demo') {
                context.commit('DEMO_SPIN', false)
              }

              if (context.state.currentQuestion.length > 0) {

              } else {
                context.commit('ANIMATE_SLOT', false)
              }
            } else {
              console.log('finish')
            }
          })
          .catch(e => {
            context.commit('ANIMATE_SLOT', false)
            if (e.response.data.code === 'rules_acceptance_required') {
              context.commit('POPUPS_STATE', {
                name: 'terms',
                show: true
              })
            } else if (e.response.data.code === 'verification_failed') {
              console.log('Verification failed')
              router.push({
                name: 'bot'
              })
            } else {
              Vue.notify({
                group: 'auth',
                type: 'error',
                text: 'Service unavailable, please try again later'
              })
            }
          })
      }
    },
    CHECK_PERIOD(context, data) {
      let url = `${BASE_URL}/check_period`

      axios(url, {
          method: 'get'
        })
        .then(response => {
          if (response.data.current) {
            context.commit('PERIOD', true)
            context.commit('SLOTS_DESC', response.data.current.name)
          }
          if (response.data.next) {
            context.commit('PERIOD', false)
            context.commit('ANNOUNCE', response.data.next.announcement)
            context.commit('SLOTS_DESC', response.data.next.name)
          }
          if (response.data.is_rules_accepted_by_client && !response.data.is_rules_accepted_by_client) {
            context.commit('POPUPS_STATE', {
              name: 'terms',
              show: true
            })
          }
          context.commit('RESULTS_WINS', response.data.has_winning_tickets_in_results)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})