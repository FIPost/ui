<template>
  <div>
    <btn-back />
    <LoadingIcon v-if="isLoading" />
    <div class="page" v-else>
      <div class="pi-item-container">
        <CreateTicket @new-ticket="reloadTickets" :key="ticketKey" />
        <RoutePackageInfo :key="ticketKey" :tickets="tickets" />
      </div>
      <div class="pi-item-container">
        <PrintQR :code="packageId" :addresscode="'Professor Goossenslaan 51'" />
        <PackageDetails :packageM="packageM" :key="ticketKey" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PackageDetails from "@/components/packageInfo/PackageDetails.vue";
import PrintQR from "@/components/PrintQR.vue";
import RoutePackageInfo from "@/components/route/RoutePackageInfo.vue";
import CreateTicket from "@/components/route/CreateTicket.vue";
import Ticket from "@/classes/Ticket";
import BtnBack from "@/components/standardUi/BtnBack.vue";
import Package from "@/classes/Package";
import { AxiosError } from "axios";
import { pakketService } from "@/services/pakketService/pakketservice";
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
  private packageId: String = "";
  private packageM: Package = new Package();

  private tickets: Ticket[] = [];
  private isLoading: Boolean = true;
  private error: Boolean = false;

  private ticketKey: number = 0;
  private addressData: String = "";

  private reloadTickets() {
    this.ticketKey++;
  }

  async mounted() {
    this.packageId = this.$router.currentRoute.value.params.id.toString();
    pakketService
      .get(this.packageId)
      .then((res) => {
        this.packageM = res;
        this.isLoading = false;
      })
      .catch((err: AxiosError) => {
        this.error = true;
        this.isLoading = false;
      });
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