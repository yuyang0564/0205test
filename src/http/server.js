import Axios from 'axios'
import qs from 'qs'
//! 是否提交JSON 数据
const submitJson = false
//! 根据需求切换请求头
const submitType = submitJson ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded;charset=utf-8'

const http = Axios.create()

switch (process.env.NODE_ENV) {
  case 'production':
    http.defaults.baseURL = 'http'
    break
  case 'development':
    http.defaults.baseURL = 'http://m.jingmaotuan.cn'
    break
}

//! POST参数转换
const formattingParameters = params =>
{

  if (Object.keys(params).length) {
    let conversionParams
    if (submitJson) {
      conversionParams = JSON.stringify(params)
    } else {
      conversionParams = qs.stringify(params)
    }
    return conversionParams
  } else {
    return ''
  }
}

//! GET参数转换
const formattingQueryString = params =>
{
  if (Object.keys(params).length) {
    let queryString = []
    for (let [key, value] of Object.entries(params)) {
      queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return `?${queryString.join('&')}`
  } else {
    return ''
  }
}

//! 改变请求头，请求参数混入
const RequestMixin = (config) => {

  let {method ,data } = config
  if(!data) return
  if(['post','put','patch'].includes(method.toLowerCase())) {
    config.headers[method]['Content-Type'] = submitType
    config.data = formattingParameters(data)
  } else {
    config.url += formattingQueryString(data)
  }
}




//! 请求拦截器
http.interceptors.request.use(config =>
{
  
  RequestMixin(config)
  return config
}, 
err =>
{
  throw new Error(`发送请求时发生错误${err}`)
})

//! 响应拦截器
http.interceptors.response.use(response =>
{
  
  let { status , data } = response
  if(status === 200) {
      return data
  }
}, 
err =>
{
  throw new Error(`网络请求发生错误${err}`)
})


export default http