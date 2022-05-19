<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Locations</li>
            </ol>
        </nav>
        
        <header>
            <h1>Locatie Overzicht</h1>
        </header>

        <main class="container">
            <nav class="row mb-2">
                <form class="border rounded-3 p-2">
                    <section class="row">
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
                    </section>
                </form>
            </nav>

            <section class="row">
                <aside class="col-2 border rounded-3">
                    Filters
                </aside>
                <section class="col-10">
                    <LocationTable class="col-10" :items="rooms" />
                </section>
            </section>
        </main>

        <div class="d-none">
            <SearchContainerLocation />
            <LoadingIcon v-if="!isLoaded" />
            <div v-else>
                <LocationTable :items="rooms" />
                <Pagination v-if="allRooms.length > visibleItemsPerPageCount"
                            :page-count="pageCount"
                            :visible-items-per-page-count="visibleItemsPerPageCount"
                            :visible-pages-count="Math.min(pageCount, 5)"
                            @nextPage="loadPage('next')"
                            @previousPage="loadPage('previous')"
                            @loadPage="loadPage" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import BtnBack from "@/components/standardUi/BtnBack.vue";
    import LocationTable from "@/location/components/LocationTable.vue";
    import SearchContainerLocation from "@/components/SearchContainerLocation.vue";
    import { roomService } from "../location/roomservice";
    import Room from "@/location/Room";
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
        private isLoaded: boolean = false;

        private allRooms: Array<Room> = [];
        private rooms: Array<Room> = [];

        private visibleItemsPerPageCount = 10;
        private pageCount = 0;

        loadPage(value: number): void {
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.rooms = this.allRooms.slice(
                pageIndex,
                pageIndex + this.visibleItemsPerPageCount
            );
        }

        goToRegisterLocation(): void {
            this.$router.push("/locaties/nieuw");
        }

        async beforeMount() {
            this.rooms = getCurrentInstance()?.appContext.config.globalProperties.$repo.getAllRooms();
            //roomService.getAll()
            //    .then((res) => {
            //        this.rooms = res;
            //        console.log(this.rooms);
            //        this.isLoaded = true;
            //    });
        }
    }
</script>

<style scoped lang="scss">
    
</style>