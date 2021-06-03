<template>
  <div class="profile">
    <top/>
    <mine/>
    <div class="main">
      <list-view>
        <img class="icon" slot="icon" src="~assets/img/profile/message.svg">
        <p slot="title">我的消息</p>
      </list-view>
      <list-view>
        <img class="icon" slot="icon" src="~assets/img/profile/pointer.svg">
        <p slot="title">积分商城</p>
      </list-view>
      <list-view>
        <img class="icon" slot="icon" src="~assets/img/profile/vip.svg">
        <p slot="title">会员卡</p>
      </list-view>
    </div>

    <list-view>
      <img class="icon" slot="icon" src="~assets/img/profile/cart.svg">
      <p slot="title">我的购物车</p>
    </list-view>
    <list-view>
      <img class="icon" slot="icon" src="~assets/img/profile/shopping.svg">
      <p slot="title">下载购物APP</p>
    </list-view>
  </div>
</template>

<script>
import Mine from './chileComps/Mine'
import Top from './chileComps/Top'
import ListView from './chileComps/ListView'

export default {
  name: "Profile",
  components: {
    Top,
    Mine,
    ListView
  }
}
</script>

<style scoped>
  .main {
    border-bottom: 13px solid #1111;
  }
  .icon {
    width:25px;
    height:25px;
    position: absolute;
    top:-4px
  }
</style>
