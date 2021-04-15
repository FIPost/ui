<template>
  <div class="combobox-container">
    <p class="header">{{ label }}</p>
    <ComboBox
      :options="options"
      :placeholder="placeholder"
      @selectChange="selectedChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ComboBox from "@/components/standardUi/ComboBox.vue";

@Options({
  components: {
    ComboBox,
  },
  props: {
    placeholder: String,
    options: Array as () => Array<String>,
    label: String,
  },
  emits: ["select-change"],
})
export default class ComboBoxInput extends Vue {
  selectedChange(input: string): void {
    this.$emit("select-change", input);
  }

  mounted() {
    console.log(this.$options);
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.input-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 440px;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  font-weight: normal;
  max-width: 100%;
}

.header {
  flex-basis: 100px;
}
</style>