<template>
  <div class="wrapper">
    <div class="container-subheader">Voeg een stad toe</div>
    <InputField @inputChanged="cityMethod" label="Stad:" :input="city.City" />
    <BtnFinish text="Bevestigen" v-on:click="addCity" />
  </div>
</template>   

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import City from "@/classes/City";
import { locatieService } from "@/services/locatieservice";

@Options({
  components: {
    InputField,
    BtnFinish,
  },
})
export default class AddCity extends Vue {
  private city: City = new City("", "");

  cityMethod(input: string): void {
    this.city.City = input;
  }

  async addCity() {
    let result = await locatieService.postCity(this.city);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
    margin-top: 1em;
}
</style>
  