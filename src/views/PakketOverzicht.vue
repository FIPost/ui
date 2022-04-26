<template>
    <div id="overzicht">
        <btn-back />
        <h1>Pakketoverzicht</h1>
        <SearchContainer />
        <LoadingIcon v-if="loading" />
        <div v-else>
            <TableComp :items="items" @cell-clicked="CellClicked" />
            <Pagination v-if="allPackages.length > visibleItemsPerPageCount"
                        :page-count="pageCount"
                        :visible-items-per-page-count="visibleItemsPerPageCount"
                        :visible-pages-count="Math.min(pageCount, 5)"
                        @loadPage="loadPage"
                        @nextPage="loadPage('next')"
                        @previousPage="loadPage('previous')" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import { getCurrentInstance } from "@vue/runtime-core";
    import { AxiosError } from "axios";

    import { pakketService } from "@/services/pakketService/pakketservice";
   
    import { Package } from "@/classes/Package";
    import Ticket from "@/classes/Ticket";
    import { ColumnType } from "@/classes/table/ColumnType";
    import { TableCell } from "@/classes/table/TableCell";

    import SearchContainer from "@/components/SearchContainer.vue";
    import BtnBack from "@/components/standardUi/BtnBack.vue";
    import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
    import TableComp from "@/components/standardUi/TableComponent.vue";
    import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";

    @Options({
        components: {
            TableComp,
            SearchContainer,
            BtnBack,
            LoadingIcon,
            Pagination,
        },
    })
    export default class PakketOverzicht extends Vue {
        private emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter;
        private loading: boolean = true;

        private allPackages: Package[] = [];
        private packages: Package[] = [];
        private items: Array<Object> = new Array<Object>();

        private pageCount = 0;
        private visibleItemsPerPageCount = 20;

        async beforeMount() {
            await this.GetPackages();
            console.log(this.allPackages);
        }

        private async GetPackages() {
            await pakketService
                .getAll()
                .then((res: Package[]) => {
                    this.allPackages = res;
                    this.pageCount = Math.ceil(this.allPackages.length / this.visibleItemsPerPageCount);
                    this.loadPage(1);
                    this.loading = false;
                })
                .catch((err: AxiosError) => {
                    this.emitter.emit("err", err);
                    this.loading = false;
                });
        }

        public CellClicked(cell: TableCell): void {
            if (cell) this.$router.push({ name: "PackagePage", params: { id: cell.id }, });
        }

        //Format objects to display in the table
        public GenerateTableObjects(packages: Package[]): void {
            this.items = new Array<Object>();

            try {
                for (var i = 0; i < packages.length; ++i) {
                    this.items.push(this.CreateTableRowFromPackage(packages[i] as Package));
                }
                //packages.forEach((pkg: Package) => {});
            } catch (err) {
                console.log(err);
            }

        }

        private CreateTableRowFromPackage(pkg: Package): Object {
            var name = pkg.name;
            var receiver = (pkg as Package).getReceiver();
            var status = pkg.routeFinished ? "Afgeleverd" : "In behandeling";
            var targetLocation = pkg.collectionPointId ? pkg.collectionPointId : "Kon niet gevonden worden";

            var firstTicket: Ticket = new Ticket();
            if (pkg.tickets) firstTicket.deserialize(pkg.tickets[0]);

            var currentLocation = firstTicket ? firstTicket.locationId : "Kon niet worden opgehaald";
            var lastChange = firstTicket ? firstTicket.getDateString() : "Geen datum";
            var executedByPerson = firstTicket ? firstTicket.completedByPersonId : "Kon niet gevonden worden";

            return {
                Naam: { id: pkg.id, type: ColumnType.NAME, displayName: name, },
                Ontvanger: { id: pkg.id, type: ColumnType.PERSON, displayName: receiver },
                Status: { id: pkg.id, type: ColumnType.STATUS, displayName: status, },
                "Huidige locatie": { id: pkg.id, type: ColumnType.LOCATION, displayName: currentLocation, },
                "Laatste verandering": { id: pkg.id, type: ColumnType.DATE, displayName: lastChange, },
                "Uitgevoerd door": { id: pkg.id, type: ColumnType.PERSON, displayName: executedByPerson, },
                Eindlocatie: { id: pkg.id, type: ColumnType.LOCATION, displayName: targetLocation, },
            };
        }

        public loadPage(value: number): void {
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.packages = this.allPackages.slice(pageIndex, pageIndex + this.visibleItemsPerPageCount);
            this.GenerateTableObjects(this.packages);
        }
    }
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";
</style>
