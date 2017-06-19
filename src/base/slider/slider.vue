<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass,hasClass} from '@/common/js/dom'
  import BScroll from 'better-scroll'
  export default {
      props: {
        //  是否支持切换
        loop:{
          type: Boolean,
          default: true
        },
        //  是否自动轮播
        autoPlay: {
          type: Boolean,
          default: true
        },
        //  轮播间隔时间
        interval: {
          type: Number,
          default: 4000
        }
      },
      data() {
          return {
            dots: [],
            currentPageIndex: 0
          }
      },
      mounted () {
        setTimeout(() => {
          this._setSlideWidth()
          this._initSlider()
          this._initDots()
          if (this.autoPlay) {
            this._play()
          }
        }, 20)
        //  解决屏幕大小变化问题
        window.addEventListener('resize', () => {
          if (!this.slider) {
            return
          }
          setTimeout(() => {
            this.refresh()
          }, 20)
        })
      },
      //  方法
      methods: {
        _setSlideWidth(isResize) {
          this.children = this.$refs.sliderGroup.children
          let width = 0
          let sliderWidth = this.$refs.slider.clientWidth
          for (let i =0; i < this.children.length; i++) {
              let child = this.children[i];
              addClass(child,'slider-item')
              child.style.width = sliderWidth + 'px'
              width += sliderWidth
          }
          if (this.loop && !isResize) {
            width += 2 * sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
          this.slider = new BScroll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapLoop: this.loop,
            snapThreshold: 0.3,
            snapSpeed: 400
          })
          this.slider.on('scrollEnd', () => {
            let pageIndex = this.slider.getCurrentPage().pageX
            if (this.loop) {
                pageIndex -= 1;
            }
            this.currentPageIndex = pageIndex;
            if (this.autoPlay) {
              clearTimeout(this.timer)
              this._play()
            }
          })
        },
        _initDots() {
          this.dots = new Array(this.children.length - 2)
        },
        _play() {
          let pageIndex = this.currentPageIndex + 1
          if (this.loop) {
              pageIndex +=1
          }
          this.timer = setTimeout(() => {
            this.slider.goToPage(pageIndex, 0, 400)
          },this.interval)
        },
        refresh() {
          this._setSlideWidth(true)
          //  宽度改变重新计算
          this.slider.refresh()
        }
      },
      //  清楚定时器 有利于内存释放
      destroyed() {
        clearTimeout(this.timer)
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-ll
        &.active
          width: 20px
          border-radius: 5px
          background: $color-background-red
</style>
