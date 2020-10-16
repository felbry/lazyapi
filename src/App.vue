<template>
  <div id="app">
    app
  </div>
</template>

<script>
import lazyapi from '@/api.js'
export default {
  created () {
    lazyapi['get:/zbtiku/quality/questionformat']()
      .then()
    lazyapi['post:/zbtiku/quality/questionformat']({
      a: 'a',
      b: 'b'
    }).then(() => {
      console.log('post成功')
    })
  }
}
</script>

<style lang="less"></style>
