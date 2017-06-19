<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :baImage="baImage"></music-list>
  </transition>
</template>

<script>
  import {getSingerDetail, ERR_OK} from '@/api/recommend'
  import {mapGetters} from 'vuex'
  import {createSong} from '@/common/js/song'
  import MusicList from '@/components/music-list/music-list'
  export default {
    data() {
      return {
        songs:[]
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      baImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push({
            path:"/singer"
          })
          return 
        } 
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item,index) => {
          let {musicData} = item
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
  @import "~common/stylus/variable"
  .singer-detall
    position: fixed
    z-index: 300
    top: 0
    right: 0
    left: 0
    bottom: 0
    background: $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-active
    transform: translate3d(100%,0,0)
</style>
