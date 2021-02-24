import ajax from './ajax'
// 1.网易云独家放送接口
export const reqdujia = () => ajax(`http://localhost:3000/homepage/block/page`)
// 2.网易云推荐歌单
export const reqgedan = (limit) => ajax('http://localhost:3000/personalized',{limit})
// 3.歌单查找
export const reqfindgedan = (id) => ajax('http://localhost:3000/playlist/detail',{id})
// 4.歌曲详情
export const reqmusicmoremsg = (ids) => ajax('http://localhost:3000/song/detail',{ids})
// 5.歌曲播放地址
export const reqmusicurl = (id) => ajax('https://music.163.com/song/media/outer/url',{id})
// 6.最新歌单
export const reqspgedan = (limit,order) => ajax('http://localhost:3000/top/playlist',{limit,order})
// 7.歌曲下载
export const reqsongurl = (id) => ajax('http://localhost:3000/song/url',{id})
// 8.歌词内容
export const reqlyric = (id) => ajax('http://localhost:3000/lyric',{id})