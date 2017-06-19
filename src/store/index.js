//	入口
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

/* ==========================================================
 * 					 	Vuex 状态管理
 *	简介：
 *		APP灵魂所在，在这里使用Vuex统一管理页面歌手列表，歌曲播放状态，播放是否展开，播放列表，播放模式，播放当前歌曲等信息
 *		所有对于歌曲的操作都通过Vuex来进行全局管理，
 *		然后对相应的变化做出全局改变。
 *		debug 方面在控制台查看状态变化信息
 * ========================================================== */

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ? [createLogger()] : []
})