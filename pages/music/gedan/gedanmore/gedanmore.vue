<template>
	<view class="bg">
		<view class="title">
			<view class="img">
				<image :src="coverImgUrl" mode=""></image>
			</view>
			<view class="text">
				{{gedanname}}
			</view>
		</view>
		<view class="content">
			{{gedanjieshao}}
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters(['coverImgUrl','gedanname','gedanjieshao'])
		}
	}
</script>

<style lang="stylus">
	page
		min-height 100%
		background-color #8F8F94
		.title
			.img
				margin 0 auto
				image
					display block
					width 400rpx
					height 400rpx
					border-radius 20rpx
					margin 30rpx auto
			.text
				color #F8F8F8
				text-align center
		.content
			color #F8F8F8
			font-size 24rpx
			padding 48rpx
			text-indent 48rpx
			line-height 36rpx
</style>
