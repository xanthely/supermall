<template>
  <div class="category">
    <nav-bar class="cate-nav"><div slot="center">商品分类</div></nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: "Category",
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .cate-nav {
    background-color: var(--color-tint);
    color:white;
    font-weight: bold;
  }
</style>