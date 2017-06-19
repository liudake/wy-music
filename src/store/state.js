import {playMode} from '@/common/js/config'
import {loadSearch} from '@/common/js/cache'
//	所有状态管理
const state = {
	//	歌手列表
	singer: {},
	//	播放状态
	playing: false,
	//	播放是否展开
	fullScreen: false,
	//	播放列表
	playlist:[],
	//	初始化序列播放列表
	sequenceList: [],
	//	播放模式 0 顺序播放  1 单曲播放 2 随机播放
	mode:playMode.sequence,
	//	播放当前的索引
	currentIndex: -1,
  	//  唱片详情
  	disc: {},
  	//	排行榜详情
  	toplist: {},
  	//	搜索历史记录
  	searchHistory: loadSearch()
}
export default state
