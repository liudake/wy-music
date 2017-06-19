<template>
  <div class="search">
  	<div class="search-box-wrapper">
  		<search-box ref="searchBox" @query="onchangque"></search-box>
  	</div>
  	<div ref="shortcutQue" class="shortcut-wrapper" v-show="!query">
  		<scroll class="shortcut" ref="shortcut" :data="shortcut">
	  		<div>
	  			<div class="hot-key">
	  				<h1 class="title">热门搜索</h1>
	  				<ul>
	  					<li @click="addQuery(item.k)" class="item" v-for="item in getHotKey">
	  						<span>{{item.k}}</span>
	  					</li>
	  				</ul>
	  			</div>
					<div class="search-history" v-show="searchHistory.length">
			      <h1 class="title">
			        <span class="text">搜索历史</span>
			        <span class="clear" @click="deleteALL">
			          <i class="icon-clear"></i>
			        </span>
			      </h1>
			      <search-list @selectSear="addQuery" @deleteOne="deleteSearchHistory" :searches="searchHistory"></search-list>
			    </div>
	  		</div>
  		</scroll>
  	</div>
  	<div ref="shortcutResQue" class="search-result" v-show="query">
  		<suggest @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
  	</div>
  	<confirm ref="confirm" text='是否清空所有搜索历史' confirmBtnText='清空' @confirm="removeSearchHistory"></confirm>
  	<router-view></router-view>
  </div>
</template>

<script>
	import SearchBox from '@/base/search-box/search-box'
	import Confirm from '@/base/confirm/confirm'
	import Scroll from '@/base/scroll/scroll'
	import Suggest from '@/components/suggest/suggest'
	import SearchList from '@/base/search-list/search-list'
	import {getSearchList,ERR_OK} from '@/api/recommend'
	import {mapGetters,mapActions} from 'vuex'
  import {playlistMixin} from '@/common/js/mixin'
  export default {
  	mixins:[playlistMixin],
  	data() {
  		return {
  			getHotKey: [],
  			query: ''
  		}
  	},
  	created() {
  		this._getSearchList()
  	},
  	computed: {
  		shortcut() {
  			return this.getHotKey.concat(this.searchHistory)
  		},
  		...mapGetters([
  			'searchHistory'
  		])
  	},
  	methods: {
  		handlePlaylist(playlist) {
  		  const bottom = playlist.length > 0 ? '60px' : ''
  		  this.$refs.shortcutQue.style.bottom = bottom
  		  this.$refs.shortcutResQue.style.bottom = bottom
  		  this.$refs.shortcut.refresh()
  		},
  		deleteALL() {
  			this.$refs.confirm.cancel()
  		},
  		addQuery(item) {
  			this.$refs.searchBox.setQuery(item)
  		},
  		onchangque(query) {
  			this.query = query
  		},
  		blurInput() {
  			this.$refs.searchBox.blur()
  		},
  		saveSearch() {
  			this.saveSearchHistory(this.query)
  		},
  		_getSearchList() {
  			getSearchList().then((res) => {
  				if (res.code === ERR_OK) {
  					this.getHotKey = res.data.hotkey.slice(0,10)
  				}
  			})
  		},
  		...mapActions([
  			'saveSearchHistory',
  			'deleteSearchHistory',
  			'removeSearchHistory'
  		])
  	},
  	components: {
  		SearchBox,
  		Suggest,
  		SearchList,
  		Confirm,
  		Scroll
  	},
  	watch: {
  		query(newQuery) {
  			if (!newQuery) {
  				setTimeout(() => {
  					this.$refs.shortcut.refresh()
  				}, 20)
  			}
  		}
  	}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search
    .search-box-wrapper
      background: #f4f4f4
      padding: 10px
    .shortcut-wrapper
      position: fixed
      top: 162px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-background-dd
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-background-dd
    .search-result
      position: fixed
      width: 100%
      top: 145px
      bottom: 0
</style>