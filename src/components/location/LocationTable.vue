<!--
    Table adapted from: https://vuejs.org/v2/examples/grid-component.html
    IMPORTANT! for sorting to work table headers need to have the same name as the objects properties
-->

<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.building.address.city.name }}</td>
        <td>{{ item.building.name }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </table>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Room from "@/classes/Room";

@Options({
  props: {
    items: Array,
    columns: String[0],
  },
})
export default class LocationTable extends Vue {
  //IMPORTANT! for sorting to work table headers need to have the same name as the objects properties
  private items!: Array<Room>;

}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

thead tr {
  box-shadow: $shadow;
}

th {
  cursor: pointer;
  color: $black-color;
  text-decoration: none;
}

table td,
th {
  padding: 0.75em !important;
}

td:first-child {
  font-weight: bold;
}

.active {
  text-decoration: underline;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid $black-color;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid $black-color;
}
</style>