<template>
    <div class="container">
        <nav class="row" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Packages</li>
            </ol>
        </nav>

        <header class="row">
            <h1>Pakket overzicht</h1>
        </header>

        <form class="row border rounded-3 p-2 mb-2 bg-light">
            <label class="col-1 col-form-label">Zoek</label>
            <div class="col-auto me-auto">
                <input type="search" class="form-control" placeholder="Zoeken..." @input="e => filterItems(e.target.value)" />
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" @click="goToRegisterLocation">
                    <font-awesome-icon icon="plus-square" class="me-1" />
                    Toevoegen
                </button>
            </div>
        </form>

        <LoadingIcon v-if="!isLoaded" />
        <div v-else class="row">
            <section class="col border rounded-3 p-0 pt-2">
                <PackageTable :items="filteredPackages" />
                <Pagination v-if="packages.length > visibleItemsPerPageCount"
                            :page-count="pageCount"
                            :visible-items-per-page-count="visibleItemsPerPageCount"
                            :visible-pages-count="Math.min(pageCount, 5)"
                            @loadPage="loadPage"
                            @nextPage="loadPage('next')"
                            @previousPage="loadPage('previous')" />
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import { getCurrentInstance } from "@vue/runtime-core";
    import { AxiosError } from "axios";

    import { Package } from "@/package/Package";

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
        private packageRepo = getCurrentInstance()?.appContext.config.globalProperties.$packageRepo;
        private emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter;
        private isLoaded: boolean = false;

        private packages: Array<Package> = [];
        private filteredPackages: Array<Package> = [];

        private pageCount = 0;
        private visibleItemsPerPageCount = 20;

        async beforeMount() {
            this.GetPackages()
                .then(res =>{
                    this.loadPage(1);
                    this.isLoaded = true;
                });
        }

        private async GetPackages() {
            await this.packageRepo
                .GetAllPackages()
                .then((res: Array<Package>) => {
                    this.packages = res;
                })
                .catch((err: AxiosError) => {
                    this.emitter.emit("err", err);
                });
        }

        public loadPage(value: number): void {
            this.pageCount = Math.ceil(this.packages.length / this.visibleItemsPerPageCount);
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.filteredPackages = this.packages.slice(pageIndex, pageIndex + this.visibleItemsPerPageCount);
        }

        public filterItems(filter: string){
            console.log(filter);
            if(filter.length < 1) this.filteredPackages = this.packages;
            this.filteredPackages = this.packages.filter((item) => {
                return item.id.includes(filter) ||
                item.name.includes(filter); 
            })
        }
    }
</script>

<style scoped lang="scss">
</style>
