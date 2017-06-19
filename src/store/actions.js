import * as types from './mutation-type'
import {playMode} from '@/common/js/config'
import {shuffle} from '@/common/js/util'
import {saveSearch,deleteSearch,removeSearch} from '@/common/js/cache'

/* ==================================================================================
 * 					 	actions 所有的异步操作管理
 *	简介：
 *		findIndex  代表 如果随机播放歌曲和当前播放歌曲是一样的 就返回当前播放的下标位置
 *		selectPlay 代表 选择播放
 *		randomPlay 代表 随机播放
 *		insertSong 代表 插入一首歌
 *		以上方法   第一个参数是 获取数据 commit 和 commit ， 第二个参数是 辐射数据 list 或者 index
 *		注意加 slice() 是为了不修改原始数据
 * ==================================================================================
 */



function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export const selectPlay = function ({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	//	随机播放 重新定义
	if (state.mode === playMode.random) {
		let randomList = shuffle(list)
		commit(types.SET_PLAYLIST, randomList)
		index = findIndex(randomList, list[index])
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit},{list}) {
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST, randomList)
	commit(types.SET_CURRENT_INDEX, 0)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({commit, state}, song) {
	//	播放列表 
	let playlist = state.playlist.slice()
	//	初始化序列播放列表
	let sequenceList = state.sequenceList.slice()
	//	播放当前的索引
	let currentIndex = state.currentIndex
	//	记录当前播放历史
	let currentSong = playlist[currentIndex]
	//	查找是否带插入的歌曲 
	let fpIndex = findIndex(playlist, song)
	//	因为是插入歌曲所以歌曲 ++
	currentIndex++
	//	插入这首歌当前下标位置
	playlist.splice(currentIndex, 0, song)
	//	如果已经插入这首歌了
	if (fpIndex > -1) {
		//	如果当前下标大于已经插入的下标
		if (currentIndex > fpIndex) {
			//	就把查找带插入歌曲的下标去掉
			playlist.splice(fpIndex, 1)
			currentIndex--
		} else {
			//	否则就把查找带插入歌曲的下标+1的位置去掉
			playlist.splice(fpIndex + 1, 1)
		}
	}
	//	解决 初始化序列播放列表 插入的下标
	let currentSIndex = findIndex(sequenceList, currentSong) + 1
	let fsIndex = findIndex(sequenceList, song)
	sequenceList.splice(currentSIndex, 0, song)
	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}

	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const removeSearchHistory = function({commit}) {
	commit(types.SET_SEARCH_HISTORY,removeSearch())
}