<template>
    <div class="card">
        <table class="table table-striped">
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
                <tr class="clickable" v-for="item in items" :key="item.id" @click="onRowClicked(item.id)">
                    <td>{{item.name}}</td>
                    <td><ReceiverProxy :id="item.receiverId" /></td>
                    <td><span class="badge" :class="item.routeFinished ? 'bg-success' : 'bg-warning text-dark'">{{item.getStatus()}}</span></td>
                    <td>{{convertDate(item.getLastTicket().finishedAt)}}</td>
                    <td><ReceiverProxy :id="item.getLastTicket().completedByPersonId" /></td>
                    <td><LocationProxy :id="item.getLastTicket().locationId" /></td>
                    <td><LocationProxy :id="item.collectionPointId" /></td>
                </tr>
            </tbody>
        </table>
    </div>
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
    @import "@/styling/main.scss";
    
    .badge {
        padding: .35em .65em;
        border-radius: 5px;

        color: white;

        font-size: .75em;
        font-weight: bold;
        text-align: center;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
    }

    .bg-primary {
        background-color: blue;
    }

    .bg-secondary {
        background-color: dimgrey;
    }

    .bg-warning {
        background-color: orange;
    }

    .bg-success {
        background-color: green;
    }

    .text-dark {
        color: black;
    }

    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        background-color: ghostwhite !important;
    }
</style>