<template>
	<div class="song-list">
		<ul>
			<li class="item" v-for="(item, index) in songs" @click="selectItem(item,index)">
        <div class="rank">
				  <span class="index" :class="getRankCls(index)">{{getRankIdx(index)}}</span>
        </div>
				<div class="content">
					<h2 class="name">{{item.name}}</h2>
					<p class="desc">{{getDesc(item)}}</p>
          <i class="icon-play"></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			songs: {
				type:Array,
				default: []
			},
      rank: {
        type: Boolean,
        default: false
      }
		},
		methods: {
      getRankCls(index) {
        if (this.rank && index <= 2) {
          return `icon icon${index}`
        }
      },
      getRankIdx(index) {
        if(!this.rank || index > 2) {
          return index + 1
        }
      },
			getDesc(item) {
				return `${item.singer}-${item.album}`
			},
      selectItem(item,index) {
        this.$emit('select', item, index)
      }
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 60px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 8px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 25px
          background-size: 25px 25px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .index
        	color: $color-dialog-background
        	text-align: center
      .content
        position: relative
        flex: 1
        line-height: 20px
        overflow: hidden
        border-bottom: 0.5px solid #ddd
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 2px
          margin-bottom: 6px
          color: $color-dialog-background
        .icon-play
          font-size: 20px
          position: absolute
          bottom: 16px
          right: 20px
          color: #6c6c6c
</style>