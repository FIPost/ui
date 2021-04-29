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
import AddressRequest from "@/classes/requests/AddressRequest";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";

import BuildingRequest from "@/classes/requests/BuildingRequest";
import City from "@/classes/City";

import { buildingService } from "@/services/locatieService/buildingservice";
import { cityService } from "@/services/locatieService/cityservice";
import { getCurrentInstance } from "@vue/runtime-core";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    BtnFinish,
  },
})
export default class AddBuilding extends Vue {
  private cities: Array<String> = new Array<String>();
  private building: BuildingRequest = new BuildingRequest(
    "",
    new AddressRequest("", "", "", 0, "")
  );
  private allCities: Array<City> = new Array<City>();
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  assignCityToAddress(input: string): void {
    this.building.Address.CityId = input;
    var id = this.allCities.find((city) => city.name == input)?.id;
    if (id != null) this.building.Address.CityId = id;
  }

  assignStreetToAddress(input: string): void {
    this.building.Address.Street = input;
  }

  assignNrToAddress(input: Number): void {
    this.building.Address.Number = Number(input);
  }

  assignAdditionToAddress(input: string): void {
    this.building.Address.Addition = input;
  }

  assignPostalCodeToAddress(input: string): void {
    this.building.Address.PostalCode = input;
  }

  buildingChanged(input: string): void {
    this.building.Name = input;
  }

  async addBuilding() {
    await buildingService.post(this.building);
    this.$router.push("/locaties");
  }

  async mounted() {
    cityService
      .getAll()
      .then((res) => {
        this.allCities = res;
        this.allCities.forEach((city) => this.cities.push(city.name));
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>