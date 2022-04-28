<template>
    <div>
        <btn-back />
        <LoadingIcon v-if="isLoading" />
        <div class="page" v-else>
            <div class="pi-item-container">
                <CreateTicket @new-ticket="reloadPage" :fPackage="pkg" />
                <RoutePackageInfo :tickets="pkg.tickets" />
            </div>
            <div class="pi-item-container">
                <PrintQR :packageId="pkg.id" />
                <PackageDetails :pkg="pkg" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import PackageDetails from "@/package/components/PackageDetails.vue";
    import PrintQR from "@/components/PrintQR.vue";
    import RoutePackageInfo from "@/components/route/RoutePackageInfo.vue";
    import CreateTicket from "@/components/route/CreateTicket.vue";
    import BtnBack from "@/components/standardUi/BtnBack.vue";
    import { Package } from "@/package/Package";
    import { AxiosError } from "axios";
    import { pakketService } from "@/package/pakketservice";
    import LoadingIcon from "@/components/standardUi/LoadingIcon.vue";

    @Options({
        components: {
            PackageDetails,
            PrintQR,
            RoutePackageInfo,
            CreateTicket,
            BtnBack,
            LoadingIcon,
        },
    })
    export default class PackagePage extends Vue {
        private pkg?: Package;

        private isLoading: Boolean = true;

        async reloadPage() {
            this.isLoading = true;
            await this.getPackage();
        }

        async beforeMount() {
            this.getPackage();
        }

        async getPackage() {
            pakketService
                .get(this.$router.currentRoute.value.params.id.toString())
                .then((res) => {
                    this.pkg = res;
                    this.isLoading = false;
                })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "@/styling/main.scss";

    .page {
        display: flex;
        flex-wrap: wrap;
        column-gap: 1em;

        .pi-item-container {
            width: 48%;
            display: flex;
            flex-direction: column;
            row-gap: 15px;
        }

        @media only screen and (max-width: 865px) {
            flex-direction: column;
            row-gap: 15px;

            .pi-item-container {
                width: 90%;
            }
        }
    }
</style>