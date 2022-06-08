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
                <input type="search" class="form-control" placeholder="Zoeken..." v-model="filter" />
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success" @click="goToRegisterPackage">
                    <font-awesome-icon icon="plus-square" class="me-1" />
                    Toevoegen
                </button>
            </div>
        </form>

        <LoadingIcon v-if="!isLoaded" />
        <div v-else class="row">
            <section class="col border rounded-3 p-0 pt-2">
                <PackageTable :items="visiblePackages" />
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

    import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
    import Pagination from "@/components/standardUi/Pagination/BasePagination.vue";
    import PackageTable from "@/package/components/PackageTable.vue"
import { Watch } from "vue-property-decorator";

    @Options({
        components: {
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

        private filter: string = "";
        private filteredPackages: Array<Package> = [];

        private currentPage: number = 1;
        private pageCount: number = 0;
        private visibleItemsPerPageCount: number = 20;
        private visiblePackages: Array<Package> = [];

        async beforeMount() {
            await this.GetPackages()
                .then(res =>{
                    this.filteredPackages = this.packages;
                    this.loadPage(1);
                    this.isLoaded = true;
                });
        }

        private async GetPackages() {
            await this.packageRepo.GetAllPackages()
                .then((res: Array<Package>) => this.packages = res)
                .catch((err: AxiosError) => this.emitter.emit("err", err));
        }

        public loadPage(value: number): void {
            this.pageCount = Math.ceil(this.filterItems.length / this.visibleItemsPerPageCount);
            const pageIndex = (value - 1) * this.visibleItemsPerPageCount;
            this.visiblePackages = this.filteredPackages.slice(
                pageIndex,
                pageIndex + this.visibleItemsPerPageCount
            );
        }

        @Watch('filter')
        public filterItems(filter: string){
            if(filter.length < 1) {
                this.filteredPackages = this.packages;
            }
            else {
                this.filteredPackages = this.packages.filter((item) => {
                    return item.name.includes(filter); 
                })
            }

            this.loadPage(this.currentPage);
        }

        private goToRegisterPackage(): void{
            this.$router.push("/registratie");
        }
    }
</script>

<style scoped lang="scss">
</style>
