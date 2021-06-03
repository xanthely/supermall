<template>
  <div class="top">
    <h3 style="text-align: center">supermall</h3>
    <div class="message">
      <img src="~assets/img/profile/avatar.svg">
      <div class="login">
        <p>登录/注册</p>
        <div class="text">
          <!-- <img src="~assets/img/profile/phone.svg"> -->
          <p>暂无绑定的手机号</p>
        </div>
      </div>
      <p> > </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",

}
</script>

<style scoped>
  .top {
    padding-top: 5px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    background: var(--color-tint);
  }

  .message {
    padding-top: 20px;
    display: flex;
    align-items: center;
  }
  .message img {
    width:70px;
    height:70px;
    padding-right: 5px;
  }
  .login {
    flex:1;
  }
  .text {
    background-image: url("~assets/img/profile/phone.svg");
    background-size: 25px;
    background-repeat: no-repeat;
    margin-top: 5px;
  }
  .text p{
    margin-left: 25px;
    font-size: 13px;
    line-height: 30px;
  }
</style>