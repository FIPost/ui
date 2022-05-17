<template>
    <table class="table table-striped border rounded-3">
        <caption class="d-none">locations in system</caption>
        <thead>
            <tr>
                <th>Stad</th>
                <th>Gebouw</th>
                <th>Ruimte</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>{{item.building.address.city.name}}</td>
                <td>{{item.building.name}}, {{item.building.address.street}}, {{item.building.address.number}}</td>
                <td>{{item.name}}</td>
                <td><font-awesome-icon icon="pen-square" /></td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import Room from "@/location/Room";

    @Options({
    })
    export default class LocationTable extends Vue {
        @Prop() items!: Array<Room>;
    }
</script>

<style lang="scss" scoped>
</style>