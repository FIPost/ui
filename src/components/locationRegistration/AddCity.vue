<template>
  <div class="wrapper">
    <LoadingIcon v-if="isLoading" />
    <div v-else>
      <div class="container-subheader">{{ title }}</div>
      <InputField
        label="Stad:"
        v-model:input="city.Name"
        :valid="nameValid"
        @update:input="nameChanged"
      />

      <h4 class="error-text" v-if="error.length > 0">
        {{ error }}
      </h4>

      <div class="action-container">
        <SmallBtnFinish
          v-if="cityId"
          text="Delete"
          :red="true"
          @click="deleteLocation()"
        />
        <SmallBtnFinish text="Bevestigen" v-on:click="addCity" :isLoading="loadPostRequest"/>
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
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
import CityRequest from "@/classes/requests/CityRequest";
import { cityService } from "@/services/locatieService/cityservice";
import LinkOrStayModal from "@/components/standardUi/LinkOrStayModal.vue";
import { getCurrentInstance } from "@vue/runtime-core";
import { AxiosError } from "axios";

@Options({
  components: {
    InputField,
    SmallBtnFinish,
    LinkOrStayModal,
    LoadingIcon,
  },
  emits: ["location-changed"],
})
export default class AddCity extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  private city: CityRequest = new CityRequest("");
  private showModal: boolean = false;
  private nameValid: boolean = true;
  private error: string = "";
  private isLoading: boolean = false;
  private loadPostRequest: boolean = false;

  @Prop()
  public cityId: string = "";

  @Prop()
  public title: string = "Voeg een stad toe";

  async addCity() {
    this.loadPostRequest = true;
    if (this.validate()) {
      if (this.cityId) {
        // Update.
        cityService
          .updateCity(this.cityId, this.city)
          .then(() => {
            this.city.Name = "";
            this.$emit("location-changed");
          })
          .catch((err: AxiosError) => {
            this.error = err.response?.data;
          });
      } else {
        cityService
          .post(this.city)
          .then(() => {
            this.showModal = true;
            this.city.Name = "";
          })
          .catch((err: AxiosError) => {
            this.emitter.emit("err", err);
          });
      }
    }
    this.loadPostRequest = false;
  }

  private validate(): boolean {
    this.nameValid = this.city.Name.length > 0;
    if (this.nameValid) {
      this.error = "";
      return true;
    } else {
      this.error = "Niet alle velden zijn ingevoerd";
      return false;
    }
  }

  deleteLocation() {
    if (confirm("Weet je zeker dat je deze locatie wilt verwijderen?")) {
      cityService
        .deleteCity(this.cityId)
        .then(() => {
          this.$emit("location-changed");
        })
        .catch((err: AxiosError) => {
          this.emitter.emit("err", err);
        });
    }
  }
  nameChanged(input: string): void {
    this.nameValid = this.city.Name.length > 0;
    this.error = "";
  }

  async mounted() {
    if (this.cityId) {
      this.isLoading = true;
      cityService.getById(this.cityId).then((res) => {
        this.city = new CityRequest(res.name);
      });
    }
    this.isLoading = false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>
