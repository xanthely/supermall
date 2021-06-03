<template>
<!-- ref/children -->
<!-- ref如果绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象
    如果绑定在普通元素上，那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type:Number,
      default: 0
    },
    pullUpLoad: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动位置
    if(this.probeType === 2 || this.probeType === 3)
    {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll',position)
      })
    }

    // 监听上拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 避免由于数据未完全加载就调用方法导致方法为空的错误
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('------');
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>