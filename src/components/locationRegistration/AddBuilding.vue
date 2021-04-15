<template>
  <div class="wrapper">
    <div class="container-subheader">Voeg een gebouw toe</div>
    <ComboBoxInput
      @selectChange="assignCityToAddress"
      :options="cities"
      placeholder="selecteer een stad"
      label="Stad:"
    />
    <InputField
      @inputChanged="buildingChanged"
      label="Gebouw:"
      :input="gebouwNaam"
    />
    <InputField
      @inputChanged="assignStreetToAddress"
      label="Straatnaam:"
      :input="address.Street"
    />
    <InputField
      @inputChanged="assignStreetToAddress"
      label="Huisnummer:"
      :input="address.StreetNr"
    />
    <InputField
      @inputChanged="assignPostalCodeToAddress"
      label="Postcode:"
      :input="address.PostalCode"
    />
    <BtnFinish text="Bevestigen" v-on:click="addAddress" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Address from "@/classes/Address";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    BtnFinish,
  },
})
export default class AddBuilding extends Vue {
  private cities: Array<String> = new Array<String>("Tilburg", "Eindhoven");
  private address: Address = new Address("", 0, "", "", "", "");
  private gebouwNaam: String = "";

  async created() {
    //call backend for cities//
    //    let result = await locatieService.getAllCities();
    //    this.cities = result;
  }

  assignCityToAddress(input: string): void {
    this.address.City = input;
  }

  assignStreetToAddress(input: string): void {
    this.address.Street = input;
  }

  assignStreetNrToAddress(input: number): void {
    this.address.StreetNr = input;
  }

  assignPostalCodeToAddress(input: string): void {
    this.address.PostalCode = input;
  }

  buildingChanged(input: string) : void {
    this.gebouwNaam = input;
  }

  async addAddress() {
    //add
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
    margin-top: 1em;
}
</style>