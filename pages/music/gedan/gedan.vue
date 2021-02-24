<template>
	<view>
		<view class="box">
			<view class="top">
				<view class="left" @click="gotogedanmore()">
					<image :src="coverImgUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="top" @click="gotogedanmore()">
						{{gedanname?gedanname:kbgn}}
					</view>
					<view class="center">
						<img :src="creatorimg?creatorimg:kbci" alt="">
						<p>{{creatorname?creatorname:kbcn}}</p>				
					</view>
					<view class="botton" @click="gotogedanmore()">
						{{gedanjieshao?gedanjieshao:kbgj}}
					</view>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in musicmoremsg" :key="index">
			<view class="singlebox" @click="musicplay(item.id,item.al.picUrl,item.name,item.ar[0].name)">
				<view class="left">
					{{index+1}}
				</view>
				<view class="center">
					<view class="top">{{item.name}}</view>
					<view class="buttom">{{item.ar[0].name}}-{{item.al.name}}</view>
				</view>
				<view class="right">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				kbga:'歌单名字',
				kbci:'',
				kbcn:'作者名字',
				kbgj:'歌曲介绍'
			};
		},
		onLoad() {
			this.$store.dispatch('getfindgedan').then(()=>{
				this.$store.dispatch('getgequmoremsg')
			})
			// this.$store.dispatch('getgequmoremsg')
		},
		onReady() {
			// this.$nextTick(function(){
			// 	setTimeout(()=>{
			// 		this.$store.dispatch('getgequmoremsg')
			// 	},100)
			// })
		},
		methods:{
			gotogedanmore(){
				uni.navigateTo({
					url:"./gedanmore/gedanmore"
				})
			},
			musicplay(id,img,name,ar){
				this.$store.state.music.id = id;
				this.$store.state.music.img = img;
				this.$store.state.music.name = name;
				this.$store.state.music.ar = ar;
				this.$store.dispatch('addplaylist',{id:id,img:img,name:name,ar:ar})
				setTimeout(()=>{uni.navigateTo({
					url:"../../../components/musicswith/musicui/musicui"
				})},200)
				
				// this.$store.dispatch('getmusicurl',id)
				// console.log('yes',id)
			}
		},
		computed:{
			...mapState(['gedancontent','musicmoremsg','musicids']),
			...mapGetters(['coverImgUrl','gedanname','gedanjieshao','creatorname','creatorimg'])
		}
	}
</script>

<style lang="stylus" scoped>
	.box
		width 100%
		height 300rpx
		color #F8F8F8
		.top
			width 100%
			height 100%
			position relative
			background-color #666
			display inline-block
			white-space nowrap
			overflow hidden
			.left
				width 40%
				height 80%
				position relative
				left 0
				top 0
				image
					width 230rpx
					height 230rpx
					position relative
					left 10%
					top 10%
					border-radius 10px
			.right
				width 60%
				height 80%
				position absolute
				right 0
				top 0
				overflow hidden
				color #F8F8F8
				.top
					position relative
					top 26rpx
					font-size 26rpx
					height 26rpx
					line-height 26rpx
				.center
					position relative
					top 40rpx					
					img
						position relative
						top 9rpx
						width 36rpx
						height 36rpx
						border-radius 100%
					p
						position relative
						padding-left 18rpx
						height 36rpx
						display inline-block
						font-size 22rpx
				.botton
					position relative
					top 120rpx
					font-size 22rpx
					width 70%
					overflow hidden
					text-overflow ellipsis
		&:after
			position absolute
			left 0
			right 0
			top 290rpx
			content ''
			height 10px
			width 100%
			border-radius 50%
			background-color #666
	.singlebox
		display flex
		flex-wrap nowrap
		height 100rpx
		justify-content center
		align-items center
		.left
			order 0
			flex 1
			text-align center
			color #999999
		.center
			order 1
			flex 4
			min-width 0
			.top
				height 40rpx
				padding-top 20rpx
				font-size 30rpx
				overflow hidden
				text-overflow ellipsis
				white-space nowrap	
			.buttom
				height 25rpx
				padding-bottom 15rpx
				font-size 20rpx
				overflow hidden
				text-overflow ellipsis
				white-space nowrap	
				color #8F8F94
		.right
			order 2
			flex 1
</style>
