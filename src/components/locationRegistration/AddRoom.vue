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
import InputField from "@/components/standardUi/InputField.vue";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import RoomRequest from "@/classes/requests/RoomRequest";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";
import { roomService } from "@/services/locatieService/roomservice"

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
  private room: RoomRequest = new RoomRequest("", "");

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
      await roomService.post(this.room);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

.wrapper {
  margin-top: 1em;
}
</style>