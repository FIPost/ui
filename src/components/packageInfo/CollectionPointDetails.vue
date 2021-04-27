<template>
  <div class="cpd-container">
    <div v-if="room">
      <div class="container-subheader">
        {{ title }}:
        <a href=""
          >{{ room.building.address.city.name }} {{ room.building.name }}
          {{ room.name }}</a
        >
      </div>
      <div class="cpd-item">
        {{ room.building.address.street }} {{ room.building.address.number }}
        {{ room.building.address.addition }}
      </div>
      <div class="cpd-item">{{ room.building.address.postalCode }}</div>
    </div>
    <div v-else>
      <div class="container-subheader">
        {{ title }}
      </div>
      <div class="cpd-item">
        Deze locatie kon niet worden opgehaald
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Room from "@/classes/Room";

@Options({
  props: {
    room: Object,
    title: String,
  },
})
export default class CollectionPointDetails extends Vue {
  public room!: Room;
}
</script>



<style scoped lang="scss">
@import "@/styling/main.scss";

.cpd-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.5em;
}

.cpd-item {
  width: 50%;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
}
</style>