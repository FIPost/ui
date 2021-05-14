<template>
<div class="loader"></div>
</template>

<script>
export default {
  name: "LoadingIcon"
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.loader {
  border: 16px solid #e3e3e3; /* Light grey */
  border-top: 16px solid $modern-purple-color; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: relative;
  margin: auto;
  margin-top: 50px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>