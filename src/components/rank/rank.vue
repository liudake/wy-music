<template>
  <div class="rank" ref="rank">
    <scroll :data="toplist" class="toplist" ref="toplist">
      <ul>
      	<span class="list-title">云音乐官方榜</span>
        <li @click="selectItem(item)" class="item" v-for="item in toplist">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList">
              <span>{{index + 1}}.</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!toplist.length">
        <loading></loading>
      </div>
    </scroll>
   	<router-view></router-view>
  </div>
</template>

<script>
	import {getTopList,ERR_OK} from '@/api/recommend'
	import Loading from '@/base/loading/loading'
	import Scroll from '@/base/scroll/scroll'
	import {playlistMixin} from 'common/js/mixin'
	import {mapMutations} from 'vuex'
  export default {
  	mixins:[playlistMixin],
  	data() {
  		return {
  			toplist: []
  		}
  	},
  	created() {
  		this._getTopList()
  	},
  	methods: {
  		handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
  		selectItem(item) {
  			this.$router.push({
  				path: `/rank/${item.id}`
  			})
  			this.setTopList(item)
  		},
  		_getTopList() {
  			getTopList().then((res) => {
  				if (res.code === ERR_OK) {
  					this.toplist = res.data.topList
  				}
  			})
  		},
  		...mapMutations({
  			setTopList: 'SET_TOP_LIST'
  		})
  	},
  	components: {
  		Loading,
  		Scroll
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .list-title
	      height: 36px
	      line-height: 36px
	      text-align: left
	      font-size: 16px
	      color: $color-text
	      border-left: 2px solid $color-theme
	      padding: 0 10px
      .item
        display: flex
        padding-top: 2px
        height: 100px
        &:last-child
          padding-bottom: 4px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 10px
          height: 100px
          overflow: hidden
          color: $color-text
          font-size: $font-size-small
          border-bottom:0.5px solid rgba(200, 200, 200, 0.4)
          .song
            no-wrap()
            line-height: 28px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>