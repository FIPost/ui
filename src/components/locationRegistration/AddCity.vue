<template>
  <div class="wrapper">
    <div class="container-subheader">Voeg een stad toe</div>
    <InputField @inputChanged="cityMethod" label="Stad:" :input="city.City" />
    <BtnFinish text="Bevestigen" v-on:click="addCity" />
    <transition name="modal" v-if="showModal" close="showModal = false">
      <link-or-stay-modal link="locaties"  @close="showModal = false"/>
    </transition>
  </div>
</template>   

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/standardUi/InputField.vue";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import CityRequest from "@/classes/requests/CityRequest";
import { cityService } from "@/services/locatieService/cityservice";
import LinkOrStayModal from "@/components/standardUi/LinkOrStayModal.vue";
import { getCurrentInstance } from "@vue/runtime-core";

@Options({
  components: {
    InputField,
    BtnFinish,
    LinkOrStayModal,
  },
})
export default class AddCity extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  private city: CityRequest = new CityRequest("");
  private showModal: boolean = false;

  cityMethod(input: string): void {
    this.city.Name = input;
  }

  async addCity() {
    await cityService.post(this.city);
    cityService
      .post(this.city)
      .then(() => 
        {  
          this.showModal = true;
          
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
  