<template>
  <button :class="red ? 'small-btn-finish red' : 'small-btn-finish purple'" @click="onClick()">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    text: String,
    red: Boolean
  },
  emits: ["btn-clicked"],
})
export default class BtnFinish extends Vue {
  red: Boolean = false;

  onClick(): void {
    this.$emit("btn-clicked");
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.small-btn-finish {
  width: 140px;
  font-size: 14px;
  height: 35px;
  margin-right: 5px;

  color: #ffffff;

  border-radius: 5px;
  border: 0px;
  box-shadow: $shadow;

  font-weight: bold;
  cursor: pointer;
}

.purple {
  background: $modern-purple-color;
}

.red {
  background: $pink-color;
}
</style>