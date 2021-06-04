import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    // 监听item中图片加载完成
    // 放在mounted同样也是为了防止数据还未加载完就refresh()

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      // 直接执行refresh将会执行30次，将其传入debounce中生成一个新的函数
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackShow: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      // (position.y >1000)
      // 判断BackTop是否显示
      this.isShowBackShow = (-position.y) > 1000
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
