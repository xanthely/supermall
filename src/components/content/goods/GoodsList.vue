<template>
<div class="goods">
  <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"/>
</div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: "GoodsList",
  props: {
    goods: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
/* 设置一行显示两个商品 */
  .goods {
    display: flex;
    flex-wrap: wrap;
    /* 均等分 盒子间间距相等 */
    justify-content: space-around;
    padding: 2px;
  }
</style>