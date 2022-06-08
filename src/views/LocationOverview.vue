<template>
    <div class="container">
        <nav class="row" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Locations</li>
            </ol>
        </nav>

        <header class="row">
            <h1>Locatie overzicht</h1>
        </header>
        
        <form class="row border rounded-3 p-2 mb-2 bg-light">
            <label class="col-1 col-form-label">Zoek</label>
            <div class="col-auto me-auto">
                <input type="search" class="form-control" placeholder="Zoeken..." v-model="filter" />
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" @click="goToRegisterLocation">
                    <font-awesome-icon icon="plus-square" class="me-1" />
                    Toevoegen
                </button>
            </div>
        </form>

        <section class="row gap-2">
            <aside class="d-none col-2 border rounded-3">
                Filters
            </aside>
            <section class="col border rounded-3 p-0 pt-2">
                <LocationTable class="col-10" :items="visibleLocations" />
            </section>
        </section>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component"
    import { Watch } from "vue-property-decorator"
    import { getCurrentInstance } from "@vue/runtime-core"
    import { AxiosError } from "axios"
    
    // Models
    import { Location } from "@/location/Location"

    // Components
    import LoadingIcon from '@/components/standardUi/LoadingIcon.vue'
    import LocationTable from "@/location/components/LocationTable.vue"
    import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";

    @Options({
        components: {
            LocationTable,
            LoadingIcon,
            Pagination,
        },
    })
    export default class LocatieOverzicht extends Vue {
        private locationRepo = getCurrentInstance()?.appContext.config.globalProperties.$locationRepo;
        private emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter;
        private isLoaded: boolean = false;

        private locations: Array<Location> = [];

        private filter: string = "";
        private filteredLocations: Array<Location> = [];

        private currentPage: number = 1;
        private pageCount: number = 0;
        private visibleItemsPerPageCount: number = 10;
        private visibleLocations: Array<Location> = [];

        async beforeMount() {
            await this.GetLocations()
                .then(res => {
                    this.filteredLocations = this.locations;
                    this.loadPage(this.currentPage);
                    this.isLoaded = true;
                });
        }

        private async GetLocations(){
            await this.locationRepo.GetAllLocations()
                .then((res: Array<Location>) => this.locations = res)
                .catch((err: AxiosError) => console.error(err.message));
        }

        private loadPage(value: number): void {
            this.pageCount = Math.ceil(this.filteredLocations.length / this.visibleItemsPerPageCount);
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.visibleLocations = this.filteredLocations.slice(
                pageIndex,
                pageIndex + this.visibleItemsPerPageCount
            );
        }

        @Watch('filter') 
        private filterItems(filter: string): void {
            if(filter.length < 1) {
                this.filteredLocations = this.locations;
            }
            else {
                this.filteredLocations = this.locations.filter((item) => {
                    return item.name.includes(filter); 
                });
            }

            this.loadPage(this.currentPage);
        }

        private goToRegisterLocation(): void {
            this.$router.push("/locaties/nieuw");
        }
    }
</script>

<style scoped lang="scss">
</style>