import storage from 'good-storage'

/* ==================================================================================
 * 					 	cache 所有的本地存储
 *	简介：
 *		引入了storage 插入 详细请看官网文档
 *		storage.get(key,def)  获取一个key的值，如果没有值，第二个参数返回默认值
 *		storage.set(key,val)  设置一个key的值,	第二个设置要存储的数据
 *		insertArray() 方法用来处理 是否有重复，如果有重复我们就在数组的开头添加一个，最多存储多少（SEARCH_MAX_LEN）
 * ==================================================================================
 */

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

function insertArray(arr,val,compare,maxLen) {
	const index = arr.findIndex(compare)
	if (index === 0) {
		return
	}
	if (index > 0) {
		arr.splice(index, 1)
	}
	arr.unshift(val)

	if (maxLen && arr.length > maxLen) {
		arr.pop()
	}
}

function deleteArray(arr,compare) {
	const index = arr.findIndex(compare)
	if (index > -1) {
		arr.splice(index, 1)
	}
}


export function saveSearch(query) {
	let searches = storage.get(SEARCH_KEY,[])
	insertArray(searches, query, (item) => {
		return item === query
	}, SEARCH_MAX_LEN)
	storage.set(SEARCH_KEY,searches)
	return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
	let searches = storage.get(SEARCH_KEY,[])
	deleteArray(searches, (item) => {
		return item === query
	})
	storage.set(SEARCH_KEY,searches)
	return searches
}

export function removeSearch() {
  storage.remove(SEARCH_KEY)
  return []
}