<template>
	<view class="body">
		<uni-nav-bar class="title" backgroundColor="rgba(255,255,255,0)" >
		    <view>{{music.name.length&lt;13?music.name:music.name.slice(0,10)+'···'}}</view>
		    <uni-icons type="arrowthinleft" size="24" slot="left" @click="back()"></uni-icons>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="blurContainer" :style="{'background-image':`url(${music.img})`}">
		<!-- <view class="blurContainer"> -->
		</view>
		<view class="top">
			<view class="imgStyle" v-if="show">
				<view class="cd" :style="{'transform':cdrotate}" @click="show=!show">
					<image :src="music.img" mode=""></image>
				</view>
				<view class="tb">
					<view class="iconfont icon-shoucang"></view>
					<view class="iconfont icon-pinglun"></view>
					<view class="iconfont icon-xiazai"></view>
				</view>
			</view>
			<view class="lyricsStyle" v-else @click="show=!show">
				<view class="volume">
					
				</view>
				<view class="lyrics">
					<view v-for="(item,index) in lyricsObjArr" :key='index' 
					:class="index == i ? 'sp' : '' "
					:style="{'transform':itemtranslate}">{{item.lyric}}</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="currentTime">
				{{currentTime}}
			</view>
			<view class="progress"
			@click="clickProgress($event)">
				<view class="line"
				:style="{width:`${precent}`}"></view>
				<view class="dot"
				:style="{left:`${precent}`}"></view>
			</view>
			<view class="durationTime">
				<!-- {{duration}} -->
			</view>
		</view>
		<view class="buttom">
			<view class="buttonlist">
				<view class="iconfont" :class="playstyle" @click="swithplaystyle()"></view>
				<view class="iconfont icon-icon-1" @click="premusic()">	</view>
				<view class="iconfont" :class="musicplay ? 'icon-icon-6' : 'icon-icon-2'" @click="swithplay()"></view>
				<view class="iconfont icon-icon-" @click="nextmusic()"></view>
				<view class="iconfont icon-icon-7"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../uni-nav-bar/uni-nav-bar.vue'
	import {mapState,mapGetters} from 'vuex'
	const audio = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				show:true,
				playstyle:'icon-icon-3',
				musicplay:true,
				time:'',
				rotatedeg:0,
				cdrotate:'rotate(0deg)',
				currentTime:'00:00',
				duration:'00:00',
				precent:'0%',
				update:'',
				lyricsObjArr:[],
				itemtranslate:'translateY(170px)',
				i:0
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			this.$store.dispatch('getlyric')
			const src = `https://music.163.com/song/media/outer/url?id=${this.$store.state.music.id}`;
			audio.src = src;
			audio.autoplay = false;
			this.swithplay()
			// console.log(this.$store.state.playlist,'1'),
			audio.onEnded(()=>{
				audio.seek(0)
			})
			// console.log(src,innerAudioContext.duration)
		},
		onReady() {
			audio.onCanplay(()=>{
				audio.duration
				setTimeout(()=>{
					const min = Math.floor(audio.duration/60)<10?`0${Math.floor(audio.duration/60)}` : Math.floor(audio.duration/60)
					const sec = Math.floor(audio.duration%60)<10?`0${Math.floor(audio.duration%60)}` : Math.floor(audio.duration%60)
					this.duration = `${min}:${sec}`
				},100)
			})
			setTimeout(()=>{this.lyricsObjArr = this.lyric2ObjArr(this.$store.state.gqlyric)
				// console.log(this.lyricsObjArr[0].lyric,this.lyricsObjArr)
			},300)
			audio.onError((res)=>{
				uni.showModal({
				    title: '',
				    content: '错误代码'+':'+res.errCode,
					showCancel:false,
				    success: (res)=> {
						this.swithplay()
				    }
				})
			})
		},
		methods: {
			back(){
				audio.pause()
				uni.navigateBack({
					delta:1
				})
			},
			swithplay(){
				this.musicplay = !this.musicplay
				if(!this.musicplay){
					this.rotatestart()
					this.updatestart()
					audio.play()
					// console.log(audio.duration,audio.currentTime)
					// if(this.cdrotate.transform='rotate(0deg)'){
					// 	let rotatedeg = this.cdrotate.transform.split(/[^\d{n}$]+/,2)
					// 	console.log(rotatedeg)
					// }
					// setTimeout(=>{},100)
					// setTimeout(()=>{let rotatefeg = 0;;this.cdrotate.transform='rotate(360deg)'?this.cdrotate.transform='rotate()':this.cdrotate.transform='rotate(0deg)';console.log('yes')},100)
					// console.log(this.cdrotate.transform='rotate(180deg)')
					// console.log(this.cdrotate.transform)
				}else{
					this.rotateend()
					this.updateend()
					audio.pause()
				}
			},
			rotatestart(){
				clearInterval(this.time)
				this.rotaterun()
			},
			rotateend(){
				clearInterval(this.time)
			},
			rotaterun(){
				let that = this
				// uni.createSelectorQuery('.cd')
				that.time = setInterval(()=>{
					if(that.rotatedeg > 360 ){
						that.rotatedeg = 2
					}else{
						that.rotatedeg += 1
					}				
					that.cdrotate = 'rotate(' + that.rotatedeg +'deg)'
				},100)
			},
			updatestart(){
				clearInterval(this.update)
				this.updateTime()
			},
			updateend(){
				clearInterval(this.update)
			},
			updateTime(){
				let that = this
				that.update = setInterval(()=>{
					let currentTime = audio.currentTime
					const mins = Math.floor(currentTime / 60) < 10 ? `0${Math.floor(currentTime / 60)}` : Math.floor(currentTime / 60)
					const sec = Math.floor(currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60)			
					that.currentTime = `${mins}:${sec}`
					that.updateProgress(audio.currentTime, audio.duration)
						// console.log(that.currentTime==this.lyricsObjArr[0].time)
					if(this.lyricsObjArr.length != 0){
						// 匹配歌词
						for(let i = 0;i<this.lyricsObjArr.length;i++){
							that.currentTime == this.lyricsObjArr[i].time ? function(){
								this.i = i
								this.itemtranslate = `translateY(${170 - (28 * i)}px)`
							} : false
							// if(that.currentTime == this.lyricsObjArr[i].time){
							// 	this.i = i
							// 	this.itemtranslate = `translateY(${170 - (28 * i)}px)`
							// }
						}
					}
					// console.log(audio.currentTime,that.currentTime,mins,sec)
				})
			},
			updateProgress (currentTime, duration) {
				const precent = `${((currentTime / duration) * 100).toFixed(5)}%`
				this.precent = precent
				// console.log(precent)
				// console.log(currentTime, duration,precent)
			},
			clickProgress(e){
				const progress = uni.createSelectorQuery().select('.progress')
				progress.boundingClientRect(function(data){
					let chazhi = (e.detail.x-data.left)/data.width
					audio.seek(chazhi*audio.duration)
					// this.precent=`${Math.floor(chazhi*100)}%`
					// console.log(e.detail.x,data.left,this.precent)
					// this.zongwidth = data.width
					// console.log(this.zongwidth,data.width,data,'1')
				}).exec()
				// console.log(that.dangqianwidth,that.zongwidth)
			},
			lyric2ObjArr (lyric) {
				const lyricsObjArr = []
				if(lyric != undefined){
					const lineArr = lyric.split('\n')
					lineArr.forEach(item =>{
						const obj = {}				  
						obj.lyric = item.split(']')[1] === '' ? '' : item.split(']')[1]
						obj.time = item.slice(1,6)
						obj.uid = Math.random().toString().slice(-6)
						lyricsObjArr.push(obj)
					})
				}
				return lyricsObjArr
			},
			premusic(){
				for(let i = 0 ; i < this.$store.state.playlist.length ; i++){
					const length = this.$store.state.playlist.length-1
					if(this.$store.state.playlist[i].id === this.$store.state.music.id){
						if(i === 0){
							this.$store.state.music.id = this.$store.state.playlist[`${length}`].id
							this.$store.state.music.img = this.$store.state.playlist[`${length}`].img
							this.$store.state.music.name = this.$store.state.playlist[`${length}`].name
							this.$store.state.music.ar = this.$store.state.playlist[`${length}`].ar
							this.$store.dispatch('getlyric').then(()=>{this.lyricsObjArr = this.lyric2ObjArr(this.$store.state.gqlyric)})
							// console.log(this.$store.state.playlist.length-1,i,'3')
							const src = `https://music.163.com/song/media/outer/url?id=${this.$store.state.music.id}`;
							audio.src = src
							this.musicplay ? this.swithplay() : false
							// uni.redirectTo({
							//     url: 'musicui'
							// });
							break;
						}else{
							this.$store.state.music.id = this.$store.state.playlist[i-1].id
							this.$store.state.music.img = this.$store.state.playlist[i-1].img
							this.$store.state.music.name = this.$store.state.playlist[i-1].name
							this.$store.state.music.ar = this.$store.state.playlist[i-1].ar
							this.$store.dispatch('getlyric').then(()=>{this.lyricsObjArr = this.lyric2ObjArr(this.$store.state.gqlyric)})
							// console.log(this.$store.state.playlist.length-1,i,'4')
							const src = `https://music.163.com/song/media/outer/url?id=${this.$store.state.music.id}`;
							audio.src = src
							this.musicplay ? this.swithplay() : false
							// uni.redirectTo({
							//     url: 'musicui'
							// });
							break;
						}
					}
				}
			},
			nextmusic(){
				for(let i = 0 ; i < this.$store.state.playlist.length ; i++){
					if(this.$store.state.playlist[i].id === this.$store.state.music.id){
						if(i === this.$store.state.playlist.length-1){
							this.$store.state.music.id = this.$store.state.playlist[0].id
							this.$store.state.music.img = this.$store.state.playlist[0].img
							this.$store.state.music.name = this.$store.state.playlist[0].name
							this.$store.state.music.ar = this.$store.state.playlist[0].ar
							this.$store.dispatch('getlyric').then(()=>{this.lyricsObjArr = this.lyric2ObjArr(this.$store.state.gqlyric)})
							// console.log(this.$store.state.playlist.length-1,i,'1')
							const src = `https://music.163.com/song/media/outer/url?id=${this.$store.state.music.id}`;
							audio.src = src
							audio.autoplay = true
							this.musicplay ? this.swithplay() : false
							// console.log('1')
							break;
							// uni.redirectTo({
							//     url: 'musicui'
							// });
						}else{
							this.$store.state.music.id = this.$store.state.playlist[i+1].id
							this.$store.state.music.img = this.$store.state.playlist[i+1].img
							this.$store.state.music.name = this.$store.state.playlist[i+1].name
							this.$store.state.music.ar = this.$store.state.playlist[i+1].ar
							this.$store.dispatch('getlyric').then(()=>{this.lyricsObjArr = this.lyric2ObjArr(this.$store.state.gqlyric)})
							// console.log(this.$store.state.playlist.length-1,i,'2')
							const src = `https://music.163.com/song/media/outer/url?id=${this.$store.state.music.id}`;
							audio.src = src
							audio.autoplay = true
							this.musicplay ? this.swithplay() : false
							// console.log('2')
							// uni.redirectTo({
							//     url: 'musicui'
							// });
							break;
						}
					}
				}
			}
		},
		computed:{
			...mapState(['music','gqlyric','playlist'])
		}
	}
