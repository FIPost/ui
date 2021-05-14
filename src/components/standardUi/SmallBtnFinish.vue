<template>
  <button class="small-btn-finish" @click="onClick()">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    text: String,
  },
  emits: ["btn-clicked"],
})
export default class BtnFinish extends Vue {
  text: string = "Voltooi";

  onClick(): void {
    this.$emit("btn-clicked");
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.small-btn-finish {
  width: 150px;
  font-size: 14px;
  height: 35px;

  background: $modern-purple-color;
  color: #ffffff;

  border-radius: 5px;
  border: 0px;
  box-shadow: $shadow;

  font-weight: bold;
  cursor: pointer;
}
</style>