<template>
  <div class="cbsearch-container">
    <p>{{ label }}</p>

    <div class="custom-select">
      <input
        type="text"
        class="input"
        v-on:input="updateSuggestions()"
        v-model="selectedOption"
      />

      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="onChange(suggestion)"
        >
          {{ suggestion }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    placeholder: String,
    options: Array as () => Array<String>,
    label: String
  },
  emits: ["select-changed"],
})
export default class CBSearchSuggestions extends Vue {
  private selectedOption: String = "";
  private placeholder!: String;
  private suggestions: Array<String> = [];
  private options!: Array<String>;
  private open: Boolean = false;

  private onChange(option: String): void {
    this.selectedOption = option;
    this.open = false;
    this.$emit("select-changed", this.selectedOption);
  }

  private updateSuggestions() {
    this.$emit("select-changed", this.selectedOption);
    this.suggestions = this.options.filter((el: String) =>
      el.includes(this.selectedOption.toString())
    );
    this.open = true;
  }

  mounted() {
    this.selectedOption = this.placeholder;
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.custom-select {
  border: none;
  font-family: $font-family;
  font-size: 15px;
  background-color: $background-color;
  color: $black-color;
  border-radius: 0.4rem;
  width: 265px;
  height: 2rem;
   margin: auto 0;

  display: flex;
  flex-direction: row;
}

.input {
  user-select: none;
  width: 100%;
  height: 100%;
  border: 0px;
  background-color: $background-color;
}

.input:focus {
  outline: none;
  border: 0px;
}

.items {
  border-radius: $small-border-radius;
  box-shadow: $shadow;
  overflow: hidden;
  position: absolute;
  background-color: $background-color;
  color: $black-color;
  width: 260px;
  z-index: 1;
  margin-left: -10px;
  margin-top: 25px;
  max-height: 150px;
  overflow-y: auto;
}

.custom-select .items div {
  color: $black-color;
  padding: 0.5em 2em 0.5em 25px;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #d8d8da;
}

.selectHide {
  display: none;
}

.cbsearch-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 440px;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
}
</style>