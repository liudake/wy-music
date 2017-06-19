<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props:{
      //  类型
      probeType: {
        type: Number,
        default: 1
      },
      //  单击事件
      click: {
        type: Boolean,
        default: true
      },
      //  数据
      data: {
        type: Array,
        default: null
      },
      //  监听
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 下拉加载监听 
      pullup: {
        type: Boolean,
        default: false
      },
      //  处理移动端调用输入框事件
      beforeScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods:{
      //  初始化BScroll
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', (pos) => {
            _this.$emit('scroll', pos)
          })
        }
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('OnbeforeScroll')
          })
        }
      },
      //  代理一些BScroll方法
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      //  重新渲染dom 计算高度方法
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    //  监听数据变化 重新计算高度
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
