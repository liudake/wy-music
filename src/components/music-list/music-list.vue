<template>
	<div class="music-list">
		<div class="back">
			<i class="icon-back" @click="back()"></i>
		</div>
		<h1 class="title">{{title}}</h1>
		<div class="bg-image" :style="bgStyle" ref="bgStyle">
			<div class="play-wrapper">
				<div class="play" v-show="songs.length > 0" ref="playBtn" @click="random">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<scroll @scroll="scroll" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" class="list" ref="list">
			<div class="song-list-wrapper">
				<song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
			</div>
			<div class="loading-container" v-show="!songs.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script>
	import Scroll from '@/base/scroll/scroll'
	import SongList from '@/base/song-list/song-list'
	import loading from '@/base/loading/loading'
	import {prefixStyle} from '@/common/js/dom'
  import {playlistMixin} from '@/common/js/mixin'
	import {mapActions} from 'vuex'

	const RESERVED_HEIGHT = 40
	const transform = prefixStyle('transform')
	const backdrop = prefixStyle('backdrop-filter')

	export default {
    mixins: [playlistMixin],
		props: {
			title: {
				type: String,
				default: ''
			},
			baImage: {
				type:String,
				default: ''
			},
			songs: {
				type: Array,
				default: []
			},
			rank: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollY: 0
			}
		},
		computed: {
			bgStyle (){
				return `background-image:url(${this.baImage})`
			}
		},
		created() {
			//	添加到created里面 是因为并不需观察chouth数据的变换和DOM变换
			this.probeType = 3
			this.listenScroll = true
		},
		mounted() {
			this.imageHeight = this.$refs.bgStyle.clientHeight
			this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
			this.$refs.list.$el.style.top = `${this.$refs.bgStyle.clientHeight}px`
		},
		methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '40px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
			scroll(pos) {
				this.scrollY = pos.y
			},
			back() {
				this.$router.back()
			},
			random() {
				this.randomPlay({
					list: this.songs
				})
			},
			selectItem(item, index) {
				this.selectPlay({
					list: this.songs,
					index
				})
			},
			...mapActions([
				'selectPlay',
				'randomPlay'
			])
		},
		watch: {
			scrollY(newY) {
				let maxTranlateY = Math.max(this.minTranslateY, newY)
				let zIndex = 0
				let blur = 0
				let scale = 1
				this.$refs.layer.style[transform] = `translate3d(0,${maxTranlateY}px,0)`
				const parcent = Math.abs(newY / this.imageHeight)
				if (newY > 0) {
					scale = 1 + parcent
					zIndex = 10
				} else {
					blur = Math.min(20 * parcent, 20)
				}
				this.$refs.filter.style[backdrop] = `blur(${blur}px)`
				if (newY < this.minTranslateY) {
					zIndex = 10
					this.$refs.bgStyle.style.paddingTop = 0
					this.$refs.bgStyle.style.height = RESERVED_HEIGHT+"px"
					this.$refs.playBtn.style.display = "none"
				} else {
					this.$refs.bgStyle.style.paddingTop = ""
					this.$refs.bgStyle.style.height = ""
					this.$refs.playBtn.style.display = ""
				}
				this.$refs.bgStyle.style.zIndex = zIndex
				this.$refs.bgStyle.style[transform] = `scale(${scale})`
			}
		},
		components: {
			Scroll,
			SongList,
			loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-text-f
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text-f
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 10px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-text-f
          color: $color-text-f
          border-radius: 90px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 0px 20px 15px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
