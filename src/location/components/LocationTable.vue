<template>
  <table class="table table-striped">
    <caption class="d-none">
      locations in system
    </caption>
    <thead>
      <tr>
        <th>Ruimte</th>
        <th>Stad</th>
        <th>Gebouw</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.street }}, {{ item.house }}</td>
        <td><font-awesome-icon icon="pen-square" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Location } from "@/location/Location";

@Options({})
export default class LocationTable extends Vue {
  @Prop() items!: Array<Location>;
}
</script>

<style lang="scss" scoped>
</style>