<template>
  <div class="recommend-list">
    <span class="list-title">{{title}}</span>
    <span class="list-right">></span>
    <ul class="item-ul">
      <li @click="selectItem(item)" class="item" v-for="item in recomlist">
        <div class="list-box">
          <div class="list-media">
            <img v-lazy="item.imgurl" alt="">
          </div>
          <h4 class="desc">
            <span class="desc-text" v-html="item.dissname"></span>
          </h4>
          <div class="list-listen">
            <span class='text'>播放量：{{item.listennum | listenFormat}}万</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      recomlist: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('selects', item)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

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
    .item-ul
      padding-left: 5px
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
</style>
