import {getLyric,ERR_OK} from '@/api/recommend'
import {Base64} from 'js-base64'
export default class Song {
	constructor({id,mid,singer,name,album,duration,image,url}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}
	getLyric() {
		if (this.lyric) {
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve, reject) => {			
			getLyric(this.mid).then((res) => {
				if (res.code === ERR_OK){
					this.lyric = Base64.decode(res.lyric)
					resolve(this.lyric)
				} else {
					reject('no lyric')
				}
			})
		})
	}
}

export function createSong(musiData) {
	return new Song({
		id: musiData.songid,
		mid: musiData.songmid,
		name: musiData.songname,
		singer:filterSinger(musiData.singer),
		album: musiData.albumname,
		duration: musiData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musiData.albummid}.jpg?max_age=2592000`,
		url:`http://ws.stream.qqmusic.qq.com/${musiData.songid}.m4a?fromtag=46`
	})
}
export function filterSinger (singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((item) => {
		ret.push(item.name)
	})
	return ret.join('/')
}