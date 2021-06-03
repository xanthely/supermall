// 轮播图组件
<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt=""  @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
   methods:{
     imageLoad() {
      // 当第一张图片加载完成调用函数就可以通过$emit传递。此时已经有
      // 轮播图的图片高度，将isLoad设为true就不会再进入if内再传递一次
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
     }
   }
}
</script>

<style scoped>
</style>