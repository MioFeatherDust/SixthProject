import {
	RECEIVE_DUJIA,
	RECEIVE_GEDAN,
	RECEIVE_FINDGEDAN,
	RECEIVE_MUSICMOREMSG,
	RECEIVE_MUSICURL,
	RECEIVE_HOTGEDAN,
	RECEIVE_NEWGEDAN,
	RECEIVE_LYRIC,
	RECEIVE_PLAYLIST
} from './mutation-types.js'
import {
	reqdujia,
	reqgedan,
	reqfindgedan,
	reqmusicmoremsg,
	reqmusicurl,
	reqspgedan,
	reqsongurl,
	reqlyric
	} from '../api'
export default{
	// 网易云调用
	// banner
	async getdujia({commit}){
		const result = await reqdujia()
		if(result.code === 200){
			const dujialist = result.data.blocks[0].extInfo.banners
			// const dujialistPic = dujialist.map(banners=>banners.pic)
			// const dujialistUrl = dujialist.map(banners=>banners.url)
			commit(RECEIVE_DUJIA,{dujialist})
		}
	},
	// 歌单
	async getgedan({commit,state}){
		const limit = state.limit
		const result = await reqgedan(limit)
		if(result.code === 200){
			const gedanlist = result.result
			commit(RECEIVE_GEDAN,{gedanlist})
		}
	},
	// 歌单详情
	async getfindgedan({commit,state}){
		const id = state.gedanid
		const result = await reqfindgedan(id)
		if(result.code === 200){
			const gedancontent = result.playlist
			commit(RECEIVE_FINDGEDAN,{gedancontent})
		}
	},
	// 歌曲详情
	async getgequmoremsg({commit,state}){
		const ids = state.musicids
		// console.log(ids)
		const result = await reqmusicmoremsg(ids)
		// console.log(result)
		if(result.code === 200){
			const musicmoremsg = result.songs
			// console.log(musicmoremsg)
			commit(RECEIVE_MUSICMOREMSG,{musicmoremsg})
		}
	},
	// 歌曲地址
	// async getmusicurl({commit},id){
	// 	const ids = id + '.mp3'
	// 	console.log(id,ids)
	// 	const result = await reqmusicurl(ids)
	// 	if(result.code === 200){
	// 		const musicurl = result
	// 		commit(RECEIVE_MUSICURL,{musicurl})
	// 	}
	// },
	//推荐热门歌单
	async gethotgedan({commit,state}){
		const limit = state.limit
		const order = 'hot'
		const result = await reqspgedan(limit,order)
		if(result.code === 200){
			const gedanhotlist = result.playlists
			commit(RECEIVE_HOTGEDAN,{gedanhotlist})
		}
	},
	// 推荐新歌单
	async getnewgedan({commit,state}){
		const limit = state.limit
		const order = 'new'
		const result = await reqspgedan(limit,order)
		if(result.code === 200){
			const gedannewlist = result.playlists
			commit(RECEIVE_NEWGEDAN,{gedannewlist})
		}
	},
	// 获取歌曲下载
	async getsongurl({commit}){
		const result = await reqsonglong(id)
		if(result.code === 200){
			const songurl = result.url
		}
	},
	//获取歌词
	async getlyric({commit,state}){
		const id = state.music.id
		const result = await reqlyric(id)
		if(result.code === 200){
			const gqlyric = result.lrc.lyric
			commit(RECEIVE_LYRIC,{gqlyric})
		}
	},
	//添加歌单
	addplaylist({commit,state},playlist){
		const obj = []
		const ceshilist = state.playlist
		ceshilist.push(playlist)
		for(const item of ceshilist){
			obj[item.id+','+item.img+','+item.name+','+item.ar] = item
		}
		const now = Object.values(obj)
		commit(RECEIVE_PLAYLIST,{now})
	}
}