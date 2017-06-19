<template>
  <scroll class="suggest" 
  				:data="result"
  				:pullup="pullup"
          :beforeScroll="beforeScroll"
  				@scrollToEnd="searchMore"
          @OnbeforeScroll="listScroll"
  				ref="suggest"
  >
    <ul class="suggest-list">
    	<li @click="selectItem(item)" class="suggest-item" v-for="item in result">
    		<div class="icon">
    			<i :class="getIconCls(item)"></i>
    		</div>
    		<div class="name">
    			<p class="text" v-html="getDisplayName(item)"></p>
    		</div>
    	</li>
    	<loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result :title="resultTitle"></no-result>
    </div>
  </scroll>
</template>

<script>
	import {search,ERR_OK} from '@/api/recommend'
	import {createSong} from '@/common/js/song'
	import Singer from '@/common/js/singer'
  import Scroll from '@/base/scroll/scroll'
	import NoResult from '@/base/no-result/no-result'
	import Loading from '@/base/loading/loading'
	import {mapMutations,mapActions} from 'vuex'

	const TYPE_SINGER = 'singer'
	const perpage = 20

  export default {
  	props: {
  		showSinger: {
  			type: Boolean,
  			default: true
  		},
  		query: {
  			type: String,
  			default: ''
  		}
  	},
  	data() {
  		return {
  			page: 1,
  			result: [],
  			//	是否触发下拉加载
  			pullup: true,
  			//	下拉加载更多
  			hasMore: false,
        //  是否触发移动端输入框
        beforeScroll: true
  		}
  	},
    computed: {
      resultTitle() {
        return `很抱歉，没有找到与“${this.query}”相关的结果。`
      }
    },
  	methods: {
  		getIconCls(item) {
  			if (item.type === TYPE_SINGER) {
  				return 'icon-mine'
  			} else {
  				return 'icon-music'
  			}
  		},
  		getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      listScroll() {
        this.$emit('listScroll')
      },
  		_search(){
  			this.hasMore = true
  			this.page = 1
  			this.$refs.suggest.scrollTo(0, 0)
  			search(this.query,this.page,this.showSinger,perpage).then((res) => {
  				if (res.code === ERR_OK) {
  					this.result = this._genResult(res.data)
  					this._checkMore(res.data)
  				}
  			})
  		},
  		searchMore() {
  			if (!this.hasMore) {
  				return
  			}
  			this.page++
				search(this.query,this.page,this.showSinger,perpage).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this.result.concat(this._genResult(res.data))
						this._checkMore(res.data)
					}
				})
  		},
  		selectItem(item) {
  			if (item.type === TYPE_SINGER) {
  				const singer = new Singer({
  					id:item.singermid,
  					name:item.singername
  				})
  				this.$router.push({
  					path:`/search/${singer.id}`
  				})
  				this.setSinger(singer)
  			} else {
  				this.insertSong(item) 				
  			}
        this.$emit('select')
  		},
  		_genResult(data) {
  			let ret = []
  			if (data.zhida && data.zhida.singerid) {
  				ret.push({...data.zhida,...{type:TYPE_SINGER}})
  			}
  			if (data.song) {
  				ret = ret.concat(this._noramlizeSongs(data.song.list))
  			}
  			return ret
  		},
  		_noramlizeSongs(list) {
  			let ret = []
  			list.forEach((item) => {
  				if (item.songid && item.albumid) {
  					ret.push(createSong(item))
  				}
  			})
  			return ret
  		},
  		_checkMore(data){
  			const song = data.song
  			if (!song.list.length || (song.curnum + song.curpage * perpage >= song.totalnum)) {
  				this.hasMore = false
  			}
  		},
  		...mapMutations({
  		  setSinger: 'SET_SINGER'
  		}),
  		...mapActions([
  		   'insertSong'
  		])
  	},
  	 watch: {
      query() {
        this._search()
      }
    },
    components: {
    	Scroll,
    	Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      .suggest-item
        display: flex
        align-items: center
        height:50px
        padding: 0 20px
        border-bottom:0.5px solid rgba(200,200,200,0.4)
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: #7c7c7c
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 47%
      transform: translateY(-47%)
</style>
