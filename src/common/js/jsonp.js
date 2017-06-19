import originJsonp from 'jsonp'
/* =============================================
 * 				 JSONP封装解析
 *	简介：
 *		对URL进行组装，通过jsonp来执行跨域数据获取，
 *		使用Promise对象一个异步操作
 *		三种状态：Pending(进行中)、Resolved(已完成)和Rejected(已失败)
 *		最后把传入进来的data传入给url
 * ============================================= 
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

