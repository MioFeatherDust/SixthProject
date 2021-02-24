export default{
	coverImgUrl:state =>{
		return state.gedancontent.coverImgUrl
	},
	gedanname:state =>{
		return state.gedancontent.name
	},
	gedanjieshao:state =>{
		return state.gedancontent.description
	},
	creatorimg:state =>{
		return state.gedancontent.creator.avatarUrl
	},
	creatorname:state =>{
		return state.gedancontent.creator.nickname
	}
}