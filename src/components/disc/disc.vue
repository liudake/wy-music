<template>
  <transition name="slide">
    <music-list :title="title" :baImage="baImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from '@/components/music-list/music-list'
  import {getSongList,ERR_OK} from '@/api/recommend'
  import {createSong} from '@/common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        songs:[]
      }
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      baImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created(){
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommended')
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push(createSong(item))
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

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, slide-leave-to
    transform: translate3d(100%,0,0)
</style>
