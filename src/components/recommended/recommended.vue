<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommended.length">
          <slider ref="slider">
            <div v-for="item in recommended">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImg" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <recomlist @selects="selects" :recomlist="discListRe" :title="recomTitle.recom"></recomlist>
        <recomlist @selects="selects" :recomlist="discListLa" :title="recomTitle.latest"></recomlist>
        <recomlist @selects="selects" :recomlist="discListRa" :title="recomTitle.radio"></recomlist>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Slider from '@/base/slider/slider.vue'
  import Scroll from '@/base/scroll/scroll.vue'
  import Loading from '@/base/loading/loading.vue'
  import Recomlist from '@/components/recomlist/recomlist'
  import {playlistMixin} from '@/common/js/mixin'
  import {mapMutations} from 'vuex'
  import {getRecommend,getDiscList,ERR_OK} from '@/api/recommend'


  export default {
    mixins:[playlistMixin],
    data() {
      return {
        recommended:[],
        discList:[],
        discListRe:[],
        discListLa:[],
        discListRa:[],
        recomTitle: {
          recom: '推荐歌单',
          latest: '最新歌单',
          radio: '主播电台'
        }
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    activated() {
      setTimeout(() => {
        this.$refs.slider && this.$refs.slider.refresh()
      }, 20)
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selects(item) {
        this.$router.push({
          path: `/recommended/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommended = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            this.discListRe = this.discList.splice(0,6)
            this.discListLa = this.discList.splice(6,6)
            this.discListRa = this.discList.splice(12,6)
          }
        })
      },
      loadImg() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components:{
      Slider,
      Recomlist,
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 81px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: left
          font-size: $font-size-medium-x
          color: $color-text
          border-left:2px solid $color-theme
          padding : 0 10px
        .list-right
          font-size : $font-size-large-x
          color: #666
        .item
          display: inline-block
          width :33.3%
          box-sizing: border-box
          .list-box
            position relative
            margin-right: 5px
            margin-bottom :15px
            .list-media
              position: relative
              display: block
              overflow: hidden
              padding-top: 100%
              margin-bottom: 8px
              img
                position: absolute
                top: 0
                left: 0
                width: 100%
            .desc
              overflow :hidden
              padding : 0 4px
              margin-bottom :4px
              .desc-text
                float: left
                max-width: 100%
                font-weight: 400
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
            .list-listen
              padding : 0 4px
              .text
                font-size :12px
                color:#666
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
