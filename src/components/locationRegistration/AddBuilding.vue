<template>
  <div>
    <div class="wrapper">
      <LoadingIcon v-if="loading" />
      <div v-else>
        <div class="container-subheader">Voeg een gebouw toe</div>
        <ComboBoxInput
          @selectChange="assignCityToAddress"
          :options="cities"
          placeholder="selecteer een stad"
          label="Stad:"
        />

        <InputField label="Gebouw:" v-model:input="building.Name" />
        <InputField
          label="Straatnaam:"
          v-model:input="building.Address.Street"
        />
        <InputField
          label="Huisnummer:"
          v-model:input="building.Address.Number"
        />
        <InputField
          label="Toevoeging:"
          v-model:input="building.Address.Addition"
        />
        <InputField
          label="Postcode:"
          v-model:input="building.Address.PostalCode"
        />

        <SmallBtnFinish text="Bevestigen" v-on:click="addBuilding()" />
        <transition name="modal" v-if="showModal" close="showModal = false">
          <link-or-stay-modal link="locaties" @close="showModal = false" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import InputField from "@/components/standardUi/InputField.vue";
import SmallBtnFinish from "@/components/standardUi/SmallBtnFinish.vue";
import AddressRequest from "@/classes/requests/AddressRequest";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";
import LinkOrStayModal from "@/components/standardUi/LinkOrStayModal.vue";

import BuildingRequest from "@/classes/requests/BuildingRequest";
import Building from "@/classes/Building";
import City from "@/classes/City";

import { buildingService } from "@/services/locatieService/buildingservice";
import { cityService } from "@/services/locatieService/cityservice";
import { getCurrentInstance } from "@vue/runtime-core";
import SelectOption from "@/classes/helpers/SelectOption";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    SmallBtnFinish,
    LinkOrStayModal,
    LoadingIcon,
  },
  emits: ["location-changed"],
})
export default class AddBuilding extends Vue {
  @Prop()
  private title: string = "Voeg een gebouw toe";

  @Prop()
  private buildingId: string = "";

  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;
  private loading: boolean = true;
  private showModal: boolean = false;
  private cities: Array<SelectOption> = new Array<SelectOption>();

  private selectedCityOption: SelectOption = new SelectOption("", "");

  private allCities: Array<City> = new Array<City>();

  private building: BuildingRequest = new BuildingRequest(
    "",
    new AddressRequest("", "", "", 0, "")
  );

  async created() {
    // Retrieve cities.
    cityService
      .getAll()
      .then((res) => {
        this.allCities = res;
        this.allCities.forEach((city) =>
          this.cities.push(new SelectOption(city.id, city.name))
        );
        this.loading = false;
      })
      .catch((err) => {
        this.emitter.emit("err", err);
        this.loading = false;
      });

    if (this.buildingId) {
      // Get existing building if exists.
      buildingService.getById(this.buildingId).then((res: Building) => {
        this.building.Name = res.name;
        this.building.Address.CityId = res.address.city.id;
        this.building.Address.Street = res.address.street;
        this.building.Address.Number = res.address.number;
        this.building.Address.PostalCode = res.address.postalCode;
        this.building.Address.Addition = res.address.addition;

        this.selectedCityOption = new SelectOption(
          this.building.Address.CityId,
          res.address.city.name
        );
      });
    }
  }

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

    if (this.buildingId) {
      buildingService.update(this.building, this.buildingId).then(() => {
        this.$emit("location-changed");
      });
    } else {
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
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>