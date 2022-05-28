<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="/#/overzicht">Packages</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{packageID}}</li>
            </ol>
        </nav>

        <header>
            <h1>Pakket: {{packageID}}</h1>
        </header>

        <nav class="row border rounded-3 p-2 mb-2 bg-light">
            <div class="d-flex flex-row-reverse">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" href="">Actions</button>
                <ul class="dropdown-menu">
                    <li><button type="button" class="dopdown-item">Print QR</button></li>
                </ul>
            </div>
        </nav>

        <LoadingIcon v-if="isLoading" />
        <div class="page" v-else>
            <div class="pi-item-container">
                <!--<CreateTicket @new-ticket="reloadPage" :fPackage="pkg" />-->
                <!--<RoutePackageInfo :tickets="pkg.tickets" />-->
            </div>
            <div class="pi-item-container">
                <!--<PrintQR :packageId="pkg.id" />-->
                <!--<PackageDetails :pkg="pkg" />-->
            </div>
        </div>

        <div v-if="pkg" class="row">
            <ul class="list-group">
                <li class="list-group-item">Ontvanger: {{pkg.receiverId}}</li>
                <li class="list-group-item">Afhaalpunt: {{pkg.collectionPointId}}</li>
                <li class="list-group-item">Zender: {{pkg.sender}}</li>
                <li class="list-group-item">Naam: {{pkg.name}}</li>
                <li class="list-group-item">Status: {{pkg.status}}</li>
                <li class="list-group-item">Afgeleverd: {{pkg.routeFinished}}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import { getCurrentInstance } from "vue";

    import { Package } from "@/package/Package";

    import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";
    import PackageDetails from "@/package/components/PackageDetails.vue";
    import PrintQR from "@/components/PrintQR.vue";
    import RoutePackageInfo from "@/components/route/RoutePackageInfo.vue";
    import CreateTicket from "@/components/route/CreateTicket.vue";

    @Options({
        components: {
            PackageDetails,
            PrintQR,
            RoutePackageInfo,
            CreateTicket,
            LoadingIcon,
        },
    })
    export default class PackagePage extends Vue {
        private packageID: string = "empty";
        private packageRepo = getCurrentInstance()?.appContext.config.globalProperties.$packageRepo;

        private pkg?: Package;

        private isLoading: Boolean = true;

        async reloadPage() {
            this.isLoading = true;
            await this.getPackage();
        }

        async beforeMount() {
            this.packageID = this.$router.currentRoute.value.params.id.toString();
            this.getPackage();
        }

        async getPackage() {
            this.packageRepo
                .GetPackageByID(this.packageID)
                .then((res) => {
                    this.pkg = res;
                    this.isLoading = false;
                });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>