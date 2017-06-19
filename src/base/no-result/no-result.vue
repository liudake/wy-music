<template>
	<div class="no-result">
		<div class="no-result-icon"></div>
    <h6 class="no-result-title">无匹配</h6>
		<p class="no-result-text">{{title}}</p>
	</div>
</template>

<script>
	export default {
		props: {
      title: {
        type: String,
        default: ''
      }
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .no-result
    text-align: center
    .no-result-icon
      width: 96px
      height: 96px
      margin: 0 auto
      bg-image('no-result')
      background-size: 96px 96px
    .no-result-title
      font-size: 18px
      line-height: 36px
      font-weight: normal
    .no-result-text
      font-size: $font-size-medium
      color: #808080
</style>