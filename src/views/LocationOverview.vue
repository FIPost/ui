<template>
    <div>
        <btn-back />
        <h1>Locatie Overzicht</h1>
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
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import BtnBack from "@/components/standardUi/BtnBack.vue";
    import LocationTable from "@/components/tables/LocationTable.vue";
    import SearchContainerLocation from "@/components/SearchContainerLocation.vue";
    import { roomService } from "../services/locatieService/roomservice";
    import Room from "@/classes/Room";
    import LoadingIcon from '@/components/standardUi/LoadingIcon.vue'
    import LocationInfo from "@/components/location/LocationInfo.vue";
    import LocationModal from "@/components/location/LocationModal.vue";
    import { getCurrentInstance } from "@vue/runtime-core";
    import { AxiosError } from "axios";
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

        public loadPage(value: number) {
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.rooms = this.allRooms.slice(
                pageIndex,
                pageIndex + this.visibleItemsPerPageCount
            );
        }

        async beforeMount() {
            roomService.getAll()
                .then((res) => {
                    this.rooms = res;
                    console.log(this.rooms);
                    this.isLoaded = true;
                });
        }
    }
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";
</style>