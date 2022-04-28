<template>
    <div id="overzicht">
        <btn-back />
        <h1>Pakketoverzicht</h1>
        <SearchContainer />
        <LoadingIcon v-if="!isLoaded" />
        <div v-else>
            <PackageTable :items="packages" />
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

    import { pakketService } from "@/package/pakketservice";
   
    import { Package } from "@/package/Package";
    import Ticket from "@/package/Ticket";

    import SearchContainer from "@/components/SearchContainer.vue";
    import BtnBack from "@/components/standardUi/BtnBack.vue";
    import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
    import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";
    import PackageTable from "@/package/components/PackageTable.vue"

    @Options({
        components: {
            SearchContainer,
            BtnBack,
            LoadingIcon,
            Pagination,
            PackageTable,
        },
    })
    export default class PakketOverzicht extends Vue {
        private emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter;
        private isLoaded: boolean = false;

        private allPackages: Array<Package> = [];
        private packages: Array<Package> = [];

        private pageCount = 0;
        private visibleItemsPerPageCount = 20;

        async beforeMount() {
            this.GetPackages();
        }

        private async GetPackages() {
            pakketService
                .getAll()
                .then((res: Package[]) => {
                    this.allPackages = res;
                    this.pageCount = Math.ceil(this.allPackages.length / this.visibleItemsPerPageCount);
                    this.loadPage(1);
                    this.isLoaded = true;
                })
                .catch((err: AxiosError) => {
                    this.emitter.emit("err", err);
                });
        }

        public loadPage(value: number): void {
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.packages = this.allPackages.slice(pageIndex, pageIndex + this.visibleItemsPerPageCount);
        }
    }
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";
</style>
