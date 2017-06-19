<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="title" :ba-image="bgImage"></music-list>
  </transition>
</template>

<script>
	import MusicList from '@/components/music-list/music-list'
	import {getMusicList,ERR_OK} from '@/api/recommend'
	import {createSong} from '@/common/js/song'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				songs: [],
				rank: true
			}
		},
		computed: {
			title() {
				return this.toplist.topTitle
			},
			bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
			...mapGetters([
				'toplist'
			])
		},
		created() {
      this._getMusicList()
    },
		methods: {
			_getMusicList() {
				if (!this.toplist.id) {
					this.$router.push('/rank')
				}
				getMusicList(this.toplist.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.songlist)
					}ßß
				})
			},
			_normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
