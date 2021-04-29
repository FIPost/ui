<template>
    <div class="component-container" style="padding: 0 !important;">
        <Table :items="items"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from '@/components/location/Table.vue'
import Room from '@/classes/Room'
import { roomService } from '@/services/locatieService/roomservice';

export default defineComponent ({
  components: {
    Table,
  },

  data(){
    return {items: Array<Object>(), rooms: Array<Room>()};
  },

  beforeMount(){
     this.GetRooms();
  },

  methods:{
    async GetRooms(){
      this.rooms = await roomService.getAll();
      this.GenerateTableObjects(this.rooms);
    },

    //Format objects to display in the table
    GenerateTableObjects(rooms: Room[]){
      rooms.forEach(value => {
        this.items.push({
          Stad: value.building.address.city.name,
          Gebouw: value.building.name,
          Ruimte: value.name
        });
      });
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

</style>