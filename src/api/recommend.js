import jsonp from 'common/js/jsonp'
import axios from 'axios'
/* =============================================
 *         音乐Api解析 jsonp
 *  简介：
 *    配置API接口信息
 *    最后 返回JSOPN方法导出统一的接口
 * =============================================
 */
const commonParams = {
  g_tk: 1928093487,
  uin:294256276,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
const options = {
  param: 'jsonpCallback'
}
export const ERR_OK = 0
//  首页页面接口
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
  	platform: 'h5',
  	uin: 0,
  	needNewCode: 1
	})
	return jsonp(url, data, options)
}

//  歌手页面接口
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

//  歌单详情页接口
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: "yqq",
    begin: 0,
    num: 100,
    songstatus: 1,
    needNewCode: 0,
    order: "listen",
    singermid: singerId
  })
  return jsonp(url, data, options)
}

//  歌单详情页接口
export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}

//  排行榜页面接口
export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}
//  排行榜歌曲详情页面接口
export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    platform: 'h5',
    tpl:3,
    page:'detail',
    type:'top'
  })
  return jsonp(url, data, options)
}
//  搜索页面接口
export function getSearchList() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

//  搜索页面 搜索结果数据 接口
export function search(query,page,zhida,perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}
/* =============================================
 *         音乐Api解析 axios
 *  简介：
 *    由代理api传过来的信息 配置url地址
 *    再返回一个axios请求
 *    第一个参数url
 *    第二个参数接口需要参数
 *    然后通过 .then 返回参数
 * =============================================
 */

 // 歌词页面接口
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//  歌词页面接口
export function getLyric(mid) {
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParams, {
    songmid:mid,
    pcachetime: +new Date(),
    loginUin:0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
