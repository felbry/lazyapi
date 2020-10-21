<template>
  <div id="app">
    app
  </div>
</template>

<script>
import lazyapi from '@/api.js'
export default {
  created () {
    lazyapi['get:/zbtiku/personal/getorgtreefg']()
      .then(data => {
        console.log('get成功')
        console.log(data)
      })
      .catch(d => {
        console.log('get fail')
        console.log(d)
      })
    lazyapi['post:/zbtiku/quality/questionformat']({
      a: 'a',
      b: 'b'
    })
      .then(data => {
        console.log('post成功')
        console.log(data)
      })
      .catch(err => {
        console.log('post fail')
        console.log(err)
      })
  }
}
</script>

<style lang="less"></style>
