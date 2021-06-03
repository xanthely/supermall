<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
        :is-checked="isSelectAll"
        @click.native="checkClick"/>
      <p>全选</p>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      // 判断是否选中，相加，保留两位小数
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
      // 获取不选中的长度再取反
      // return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll){ // 全部选中时
        this.cartList.forEach(item => item.checked = false)
      }else { // 不全部选中时
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品', 700)
      }
    }
  },
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    background: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width:60px;
  }
  .check-button {
    width: 20px;
    height:20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 15px;
    flex:1;
  }
  .calculate {
    width:75px;
    text-align: center;
    color: white;
    background: var(--color-high-text);
  }
</style>