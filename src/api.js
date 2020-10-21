import { lazyapi } from '@/export.js'
import { Loading, Notification } from 'element-ui'

const o = {
  'get:/zbtiku/personal/getorgtreefg': true,
  'post:/zbtiku/quality/questionformat': true
}

export default lazyapi(o, {
  hooks: {
    startLoading: (customConf) => {
      return Loading.service()
    },
    endLoading: (loadingInstance, customConf) => {
      loadingInstance.close()
    },
    showMsg: (response, customConf) => {
      const { status, data } = response
      if (status === 200) {
        const { code, msg } = data
        if (code !== 0) {
          Notification({
            type: 'warning',
            message: msg
          })
        }
      } else {
        Notification({
          type: 'error',
          message: `服务异常，状态码${status}`
        })
      }
    }
  }
})
