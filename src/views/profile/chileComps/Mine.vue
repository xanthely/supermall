<template>
  <div class="mine">
    <div class="one">
      <span>
        <h2>0.00</h2>元
        </span>
      <p>我的余额</p>
    </div>
    <div class="one">
      <span>
        <h2>0</h2>个
      </span>
      <p>我的优惠</p>
    </div>
    <div class="one" style="border:0">
      <span>
        <h2>0</h2>分
        </span>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",

}
</script>

<style scoped>
  .mine {
    display: flex;
    border-bottom: 13px solid #1111;
  }
  .one {
    padding: 10px;
    width: 33%;
    text-align: center;
    border-right: 1px solid rgba(218, 215, 215, 0.315);
    font-size: 13px;
  }
  .one p {
    margin-top: 5px;
  }
  .one span h2 {
    font-size: 25px;
    display: inline;
    color: #ff5f3e;
  }
</style>