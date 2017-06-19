<template>
	<scroll class="listview"
					ref="listview"
					:data="data"
					:listen-scroll="listenScroll"
					:probe-type="probeType"
					@scroll="scrollS"
					>
		<ul style="margin-right:18px">
			<li class="list-group" v-for="group in data" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li @click="selectItem(item)" class="list-group-item" v-for="item in group.items">
						<img class="avatar" v-lazy="item.avatar" alt="">
						<span class="name">{{item.name}}</span>
						<i class="icon"></i>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li class="item" :class="{'current':currentIndex===index}" v-for="(item,index) in shortcutList" :data-index="index">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="list-fixed" v-show="fixedTitle" ref="fixed">
			<h1 class="fixed-title">{{fixedTitle}}</h1>
		</div>
		<div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
	</scroll>
</template>

<script>
	import Scroll from "@/base/scroll/scroll"
	import Loading from "@/base/loading/loading"
	import {getData} from "@/common/js/dom"

	const Title_Height = 30
	export default {
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				scrollY: -1,
				currentIndex: 0,
				diff: -1
			}
		},
		computed: {
			shortcutList() {
				return this.data.map((group) => {
					return group.title.substr(0,1)
				})
			},
			fixedTitle() {
				if (this.scrollY > 0) {
					return ''
				}
				return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
			}
		},
		created() {
			//	添加到created里面 是因为并不需观察chouth数据的变换和DOM变换
			this.chouth = {}
			this.listenScroll = true
			this.lishHeight = []
			this.probeType = 3
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			},
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target, 'index')
				let firstTouch = e.touches[0]
				this.chouth.y1 = firstTouch.pageY
				this.chouth.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex)
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.chouth.y2 = firstTouch.pageY
				let dalta = (this.chouth.y2 - this.chouth.y1) / 18 | 0
				let anchorIndex = parseInt(this.chouth.anchorIndex) + dalta
				this._scrollTo(anchorIndex)
			},
      refresh() {
        this.$refs.listview.refresh()
      },
			scrollS(pos) {
				this.scrollY = pos.y
			},
			_scrollTo(index) {
				if (!index && index !== 0) return
				if (index < 0) {
          index = 0
        } else if (index > this.lishHeight.length - 2) {
          index = this.lishHeight.length - 2
        }
				this.scrollY = -this.lishHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
			},
			//	计算显示出每个列表的高度
			_calulateHeight() {
				this.lishHeight = []
				let list = this.$refs.listGroup
				//	第一个高度都是0
				let height = 0
				this.lishHeight.push(height)
				for (let i = 0; i < list.length; i++) {
					let item = list[i]
					//	clientHeight dom获取元素的高度
					height += item.clientHeight
					this.lishHeight.push(height)
				}
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this._calulateHeight()
				}, 20)
			},
			scrollY(newY) {
				const lishHeight = this.lishHeight
				// 在顶部滚动
				if (newY > 0) {
					this.currentIndex = 0
					return
				}
				// 在中间部分滚动
				for (let i = 0; i < lishHeight.length - 1; i++) {
					let height1 = lishHeight[i]
					let height2 = lishHeight[i + 1]
					if (-newY >= height1 && -newY < height2) {
						this.currentIndex = i
						this.diff = height2 + newY
						return
					}
				}
				// 在低部滚动
				this.currentIndex = lishHeight.length - 2
			},
			diff(newVal) {
				let fixedTop = (newVal > 0 && newVal < Title_Height) ? newVal - Title_Height : 0
				if (this.fixedTop === fixedTop) {
					return
				}
				this.fixedTop = fixedTop
				this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
			}
		},
		components:{
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 15px
        font-size: $font-size-small
        color: $color-text
        background: $color-highlight-background
      .list-group-item
        position: relative
        display: flex
        align-items: center
        padding: 6px 0 6px 20px
        border-bottom:1px solid $color-highlight-background
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text
          font-size: $font-size-medium
        .icon
        	position: absolute;
    	    right: 10px;
    	    top: 50%;
    	    margin-top: -4px;
    	    width: 10px;
    	    height: 10px;
    	    border-right: 1px solid #666;
    	    border-bottom: 1px solid #666;
    	    -webkit-transform: rotate(-45deg);
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 18px
      padding: 10px 0
      text-align: center
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: #5858d8
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 15px
        font-size: $font-size-small
        color: $color-text
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
