import axios from 'axios'
import * as qs from 'qs'
axios.defaults.baseURL = 'http://yapi.zuoyebang.cc/mock/1706'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.validateStatus = status => status < 600
let defaultLoading = null // clazz option 甚至之后的 createFunc
let defaultMsg = null // clazz option 甚至之后的 createFunc
const DEFAULT_CONF = {
  loading: null,
  message: true
}
const genRequest = (method, url) => (data = {}, customConf = {}) => {
  const conf = {
    ...DEFAULT_CONF,
    ...customConf
  }
  // loading
  let loadingInstance = null
  if (defaultLoading && conf.loading) {
    loadingInstance = defaultLoading.clazz.service(conf.loading.option)
  }
  return axios({
    url,
    method,
    ...(method === 'get' ? { params: data } : { data: qs.stringify(data) })
  })
    .then(response => {
      if (loadingInstance) { loadingInstance.close() }
      const { data } = response
      if (response.status === 200) {
        const { code, msg } = data
        if (code === 0) {
          return data.data
        } else {
          if (defaultMsg && conf.message) {
            defaultMsg.clazz({
              ...defaultMsg.option,
              message: msg
            })
          }
          return Promise.reject(data)
        }
      } else {
        if (defaultMsg) {
          defaultMsg.clazz({
            ...defaultMsg.option,
            message: `服务器异常（状态码：${response.status}）`
          })
        }
        return Promise.reject(data)
      }
    })
}
const lazyapi = (obj, set = {}) => {
  defaultLoading = set.loading
  defaultMsg = set.msg
  const output = {}
  Object.keys(obj).forEach(desc => {
    const [method, url] = desc.split(':')
    output[desc] = genRequest(method, url)
  })
  return output
}
export { lazyapi }
