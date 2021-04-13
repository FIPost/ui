<template>
  <div class="cbsearch-container">
    <p class="header">{{ label }}</p>

    <div :class="valid ? 'custom-select' : 'custom-select error'">
      <input
        type="text"
        :class="valid ? 'input' : 'input error'"
        v-on:input="updateSuggestions()"
        v-model="selectedOption"
        v-on:blur="loseFocus()"
      />

      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
          @mousedown="onChange(suggestion)"
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
    label: String,
    valid: Boolean
  },
  emits: ["select-changed"],
})
export default class CBSearchSuggestions extends Vue {
  private selectedOption: String = "";
  private placeholder: String = "";
  private suggestions: Array<String> = [];
  private options!: Array<String>;
  private open: Boolean = false;
  private valid: Boolean = true;

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

  private loseFocus(){
    this.$emit("select-changed", this.selectedOption);
    this.open = false;
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
  font-size: 12px;
  background-color: $background-color;
  color: $black-color;

  border-radius: 0.4rem;
  border-width: 0;
  width: 200px;
  max-width: 70%;
  min-width: 150px;
  height: 2rem;
  margin: auto 0;
  padding: 1px 0.8rem;

  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    width: 150px;
  }
}

.input {
  user-select: none;
  border: 0px;
  width: 100%;
  height: 100%;
  background-color: $background-color;
  padding: 0px 0px;
}

.error {
  background: #ffc9cf;
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

  width: 200px;
  max-width: 70%;
  min-width: 150px;
  z-index: 1;

  margin: auto 0;
  padding: 1px 0.8rem;
  margin-top: 33px;
  margin-left: -11px;

  max-height: 150px;
  overflow-y: auto;

  @media only screen and (max-width: 600px) {
    width: 150px;
  }
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
  flex-wrap: wrap;
  justify-content: space-between;
  width: 440px;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  max-width: 100%;
}

.header {
  flex-basis: 100px;
}
</style>