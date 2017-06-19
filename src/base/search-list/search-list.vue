<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li @click="selectItem(item)" class="search-item" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
	export default {
		props: {
			searches: {
				type: Array,
				default: []
			}
		},
		methods: {
			selectItem(item) {
				this.$emit('selectSear', item)
			},
			deleteOne(item) {
				this.$emit('deleteOne', item)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-background-dd
</style>