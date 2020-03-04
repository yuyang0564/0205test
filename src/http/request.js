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



export const testAxios = (params) =>
{
  return Http('/api/testget', {
    data: params
  })
}

export const testAxiosPost = (params) =>
{
  return Http('/api/testpost', {
    data: params
  })
}

export const requestFooterData = (params) =>
{
  return Http('/api/contacts', {
    data: params
  })
}

export const requestRegister = (params) =>
{
  return Http('/testuser/register', {
    method: 'post',
    data: params
  })
}

export const requestLogin = (params) =>
{
  return Http('/testuser/login', {
    method: 'post',
    data: params
  })
}

export const requestGetUser = (params) =>
{
  return Http('/testuser', {
    data: params
  })
}

export const requestMenus = (params) =>
{
  return Http('/testuser/menus', {
    data: params
  })
}

export const requestUpdateUser = (params) =>
{
  return Http('/testuser/update-user', {
    method: 'patch',
    data: params
  })
}

export const requestCreateArticle = (params) =>
{
  return Http('/testuser/article/create', {
    method: 'post',
    data: params
  })
}

export const requestGetArticleItem = (params) =>
{
  return Http('/testuser/article', {
    data: params
  })
}

export const requestUpdateArticle = (params) =>
{
  return Http('/testuser/article', {
    method: 'patch',
    data: params
  })
}

export const requestUserArticles = (params) =>
{
  return Http('/testuser/articles', {
    data: params
  })
}

export const requestArticleDelete = (params) =>
{
  return Http('/testuser/articles', {
    method: 'delete',
    data: params
  })
}