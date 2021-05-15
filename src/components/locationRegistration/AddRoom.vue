<template>
  <div>
    <div class="wrapper">
      <LoadingIcon v-if="loading" />
      <div v-else>
        <div class="container-subheader">{{ title }}</div>
        <CBSearchSuggestion
          @selectChanged="assignBuildingToRoom"
          :options="buildings"
          :selectedOption="selectedBuildingOption"
          label="Gebouw:"
          :valid="buildingValid"
        />
        <InputField
          label="Ruimte:"
          v-model:input="room.Name"
          :valid="nameValid"
          @update:input="nameChanged"
        />
        <h4 class="error-text" v-if="error.length > 0">
          {{ error }}
        </h4>
        <SmallBtnFinish
          v-if="roomId"
          text="Delete"
          :red="true"
          @click="deleteLocation()"
        />
        <SmallBtnFinish text="Bevestigen" v-on:click="addRoom" />
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
import RoomRequest from "@/classes/requests/RoomRequest";
import CBSearchSuggestion from "@/components/standardUi/CBSearchSuggestions.vue";
import { roomService } from "@/services/locatieService/roomservice";
import Building from "@/classes/Building";
import { buildingService } from "@/services/locatieService/buildingservice";
import LinkOrStayModal from "@/components/standardUi/LinkOrStayModal.vue";
import { getCurrentInstance } from "@vue/runtime-core";
import SelectOption from "@/classes/helpers/SelectOption";
import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
import { AxiosError } from "axios";

@Options({
  components: {
    CBSearchSuggestion,
    InputField,
    SmallBtnFinish,
    LinkOrStayModal,
    LoadingIcon,
  },
  emits: ["location-changed"],
})
export default class AddRoom extends Vue {
  @Prop()
  private roomId: string = "";

  @Prop()
  private title: string = "Voeg een nieuwe ruimte toe";

  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;
  private loading: boolean = true;
  private showModal: boolean = false;
  private buildings: Array<SelectOption> = new Array<SelectOption>();
  private allBuildings: Array<Building> = new Array<Building>();
  private selectedBuildingOption: SelectOption = new SelectOption("", "");

  private room: RoomRequest = new RoomRequest("", "");
  private nameValid: boolean = true;
  private buildingValid: boolean = true;
  private error: string = "";

  assignBuildingToRoom(option: SelectOption): void {
    this.room.BuildingId = option.id;
  }

  async addRoom() {
    if (this.validate()) {
      if (this.roomId) {
        roomService.update(this.room, this.roomId).then(() => {
          this.$emit("location-changed");
        })
        .catch((err: AxiosError) => {
          this.error = err.response?.data;
        });
      } else {
        roomService
          .post(this.room)
          .then(() => {
            this.showModal = true;
            this.room.Name = "";
          })
          .catch((err: AxiosError) => {
            this.emitter.emit("err", err);
          });
      }
    }
  }

  deleteLocation() {
    if (confirm("Weet je zeker dat je deze locatie wilt verwijderen?")) {
      roomService
        .delete(this.roomId)
        .then(() => {
          this.$emit("location-changed");
        })
        .catch((err: AxiosError) => {
          this.emitter.emit("err", err);
        });
    }
  }

  private validate(): boolean {
    this.nameValid = this.room.Name.length > 0;
    this.buildingValid =
      this.allBuildings.find(
        (building) => building.id == this.room.BuildingId
      ) != null;

    if (!this.nameValid) {
      this.error = "Niet alle velden zijn ingevoerd";
      return false;
    }

    if (!this.buildingValid) {
      this.error = "dit gebouw bestaat niet";
      return false;
    }
    this.error = "";
    return true;
  }

  nameChanged(input: string): void {
    this.nameValid = this.room.Name.length > 0;
    this.error = "";
  }

  async mounted() {
    if (this.roomId) {
      roomService.getById(this.roomId).then((res) => {
        this.room.Name = res.name;
        this.room.BuildingId = res.building.id;
        this.selectedBuildingOption = new SelectOption(
          res.building.id,
          res.building.address.city.name + ", " + res.building.name
        );
      });
    }

    buildingService
      .getAll()
      .then((res) => {
        this.allBuildings = res;
        this.allBuildings.forEach((building) =>
          this.buildings.push(
            new SelectOption(
              building.id,
              building.address.city.name + ", " + building.name
            )
          )
        );
        this.loading = false;
      })
      .catch((err: AxiosError) => {
        this.emitter.emit("err", err);
        this.loading = false;
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