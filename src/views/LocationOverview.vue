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
                <input type="search" class="form-control" placeholder="Zoeken..." />
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
                <LocationTable class="col-10" :items="locations" />
            </section>
        </section>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import BtnBack from "@/components/standardUi/BtnBack.vue";
    import LocationTable from "@/location/components/LocationTable.vue";
    import SearchContainerLocation from "@/components/SearchContainerLocation.vue";
    import { roomService } from "../location/depricated/roomservice";
    import { Location } from "@/location/Location";
    import LoadingIcon from '@/components/standardUi/LoadingIcon.vue'
    import LocationInfo from "@/components/location/LocationInfo.vue";
    import LocationModal from "@/components/location/LocationModal.vue";
    import { getCurrentInstance } from "@vue/runtime-core";
    import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";

    @Options({
        components: {
            BtnBack,
            LocationTable,
            SearchContainerLocation,
            LoadingIcon,
            Pagination,
            LocationInfo,
            LocationModal,
        },
    })
    export default class LocatieOverzicht extends Vue {
        private emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter;
        private locationRepo = getCurrentInstance()?.appContext.config.globalProperties.$locationRepo;
        private isLoaded: boolean = false;

        private allLocations: Array<Location> = [];
        private locations: Array<Location> = [];

        private visibleItemsPerPageCount = 10;
        private pageCount = 0;

        loadPage(value: number): void {
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.locations = this.allLocations.slice(
                pageIndex,
                pageIndex + this.visibleItemsPerPageCount
            );
        }

        goToRegisterLocation(): void {
            this.$router.push("/locaties/nieuw");
        }

        async beforeMount() {
            this.locationRepo
                .GetAllLocations()
                .then((res) => {
                    this.locations = res;
                    console.log(this.locations);
                    this.isLoaded = true;
                });
        }
    }
</script>

<style scoped lang="scss">
</style>