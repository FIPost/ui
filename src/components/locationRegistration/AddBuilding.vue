<template>
  <div>
    <div class="wrapper">
      <LoadingIcon v-if="loading" />
      <div v-else>
        <div class="container-subheader">{{ title }}</div>
        <div style="display: inline-block;">
          <ComboBoxInput
              @selectChange="assignCityToAddress"
              :selectedOption="selectedCityOption"
              :options="cities"
              placeholder="selecteer een stad"
              label="Stad:"
              :valid="cityValid"
          />
        </div>
        <div class="tooltip" style="display: inline-block" >
          ?
          <span class="tooltiptext" >Selecteer de stad waarin het gebouw zich bevindt</span>
        </div>
<br/>
        <div style="display: inline-block;">
        <InputField
          label="Gebouw:"
          v-model:input="building.Name"
          :valid="nameValid"
          @update:input="nameChanged"
        />
        </div>
        <div class="tooltip" style="display: inline-block" >
          ?
          <span class="tooltiptext" >Vul de naam van het gebouw in</span>
        </div>
        <br/>

        <div style="display: inline-block;">
        <InputField
          label="Straatnaam:"
          v-model:input="building.Address.Street"
          :valid="streetValid"
          @update:input="streetChanged"
        />
        </div>
        <div class="tooltip" style="display: inline-block" >
          ?
          <span class="tooltiptext" >Vul het adres van het gebouw in</span>
        </div>
        <br/>

        <div style="display: inline-block;">
        <InputField
          label="Huisnummer:"
          v-model:input="building.Address.Number"
          :valid="numberValid"
          @update:input="numberChanged"
        />
        </div>
        <div class="tooltip" style="display: inline-block" >
          ?
          <span class="tooltiptext" >Vul het huisnummer in</span>
        </div>
        <br/>

        <div style="display: inline-block;">
        <InputField
          label="Toevoeging:"
          v-model:input="building.Address.Addition"
        />
        </div>
        <div class="tooltip" style="display: inline-block" >
          ?
          <span class="tooltiptext" >Vul eventueel een huisnummer toevoeging</span>
        </div>
        <br/>

        <div style="display: inline-block;">
        <InputField
          label="Postcode:"
          v-model:input="building.Address.PostalCode"
          :valid="postalCodeValid"
          @update:input="postalCodeChanged"
        />
        </div>
        <div class="tooltip" style="display: inline-block" >
          ?
          <span class="tooltiptext" >Vul de postcode van het gebouw in</span>
        </div>
        <br/>


        <div class="action-container">
          <SmallBtnFinish
            v-if="buildingId"
            text="Delete"
            :red="true"
            @btn-clicked="deleteLocation()"
            :isLoading="loadDeleteRequest"
            :disabled="loadPostRequest"
          />

          <h4 class="error-text" v-if="error.length > 0">
            {{ error }}
          </h4>

          <SmallBtnFinish
            text="Bevestigen"
            @btn-clicked="addBuilding()"
            :isLoading="loadPostRequest"
            :disabled="loadDeleteRequest"
          />
          <transition name="modal" v-if="showModal" close="showModal = false">
            <link-or-stay-modal link="locaties" @close="showModal = false" />
          </transition>
        </div>
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
import { AxiosError } from "axios";

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
  private loadPostRequest: boolean = false;
  private loadDeleteRequest: boolean = false;
  private showModal: boolean = false;

  private cities: Array<SelectOption> = new Array<SelectOption>();
  private selectedCityOption: SelectOption = new SelectOption("", "");
  private allCities: Array<City> = new Array<City>();
  private building: BuildingRequest = new BuildingRequest(
    "",
    new AddressRequest("", "", "", 0, "")
  );

  private nameValid: boolean = true;
  private streetValid: boolean = true;
  private cityValid: boolean = true;
  private postalCodeValid: boolean = true;
  private numberValid: boolean = true;
  private error: string = "";

  async created() {
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
      .catch((err: AxiosError) => {
        this.loading = false;
        this.emitter.emit("err", err);
      });
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
    this.loadPostRequest = true;
    if (this.validate()) {
      this.building.Address.Number = Number(this.building.Address.Number);

      if (this.buildingId) {
        buildingService
          .update(this.building, this.buildingId)
          .then(() => {
            this.loadPostRequest = false;
            this.$emit("location-changed");
          })
          .catch((err: AxiosError) => {
            this.loadPostRequest = false;
            this.error = err.response?.data;
          });
      } else {
        buildingService
          .post(this.building)
          .then(() => {
            this.loadPostRequest = false;
            this.showModal = true;
            this.clearModel();
          })
          .catch((err: AxiosError) => {
            this.loadPostRequest = false;
            this.emitter.emit("err", err);
          });
      }
    }
    else{
      this.loadPostRequest = false;
    }
  }

  deleteLocation() {
    if (confirm("Weet je zeker dat je deze locatie wilt verwijderen?")) {
      this.loadDeleteRequest = true;
      buildingService
        .delete(this.buildingId)
        .then(() => {
          this.$emit("location-changed");
        })
        .catch((err: AxiosError) => {
          this.emitter.emit("err", err);
        });
      this.loadDeleteRequest = false;
    }
  }

  private validate(): boolean {
    this.nameValid = this.building.Name.length > 0;
    this.cityValid =
      this.allCities.find((city) => city.id == this.building.Address.CityId) !=
      null;
    this.streetValid = this.building.Address.Street.length > 0;
    this.postalCodeValid = this.building.Address.PostalCode.length > 0;
    this.numberValid =
      !isNaN(this.building.Address.Number) &&
      this.building.Address.Number != null &&
      this.building.Address.Number.toString().length > 0;

    if (!this.nameValid || !this.streetValid || !this.postalCodeValid) {
      this.error = "Niet alle velden zijn ingevoerd";
      return false;
    }

    if (!this.numberValid) {
      this.error = "Het huisnummer is niet valide";
      return false;
    }
    if (!this.cityValid) {
      this.error = "deze stad bestaat niet";
      return false;
    }
    this.error = "";
    return true;
  }

  nameChanged(input: string): void {
    this.nameValid = this.building.Name.length > 0;
    this.error = "";
  }

  streetChanged(input: string): void {
    this.streetValid = this.building.Address.Street.length > 0;
    this.error = "";
  }

  postalCodeChanged(input: string): void {
    this.postalCodeValid = this.building.Address.PostalCode.length > 0;
    this.error = "";
  }

  numberChanged(input: string): void {
    this.numberValid = !isNaN(this.building.Address.Number);
    this.error = "";
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>