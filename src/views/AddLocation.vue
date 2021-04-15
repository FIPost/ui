<template>
  <div class="page-wrapper">
    <div class="component-container">
      <div class="container-header">Locatie toevoegen</div>
      <ComboBox
        :options="locationOptions"
        @selectChange="selectedLocationChange"
        placeholder="selecteer een optie"
      />
    </div>
    <div class="component-container" id="inputField">
      <AddCity v-if="selectedLocation == 'stad'" />
      <AddAddress v-if="selectedLocation == 'address'" />
      <AddBuilding v-if="selectedLocation == 'gebouw'" />
      <AddInstitution v-if="selectedLocation == 'instituut'" />
      <AddRoom v-if="selectedLocation == 'ruimte'" />
    </div>
  </div>
</template>
 

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import AddCity from "@/components/locationRegistration/AddCity.vue";
import AddAddress from "@/components/locationRegistration/AddAddress.vue";
import AddBuilding from "@/components/locationRegistration/AddBuilding.vue";
import AddInstitution from "@/components/locationRegistration/AddInstitution.vue";
import AddRoom from "@/components/locationRegistration/AddRoom.vue";
import ComboBox from "@/components/standardUi/ComboBox.vue";

@Options({
  components: {
    ComboBox,
    InputField,
    BtnFinish,
    AddCity,
    AddAddress,
    AddBuilding,
    AddInstitution,
    AddRoom,
  },
})
export default class AddLocation extends Vue {
  private selectedLocation: String = "";
  private locationOptions: Array<String> = new Array<String>(
    "stad",
    "address",
    "instituut",
    "gebouw",
    "ruimte"
  );

  selectedLocationChange(input: string): void {
    this.selectedLocation = input;
  }
}
</script>
<style lang="scss" scoped>
@import "@/styling/main.scss";

#InputField {
  display: flex;
  flex-direction: column;
  box-shadow: $shadow;
  border-radius: $border-radius;
}

#LocationField {
  display: flex;
  flex-direction: column;
  align-content: center;

  box-shadow: $shadow;
  border-radius: $border-radius;
}

.container-header {
  margin-bottom: 2em;
}
.component-container {
  justify-content: flex-start;
}

.page-wrapper {
  padding-top: 2em;
  min-height: 80vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  column-gap: 1em;
}
</style>
