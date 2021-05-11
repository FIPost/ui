<template>
<div>
  <button @click="shown=true">load</button>
  <div v-if="shown">
    <h1>loaded</h1>
  </div>
</div>
</template>

<script>
import LoadingIcon from "./standardUi/LoadingIcon";

export default {
  name: "DebugLoad",
  data: ()=> ({shown:false}),
  loading: LoadingIcon,
  delay: 500,
}
</script>

<style scoped>

</style>