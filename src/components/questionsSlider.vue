<template>
  <div class="slider">
    <div class="slider__wrapper">
      <!-- <div class="slider__arrow prev" :class="{blocked: blocked}" v-if="currenSlide > 0" @click="prevSlide()"></div> -->
      <div class="slider__list">
        <div class="slider__slide"
          ref="slide"
          v-for="(question, i) in question"
          :key="i"
        >
          <div class="slider__question">
            {{question.text}}
          </div>
          <div class="slider__answer">
            <div class="slider__text-answer" v-if="question.answer_type === 'text'">
              <customInput
                :placeholder="'answer'"
                v-model="answer"
                name="answer"
              />
            </div>
            <div class="slider__text-answer" v-if="question.answer_type === 'radio'">
              <div class="slider__buttons">
                <customButton
                  v-for="(answer, i) in question.answers"
                  :key="i"
                  class="slider__button"
                  :text="answer.text"
                  :disabled="answer.length === 0"
                  @click.native="sendTextAnswer(question.id, answer.text)"
                />
              </div>
            </div>
            <div class="slider__text-answer" v-if="question.answer_type === 'checkbox'">
              <div class="slider__radio"
                v-for="(checkbox, i) in question.answers"
                :key="i"
              >
                <input type="checkbox" v-model="answer" id="checkbox" name="answer" :value="checkbox.text" :true-value="checkbox.text">
                <label for="">{{checkbox.text}}</label>
              </div>
            </div>
          </div>
          <!-- <div class="slider__desc">
            Description
          </div> -->
        </div>
      </div>
      <!-- <div class="slider__progress">
        <div class="slider__progress-line" v-bind:style="{width: progress}">

        </div>
      </div> -->
      <!-- <div class="slider__arrow next" :class="{blocked: blocked}" @click="nextSlide()"></div> -->
      <adBanner/>
    </div>
  </div>
</template>

<script>
import customButton from '@/components/ui/customButton.vue'
import customInput from '@/components/ui/customInput.vue'
import adBanner from '@/components/adBanner.vue'
export default {
  name: 'Slider',
  components: {
    customButton,
    customInput,
    adBanner
  },
  data () {
    return {
      slides: {},
      totalSlides: 0,
      currenSlide: 0,
      blocked: false,
      answer: []
    }
  },
  computed: {
    questions: function () {
      return this.$store.state.questionsList
    },
    question: function () {
      return this.$store.getters.currentQuestion
    },
    progress: function () {
      let persent = (this.currenSlide / this.totalSlides) * 100
      return persent + '%'
    }
  },
  mounted: function () {
    this.$store.watch(state => state.currentQuestion, (newValue, oldValue) => {
      if (newValue.length > 0) {
        this.buildSlider()
      }
    })
  },
  methods: {
    getSliderContent: function () {

    },
    buildSlider: function () {
      this.slides = this.$refs.slide
      this.totalSlides = this.slides.length - 1
      this.slides[this.currenSlide].classList.add('active-slide')
      if (this.totalSlides > 1) {
        this.slides[this.currenSlide + 1].classList.add('next-slide')
        this.slides[this.totalSlides - 1].classList.add('prev-slide')
      }
    },
    changeSlide: function () {
      // переписать
      this.slides.forEach(slide => {
        slide.classList.remove('active-slide', 'next-slide', 'prev-slide')
      })

      if (this.currenSlide > 0) {
        this.slides[this.currenSlide - 1].classList.add('prev-slide')
      } else {
        this.slides[this.totalSlides - 1].classList.add('prev-slide')
      }

      if (this.currenSlide !== this.totalSlides) {
        this.slides[this.currenSlide + 1].classList.add('next-slide')
      }

      this.slides[this.currenSlide].classList.add('active-slide')
    },
    prevSlide: function () {
      if (this.currenSlide > 0) {
        this.currenSlide -= 1
      } else {
        this.currenSlide = this.totalSlides
      }

      this.changeSlide()
      this.blockButtons()
    },
    nextSlide: function () {
      if (this.currenSlide !== this.totalSlides) {
        this.currenSlide += 1
      } else {
        this.$store.commit('POPUPS_STATE', { name: 'poll', show: false })
        this.$store.commit('ANIMATE_SLOT', false)
      }
      this.changeSlide()
      this.blockButtons()
    },
    blockButtons: function () {
      this.blocked = true
      setTimeout(_ => {
        this.blocked = false
      }, 500)
    },
    sendTextAnswer: function (id, answer = this.answer) {
      let formData = new FormData()

      formData.append('answer[client_answer]', answer)

      this.$store.dispatch('POST_TEXT_POLL_ANSWER', { 'answer': formData, 'id': id }).then((response) => {
        this.answer = []
        this.$store.commit('ANIMATE_SLOT', false)
        this.$store.commit('POPUPS_STATE', { name: 'poll', show: false })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .slider{
    width: 100%;
    &__arrow{
      position: absolute;
      top: 0;
      height: 100%;
      width: 70px;
      // background-color: #000;
      cursor: pointer;
      z-index: 400;
      &:before{
        content: "";
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 18px;
      }
      &:after{
        content: "<";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        font-weight: bold;
      }
      &.blocked{
        pointer-events: none;
      }
      &.prev{
        left: 0px;
        // &:before{
        //   content: "previous";
        // }
      }
      &.next{
        right: 0px;
        // &:before{
        //   content: "next";
        // }
        &:after{
          transform: rotate(180deg);
        }
      }
    }
    &__wrapper{
      min-height: 230px;
      width: 100%;
    }
    &__list{
      position: relative;
      overflow: hidden;
      min-height: 230px;
      width: 100%;
    }
    &__slide{
      min-height: 230px;
      // width: 100%;
      width: 320px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      box-sizing: border-box;
      z-index: 33;
      transition: 1s;
      pointer-events: none;
      opacity: 0;
      &.prev-slide{
        transform: translate(-150%, 0);
      }
      &.active-slide{
        transform: translate(-50%, 0);
        opacity: 1;
        pointer-events: all;
      }
      &.next-slide{
        transform: translate(150%, 0);
      }
    }
    &__question{
      font-size: 24px;
    }
    &__answer{
      margin: 30px auto 0;
      width: 100%;
    }
    &__text-answer{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    &__radio{
      margin: 5px;
    }
    &__buttons{
      margin-top: 15px;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    &__button{
      min-width: 70px;
      margin: 5px 10px;
      padding: 0 15px;
      width: auto;
    }
    &__desc{
      margin-top: 30px;
    }
    &__progress{
      // margin:0 auto 30px;
      width: 100%;
      height: 20px;
      padding: 3px;
      box-sizing: border-box;
      // border: 0.5px solid rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    &__progress-line{
      height: 100%;
      transition: 0.3s;
      background-color: rgba(#33acf7, 0.4);
    }
  }
  @media screen and (max-width: 768px) {
    .slider{
      height: 210px;
      &__wrapper{
        height: 100%;
        width: 100%;
        min-height: inherit;
      }
      &__list{
        height: 100%;
        width: 100%;
        min-height: inherit;
      }
      &__slide{
        padding: 0;
        height: 100%;
        width: 100%;
        min-height: inherit;
      }
      &__buttons{
        margin-top: 25px;
      }
      &__button{
        padding: 0 5px;
      }
    }
  }
</style>
