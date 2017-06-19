<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
						@touchstart="progressTouchStart"
						@touchmove="progressTouchMove"
						@touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
	import {prefixStyle} from '@/common/js/dom'
	const transform = prefixStyle('transform')
 const progressBtnWidth = 16
 export default {
 	props: {
 		percent:{
 			typeof: Number,
 			default: 0
 		}
 	},
 	//	在不同的回调函数 共享不同的数据
 	created() {
 		this.touch = {}
 	},
 	methods: {
 		progressTouchStart(e) {
			this.touch.initiated = true
			this.touch.startX = e.touches[0].pageX
			this.touch.left = this.$refs.progress.clientWidth
 		},
 		progressTouchMove(e) {
			if (!this.touch.initiated) {
				return
			}
			const deltaX = e.touches[0].pageX - this.touch.startX
			const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0,deltaX + this.touch.left))
			this._offset(offsetWidth)
 		},
 		progressTouchEnd() {
			this.touch.initiated = false
			this._triggerPercent()
 		},
 		progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
 			this._offset(offsetWidth)
 			this._triggerPercent()
 		},
 		_triggerPercent() {
 			const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
 			const parcent = this.$refs.progress.clientWidth / barWidth
 			this.$emit('percentChange', parcent)
 		},
 		_offset(offsetWidth) {
 			this.$refs.progress.style.width = `${offsetWidth}px`
 			this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
 		}
 	},
 	watch: {
 		percent(num) {
 			if (num >= 0 && !this.touch.initiated) {
 				const width = this.$refs.progressBar.clientWidth - progressBtnWidth
 				const offsetWidth = num * width
 				this._offset(offsetWidth)
 			}
 		}
 	}
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 3px
      background: rgba(255, 255, 255, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 5px solid $color-text-f
          border-radius: 50%
          background: $color-theme
</style>