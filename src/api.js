import { lazyapi } from '@/export.js'
import { Loading, Notification } from 'element-ui'

const o = {
  'get:/zbtiku/quality/questionformat': true,
  'post:/zbtiku/quality/questionformat': true
}

export default lazyapi(o, {
  loading: {
    clazz: Loading,
    option: {}
  },
  msg: {
    clazz: Notification,
    option: {}
  }
})
