# lazyapi

## API

`lazyapi(apiConf, option)`

- apiConf

键为 method + 冒号 + path，值目前约定为boolean值，未来根据需求调整

- option

属性hooks提供三个钩子函数，分别为startLoading，endLoading，showMsg。在特定的时间执行

## 快速开始

```javascript
import { lazyapi } from '@felbry/lazyapi'
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
```
