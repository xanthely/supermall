<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control class="tab-control" :titles="['流行','新款','精选']"
    @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
  <scroll class="content" 
          ref="scroll" 
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">

    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"/>
    <feature-view/>

    <tab-control :titles="['流行','新款','精选']"
    @tabClick="tabClick" ref="tabControl2"/>
    <!-- <tab-control class="tab-control" :titles="['流行','新款','精选']"
    @tabClick="tabClick" ref="tabControl" :class="{fixed: isTabFixed}"/> -->
    
    <goods-list :goods="showGoods"/>
  </scroll>

  <!-- .native 监听一个组件的原生事件 -->
  <back-top @click.native="backClick" v-show="isShowBackShow"/>
</div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

// 公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

// 方法、额外数据
import {getHomeMultidata, getHomeGoods} from 'network/home';
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return{
      banners:[],
      recommends:[],
      goods: {
        'pop':{page:0, list:[]},
        'new':{page:0, list:[]},
        'sell':{page:0, list:[]},
      },
      currentType:'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局事件监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created() {
    //1. 请求多个数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      // 使两个tabControl的index保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      this.listenShowBackTop(position)
      
      // 决定TabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('111')
      // console.log(this.currentType)
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // push进数据
        this.goods[type].list.push(...res.data.list)
        // 页码+1
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

// scoped作用域
<style scoped>
/* 使轮播图完全显现 */
#home {
  height:100vh;
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color:white;

/* 在使用浏览器原生滚动时使用，为了让导航不跟着一起滚动 */
  /* position: fixed;
  left:0;
  right:0;
  top:0;
  z-index:9; */
}

/* .tab-control {
  position: sticky;
  top:44px;
  z-index:9;
} */

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* 1.由于TabControl脱离了文档流，导致GoodsList向上占据原来TabControl位置
      2.即使设置了fixed，TabControl还是会受translate影响向上滚动*/
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 50px;
} */
</style>