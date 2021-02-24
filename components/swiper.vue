<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper around">
				<view class="page-section-spacing">
					<swiper class="swiper swiperwidth" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,index) in dujialist" :key='index'>
							<image :src="item.pic" @click="gotoNew(item.url)"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		props:{
			dujialist:Array,
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			gotoNew(item){
				uni.navigateTo({
					url:item
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.around
		margin 20rpx 0
		.swiperwidth
			width 90%
			left 0
			top 0
			margin auto
			image
				display inline-block
				width 100%
				height 100%
				border-radius 20px
</style>
