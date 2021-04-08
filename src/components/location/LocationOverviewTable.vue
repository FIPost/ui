<template>
    <div class="component-container" style="padding: 0 !important;">
        <Table :columns="columns" :items="items"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Table from '@/components/location/Table.vue'
import locationservice from '@/services/locationservice'
import Location from '@/classes/Location'

@Options({
    components: {
            Table,
        },
})
export default class LocationOverviewTable extends Vue {
    //IMPORTANT! for sorting to work table headers need to have the same name as the objects properties 
    private columns: String[] = ["Id", "Name", "Description"];
    private items: Array<Location> = [
        new Location(1, "name2", "desc3"),
        new Location(2, "name3", "desc1"),
        new Location(3, "name1", "desc2")
    ];

    async created(){
        //let result = await locationservice.getAll();
        //this.items = result;
    }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

</style>