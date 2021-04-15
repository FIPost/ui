<template>
  <div class="wrapper">
    <div class="container-subheader">Voeg een ruimte toe</div>
    <ComboBoxInput
      @selectChange="assignBuildingToRoom"
      :options="buildings"
      placeholder="Selecteer een gebouw"
      label="Gebouw:"
    />
    <InputField
      @inputChanged="assignNameToRoom"
      label="Ruimte:"
      :input="room.Name"
    />
    <BtnFinish text="Bevestigen" v-on:click="addRoom" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Building from "@/classes/Building";
import Room from "@/classes/Room";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";
import { locatieService } from "@/services/locatieservice";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    BtnFinish,
  },
})
export default class AddRoom extends Vue {
  private buildings: Array<String> = new Array<String>(
    "P1 Tilburg",
    "P2 Tilburg"
  );
  private mockBuilding: Building = new Building("bla", "kazhad dum", "ababab");
  private room: Room = new Room("", "", "");

  async created() {
    //backend call for buildings//
    //        let result = await locatieService.getAllBuildings();
    //      this.buildings = result;
  }

  assignNameToRoom(input: string): void {
    this.room.Name = input;
  }
  assignBuildingToRoom(input: string): void {
    this.room.BuildingId = input;
  }

  async addRoom() {
    let result = await locatieService.postRoom(this.room);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>