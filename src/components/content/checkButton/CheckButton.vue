<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
  .check-button {
    border: 2px solid gainsboro;
    padding: 1px;
    border-radius: 50%;
  }
  .check {
    border: 2px solid var(--color-tint);
    background: var(--color-tint);
  }
</style>