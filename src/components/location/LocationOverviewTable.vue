<template>
  <div class="component-container" style="padding: 0 !important">
    <Table :columns="columns" :items="rooms" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@/components/location/LocationTable.vue";
import Room from "@/classes/Room";
import { roomService } from "@/services/locatieService/roomservice";
import { getCurrentInstance } from "@vue/runtime-core";

@Options({
  components: {
    Table,
  },
})
export default class LocationOverviewTable extends Vue {
  //IMPORTANT! for sorting to work table headers need to have the same name as the objects properties
  private columns: String[] = ["Stad", "Gebouw", "Ruimte"];
  private rooms: Array<Room> = new Array<Room>();
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  async mounted() {
    roomService
      .getAll()
      .then((res) => {
        this.rooms = res;
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";
</style>