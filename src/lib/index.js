import axios from 'axios'
import * as qs from 'qs'
axios.defaults.baseURL = 'http://yapi.zuoyebang.cc/mock/1706'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.validateStatus = status => status < 600
const emptyFunc = () => {}
let startLoading = emptyFunc
let endLoading = emptyFunc
let showMsg = emptyFunc
const genRequest = (method, url) => (data = {}, customConf = {}) => {
  // loading
  const loadingInstance = startLoading(customConf)
  return axios({
    url,
    method,
    ...(method === 'get' ? { params: data } : { data: qs.stringify(data) })
  })
    .then(response => {
      endLoading(loadingInstance, customConf)
      const { data } = response
      if (response.status === 200) {
        const { code } = data
        if (code === 0) {
          return data.data
        } else {
          showMsg(data, customConf)
          return Promise.reject(data)
        }
      } else {
        showMsg(response, customConf)
        return Promise.reject(data)
      }
    })
}
const lazyapi = (obj, set = {}) => {
  startLoading = (set.hooks && set.hooks.startLoading) || emptyFunc
  endLoading = (set.hooks && set.hooks.endLoading) || emptyFunc
  showMsg = (set.hooks && set.hooks.showMsg) || emptyFunc
  const output = {}
  Object.keys(obj).forEach(desc => {
    const [method, url] = desc.split(':')
    output[desc] = genRequest(method, url)
  })
  return output
}
export { lazyapi }
