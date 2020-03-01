import Http from './server'

// const requestParamsMixins = (params) => {
//   if(params === undefined) return 
//   const RequestConfig = {
//     method: 'get',
//     headers: {},
//     data: {},
//     timeout: 5000,
//     withCredentials: true, 
//     responseType: 'json', 
//     responseEncoding: 'utf8'
//  }
//   if(Object.prototype.toString.call(params) !== '[object Object]') {
//     throw new Error('参数格式错误, params 请参照 axios 配置参数')
//   } else {
//     const hasAttribute = Object.getOwnPropertyNames(params).some( param => param in RequestConfig)
//     if(!hasAttribute) {
//       throw new Error('参数格式错误, params 请参照 axios 配置参数')
//     }
//   }
//  return Object.assign({},RequestConfig,params)
// }



export const testAxios = (params) => {
  return Http('/api/testget',params)
}

export const testAxiosPost = (params) => {
  return Http('/api/testpost',params)
}

export const requestFooterData = (params) => {
  return Http('/api/contacts',params)
}

export const requestRegister = (params) => {
  return Http('/testuser/register',{
    method: 'post',
    data: params
  })
}

export const requestLogin = (params) => {
  return Http('/testuser/login',{
    method: 'post',
    data: params
  })
}

export const requestMenus = (params) => {
  return  Http('/testuser/menus', params)
}

export const requestUpdateUser = (params) => {
  return Http('/testuser/update-user',{
    method: 'patch',
    data: params
  })
}