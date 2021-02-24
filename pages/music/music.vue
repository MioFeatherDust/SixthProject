<template>
	<view>
		<swiper :dujialist="dujialist"></swiper>
		<view class="scrolly">
			<h3>推荐歌单</h3>
			<scroll-view scroll-x="true" class="scrollall">
				<view v-for="(item,index) in gedanlist" :key='index' class="singlemsg">
					<view @click="gotogedan(item.id)">
						<image :src="item.picUrl" mode=""></image>
						<view>{{item.name}}</view>
					</view>				
				</view>
			</scroll-view>
		</view>
		<view class="scrolly">
			<h3>热门歌单</h3>
			<scroll-view scroll-x="true" class="scrollall">
				<view v-for="(item,index) in gedanhotlist" :key='index' class="singlemsg">
					<view @click="gotogedan(item.id)">
						<image :src="item.coverImgUrl" mode=""></image>
						<view>{{item.name}}</view>
					</view>				
				</view>
			</scroll-view>
		</view>
		<view class="scrolly">
			<h3>最新歌单</h3>
			<scroll-view scroll-x="true" class="scrollall">
				<view v-for="(item,index) in gedannewlist" :key='index' class="singlemsg">
					<view @click="gotogedan(item.id)">
						<image :src="item.coverImgUrl" mode=""></image>
						<view>{{item.name}}</view>
					</view>				
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import swiper from '../../components/swiper.vue'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			swiper
		},
		onLoad() {
			this.$store.dispatch('getdujia');
			this.$store.dispatch('getgedan');
			this.$store.dispatch('gethotgedan');
			this.$store.dispatch('getnewgedan');
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.$store.dispatch('getdujia');
			this.$store.dispatch('getgedan');
			this.$store.dispatch('gethotgedan');
			this.$store.dispatch('getnewgedan');
		},
		methods: {
			gotogedan(id){
				this.$store.state.gedanid = id
				// this.$store.dispatch('getfindgedan')
				this.$store.state.musicmoremsg = []
				uni.navigateTo({
					url:'gedan/gedan'
				})			
			}
		},
		computed:{
			...mapState(['dujialist','gedanlist','gedanhotlist','gedannewlist'])
		}
	}
</script>

<style lang="stylus">
	.scrolly
		padding 0 20rpx
		margin  20rpx 0
		h3
			padding 5rpx
			margin-left 20rpx
		.scrollall
			white-space nowrap
			display inline-block
			.singlemsg
				width 260rpx
				height 320rpx
				display inline-block
				vertical-align middle
				text-align center
				padding 10rpx
				view
					image
						width 230rpx
						height 230rpx
						border-radius 10px
						border #333333 1rpx solid
					view
						font-size 20rpx
						white-space normal
						padding 5rpx
						text-align left
</style>
