<template>
  <div class="list-view">
    <slot name="icon" tag="img"></slot>
    <div class="title">
      <slot name="title" tag="p"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",

}
</script>

<style scoped>
  .list-view {
    display: flex;
    height:30px;
    margin: 15px;
    margin-bottom: 0px;
    position: relative;
  }
  .title {
    margin-left: 35px;
    flex:1;
    border-bottom: 1px solid rgba(218, 215, 215, 0.315);
  }
</style>