</script>

<style lang="stylus">
	page		
		min-height 100%
		.body
			height 100%
			overflow hidden
			.title
				padding-top 20px
				position fixed
				top 0
				left 0
				width 100%
				height 44px
				z-index 10
			.blurContainer
				width 100%
				height 100%
				background-position center center
				background-repeat no-repeat
				background-size cover
				background-attachment fixed
				position relative
				filter blur(40px)
				overflow hidden
				transform scale(1.5)
				z-index 1
				&:after
					content ''
					width 100%
					height 100%
					background-color rgba(255,255,255,0.25)
					position absolute
					z-index 2
			.top
				width 100%
				height 100%
				position absolute
				top 0
				left 0
				z-index 3
				display flex
				flex-direction column
				justify-content space-between
				.imgStyle
					width 100%
					height 80%
					display flex
					align-items center
					justify-content center
					flex-direction column
					.cd
						width 100%
						height 85%
						display flex
						align-items center
						justify-content center
						image
							width 500rpx
							height 500rpx
							border-radius 50%
					.tb
						width 100%
						height 15%
						display flex
						align-items center
						justify-content center					
						.iconfont
							width 100rpx
							height 100rpx
							display flex
							align-items center
							justify-content center
							font-size 50rpx
							margin 0 50rpx
				.lyricsStyle
					width 100%
					height 60%
					display flex
					align-items center
					justify-content flex-start
					flex-direction column
					padding-top 68px
					.volume
						width 100%
						height 10%
						display flex
						align-items center
						justify-content center
					.lyrics
						width 100%
						height 90%
						display flex
						align-items center
						justify-content flex-start
						overflow hidden
						flex-direction column
						view
							width 100%
							font-size 14px
							line-height 28px
							min-height 28px
							display flex
							align-items center
							justify-content center
						.sp
							color #2C405A
			.center
				width 100%
				height 5%
				position absolute
				left 0
				top 80%
				display flex
				flex-direction row
				align-items center
				z-index 6
				.currentTime
					display flex
					align-items center
					justify-content center
					width 15%
					color #333333
				.progress
					width 70%
					height 24rpx
					display flex
					align-items center
					justify-content flex-start
					position relative
					border 1px solid #8F8F94
					border-radius 24rpx
					overflow hidden
					.line
						position absolute
						left 0
						top 0rpx
						height 24rpx
						background-color: skyblue;
						transition: width .1s;
					.dot
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						position: absolute;
						top: 0rpx;
						background-color: #ccc;
						transition: left .1s;
						margin-left -12rpx
				.durationTime
					display flex
					align-items center
					justify-content center
					width 15%
					color #333333
			.buttom
				width 100%
				height 15%
				position absolute
				left 0
				bottom 0
				z-index 6
				.buttonlist
					width 100%
					height 100%
					display flex
					align-items center
					justify-content center
					view
						width 100rpx
						height 100rpx
						padding 0 20rpx
						display flex
						align-items center
						justify-content center
						font-size 80rpx
					.icon-icon-6
						font-size 100rpx
					.icon-icon-2
						font-size 100rpx
</style>
