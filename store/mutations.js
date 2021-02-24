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
export default{
	[RECEIVE_DUJIA](state,{dujialist}){
		state.dujialist = dujialist
	},
	[RECEIVE_GEDAN](state,{gedanlist}){
		state.gedanlist = gedanlist
	},
	[RECEIVE_FINDGEDAN](state,{gedancontent}){
		state.gedancontent = gedancontent
		state.musicids = gedancontent.trackIds.map(trackIds=>trackIds.id)
	},
	[RECEIVE_MUSICMOREMSG](state,{musicmoremsg}){
		state.musicmoremsg = musicmoremsg
		// console.log(state.musicmoremsg)
	},
	[RECEIVE_MUSICURL](state,{musicurl}){
		state.musicurl = musicurl
	},
	[RECEIVE_HOTGEDAN](state,{gedanhotlist}){
		state.gedanhotlist = gedanhotlist
	},
	[RECEIVE_NEWGEDAN](state,{gedannewlist}){
		state.gedannewlist = gedannewlist
	},
	[RECEIVE_LYRIC](state,{gqlyric}){
		state.gqlyric = gqlyric
	},
	[RECEIVE_PLAYLIST](state,{now}){
		state.playlist= now
	}
}