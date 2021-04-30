<template>
  <div class="wrapper">
    <div class="container-subheader">Voeg een gebouw toe</div>
    <ComboBoxInput
      @selectChange="assignCityToAddress"
      :options="cities"
      placeholder="selecteer een stad"
      label="Stad:"
    />

    <InputField label="Gebouw:" v-model:input="building.Name" />
    <InputField label="Straatnaam:" v-model:input="building.Address.Street" />
    <InputField label="Huisnummer:" v-model:input="building.Address.Number" />
    <InputField label="Toevoeging:" v-model:input="building.Address.Addition" />
    <InputField label="Postcode:" v-model:input="building.Address.PostalCode" />

    <BtnFinish text="Bevestigen" v-on:click="addBuilding()" />
    <transition name="modal" v-if="showModal" close="showModal = false">
      <link-or-stay-modal link="locaties" @close="showModal = false" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/standardUi/InputField.vue";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import AddressRequest from "@/classes/requests/AddressRequest";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";
import LinkOrStayModal from "@/components/standardUi/LinkOrStayModal.vue";

import BuildingRequest from "@/classes/requests/BuildingRequest";
import City from "@/classes/City";

import { buildingService } from "@/services/locatieService/buildingservice";
import { cityService } from "@/services/locatieService/cityservice";
import { getCurrentInstance } from "@vue/runtime-core";
import SelectOption from "@/classes/helpers/SelectOption";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    BtnFinish,
    LinkOrStayModal,
  },
})
export default class AddBuilding extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;
  private showModal: boolean = false;
  private cities: Array<SelectOption> = new Array<SelectOption>();
  private allCities: Array<City> = new Array<City>();

  private building: BuildingRequest = new BuildingRequest(
    "",
    new AddressRequest("", "", "", 0, "")
  );

  private clearModel() {
    this.building.Name = "";
    this.building.Address.Street = "";
    this.building.Address.Number = (null as unknown) as number;
    this.building.Address.Addition = "";
    this.building.Address.PostalCode = "";
  }
  public assignCityToAddress(option: SelectOption): void {
    this.building.Address.CityId = option.id;
  }

  addBuilding() {
    this.building.Address.Number = Number(this.building.Address.Number);
    buildingService
      .post(this.building)
      .then(() => {
        this.showModal = true;
        this.clearModel();
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
  }

  async mounted() {
    cityService
      .getAll()
      .then((res) => {
        this.allCities = res;
        this.allCities.forEach((city) => this.cities.push(new SelectOption(city.id, city.name)));
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