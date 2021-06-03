<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackShow"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    getRecommend,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages:[],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex: 0,
      message: '',
      show:false
    }
  },
  created() {
    // 保存传递的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // 获取顶部轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 保存商品详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 获取评论信息
      if(data.rate.cRate !== 0)
      {
        this.commentInfo = data.rate.list[0]
      }
      
      // 根据最新的数据，对应的DOM已经被渲染出来了
      // 但是图片依然是没有加载完的
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    })

    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 给getThemeTopY赋值 (对给getThemeTopY赋值操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },100)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    // 图片加载完成后对scroll进行刷新
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
    },
    contentScroll(position) {
      this.listenShowBackTop(position)
      // console.log(this.currentIndex);
      // 获取y值
      let positionY = -position.y
      
      let length = this.themeTopYs.length

      // 普通做法
      for (let i = 0; i < length-1; i++) {
      //   if(this.currentIndex !== i //防止赋值过程过于频繁
      //   // 判断区间：在0和某个数字之间
      //   && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
      //   // 判断最后一个区间
      //   || (i === length - 1 && positionY >= this.themeTopYs[i]))

      // hack做法
      // 在数组最后一个值后面再加上一个非常大的值
      if(this.currentIndex !== i && 
      (positionY >= this.themeTopYs[i] && 
      positionY < this.themeTopYs[i+1])
      )
        {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      // 获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加到购物车
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
      
        // setTimeout(() => {
        //   this.show = false
        // }, 1500);
        // console.log(res);

        this.$toast.show(res, 700)
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
    }
  }
}
</script>

<style scoped>
  #detail {
    /* 把底部的tabbar盖上 */
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
    /* margin-top: 50px; */
  }
</style>