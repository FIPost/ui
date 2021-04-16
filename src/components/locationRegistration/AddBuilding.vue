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
      :input="building.Name"
    />
    <InputField
      @inputChanged="assignStreetToAddress"
      label="Straatnaam:"
      :input="building.Address.Street"
    />
    <InputField
      @inputChanged="assignNrToAddress"
      label="Huisnummer:"
      :input="building.Address.StreetNr"
    />
    <InputField
      @inputChanged="assignAdditionToAddress"
      label="Toevoeging:"
      :input="building.Address.Addition"
    />
    <InputField
      @inputChanged="assignPostalCodeToAddress"
      label="Postcode:"
      :input="building.Address.PostalCode"
    />
    <BtnFinish text="Bevestigen" v-on:click="addBuilding()" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/standardUi/InputField.vue";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import Address from "@/classes/Address";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";
import BuildingRequest from "@/classes/requests/BuildingRequest";
import { buildingService } from "@/services/locatieService/buildingservice";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    BtnFinish,
  },
})
export default class AddBuilding extends Vue {
  private cities: Array<String> = new Array<String>("Tilburg", "Eindhoven");
  private building: BuildingRequest = new BuildingRequest("", new Address("", "", "", 0, ""));

  async created() {
    //call backend for cities//
    //    let result = await locatieService.getAllCities();
    //    this.cities = result;
  }

  assignCityToAddress(input: string): void {
    this.building.Address.CityId = input;
  }

  assignStreetToAddress(input: string): void {
    this.building.Address.Street = input;
  }

  assignNrToAddress(input: number): void {
    this.building.Address.Number = input;
  }

   assignAdditionToAddress(input: string): void {
    this.building.Address.Addition = input;
  }

  assignPostalCodeToAddress(input: string): void {
    this.building.Address.PostalCode = input;
  }

  buildingChanged(input: string) : void {
    this.building.Name = input;
  }

  async addBuilding() {
    await buildingService.post(this.building);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
    margin-top: 1em;
}
</style>