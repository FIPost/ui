<template>
    <AddCity v-if="locationType == 0"/>
    <AddBuilding v-if="locationType == 1"/>
    <AddRoom  v-if="locationType == 2"/>
    <span>asdfasdf {{ locationType }}</span>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AddCity from "@/components/locationRegistration/AddCity.vue";
import { Emit, Prop } from "vue-property-decorator";
import { LocationType } from "@/classes/LocationType";
import AddBuilding from "@/components/locationRegistration/AddBuilding.vue";
import AddRoom from "@/components/locationRegistration/AddRoom.vue";

function EnumProp(d: string | number, e: Record<any, any>) {
  // <- Record is changed
  return {
    default: d,
    validator: (v) => e[v] !== undefined,
  };
}

@Options({
  components: {
    AddCity,
    AddBuilding,
    AddRoom
  },
})
export default class LocationInfo extends Vue {

  @Prop(EnumProp(LocationType.CITY, LocationType))
  locationType!: LocationType;
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";
</style>