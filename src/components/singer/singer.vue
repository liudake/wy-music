<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="singerlist"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList,ERR_OK} from '@/api/recommend'
  import Singer from '@/common/js/singer'
  import {playlistMixin} from '@/common/js/mixin'
  import ListView from '@/base/listview/listview'
  import {mapMutations} from 'vuex'

  const hot_name = '热门'
  const hot_singer_len = 10
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.singerlist.refresh()
      },
      selectSinger(item) {
        this.$router.push({
          path: `/singer/${item.id}`
        })
        this.setSinger(item)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: hot_name,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < hot_singer_len) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        //  为了得到有序列表，需要处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === hot_name) {
            hot.push(val)
          }
        }
        //  排序
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 81px
    bottom: 0
    width: 100%
</style>
