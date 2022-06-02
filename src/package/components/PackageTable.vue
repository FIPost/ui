<template>
    <table class="table table-striped">
        <caption class="d-none">packages in system</caption>
        <thead>
            <tr>
                <th>Naam</th>
                <th>Ontvanger</th>
                <th>Status</th>
                <th>Laatste verandering</th>
                <th>Uitgevoerd door</th>
                <th>Huidige locatie</th>
                <th>Eind locatie</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id" @click="onRowClicked(item.id)" style="cursor:pointer;">
                <td>{{item.name}}</td>
                <td><ReceiverProxy :id="item.receiverId" /></td>
                <td><span class="badge" :class="item.routeFinished ? 'bg-success' : 'bg-warning text-dark'">{{item.getStatus()}}</span></td>
                <td>
                    <span v-if="item.getLastTicket()">{{convertDate(item.getLastTicket().finishedAt)}}</span>
                    <span v-else>No Ticket</span>
                </td>
                <td>
                    <ReceiverProxy v-if="item.getLastTicket()" :id="item.getLastTicket().completedByPersonId" />
                    <span v-else>No Ticket</span>
                </td>
                <td>
                    <LocationProxy v-if="item.getLastTicket()" :id="item.getLastTicket().locationId" />
                    <span v-else>No Ticket</span>
                </td>
                <td><LocationProxy :id="item.collectionPointId" /></td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
    import { Vue, Options } from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'
    import { Package } from '@/package/Package'
    import ReceiverProxy from '@/employee/components/ReceiverProxy.vue'
    import LocationProxy from '@/location/components/LocationProxy.vue'

    @Options({
        components: {
            ReceiverProxy,
            LocationProxy,
        }
    })
    export default class PackageTable extends Vue {
        @Prop() items!: Array<Package>;

        onRowClicked(id: string) {
            this.$router.push({ name: "PackagePage", params: { id: id } });
        }

        convertDate(value: number): string {
            return new Date(value * 1000).toLocaleDateString();
        }

    }
</script>

<style scoped lang="scss">
    
</style>