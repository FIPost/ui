<template>
  <div class="wrapper">
    <div class="container-subheader">Voeg een stad toe</div>
    <InputField @inputChanged="cityMethod" label="Stad:" :input="city.City" />
    <BtnFinish text="Bevestigen" v-on:click="addCity" />
  </div>
</template>   

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/standardUi/InputField.vue";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import CityRequest from "@/classes/requests/CityRequest"
import { cityService } from "@/services/locatieService/cityservice";

@Options({
  components: {
    InputField,
    BtnFinish,
  },
})
export default class AddCity extends Vue {
  private city: CityRequest = new CityRequest("");

  cityMethod(input: string): void {
    this.city.Name = input;
  }

  async addCity() {
    await cityService.post(this.city);
    this.$router.push("/locaties");
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>
  