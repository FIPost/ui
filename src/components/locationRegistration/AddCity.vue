<template>
  <div class="wrapper">
    <div class="container-subheader">{{ title }}</div>
    <InputField label="Stad:" v-model:input="city.Name" />
    <SmallBtnFinish text="Bevestigen" v-on:click="addCity" />
    <transition name="modal" v-if="showModal" close="showModal = false">
      <link-or-stay-modal link="locaties" @close="showModal = false" />
    </transition>
  </div>
</template>   

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import InputField from "@/components/standardUi/InputField.vue";
import SmallBtnFinish from "@/components/standardUi/SmallBtnFinish.vue";
import CityRequest from "@/classes/requests/CityRequest";
import { cityService } from "@/services/locatieService/cityservice";
import LinkOrStayModal from "@/components/standardUi/LinkOrStayModal.vue";
import { getCurrentInstance } from "@vue/runtime-core";

@Options({
  components: {
    InputField,
    SmallBtnFinish,
    LinkOrStayModal,
  },
  emits: ["location-changed"],
})
export default class AddCity extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  private city: CityRequest = new CityRequest("");
  private showModal: boolean = false;

  @Prop()
  public cityId: string = "";

  @Prop()
  public title: string = "Voeg een stad toe";

  async addCity() {
    if (this.cityId) {
      // Update.
      cityService
        .updateCity(this.cityId, this.city)
        .then(() => {
          this.city.Name = "";
          this.$emit("location-changed");
        })
        .catch((err) => {
          this.emitter.emit("err", err);
        });
    } else {
      cityService
        .post(this.city)
        .then(() => {
          this.showModal = true;
          this.city.Name = "";
        })
        .catch((err) => {
          this.emitter.emit("err", err);
        });
    }
  }

  async mounted() {
    if (this.cityId) {
      cityService.getById(this.cityId).then((res) => {
        this.city = new CityRequest(res.name);
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
