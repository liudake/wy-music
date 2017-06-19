function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//	随机数组 经典洗牌
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

//	防抖、节流函数
export function debounce(fn, delay) {
	let timer
	return function(...args) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}

// 填充字符 
export function padString(str, split, spliceChar, padChar, decimal) {
    var str = String(str),
        len = str.length,
        split = split >> 0,
        decimal = decimal >>> 0,
        padChar = padChar || '0',
        first = split >= 0 ? str.slice(0, split) : str.slice(0, len+split),
        second = decimal > 0 ? str.slice(split).slice(0, decimal) : str.slice(split);

    if (spliceChar === undefined) {
        return second;
    }else {
        first = first || padChar;
        return first + spliceChar + second;
    }
}