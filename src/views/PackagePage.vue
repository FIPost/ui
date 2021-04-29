<template>
  <div v-if="!isLoading">
    <btn-back />
    <div class="pi-container">
      <div class="pi-item-container">
        <NextStep :ticket="ticketModels[0]" />
        <RoutePackageInfo :ticketModels="ticketModels" />
      </div>
      <div class="pi-item-container">
        <PrintQR :code="packageId" />
        <PackageDetails :packageId="packageId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PackageDetails from "@/components/packageInfo/PackageDetails.vue";
import PrintQR from "@/components/PrintQR.vue";
import RoutePackageInfo from "@/components/route/RoutePackageInfo.vue";
import NextStep from "@/components/route/NextStep.vue";
import TicketModel from "@/classes/TicketModel";
import BtnBack from "@/components/standardUi/BtnBack.vue";

@Options({
  components: {
    PackageDetails,
    PrintQR,
    RoutePackageInfo,
    NextStep,
    BtnBack,
  },
})
export default class PackagePage extends Vue {    
  private packageId: String = "";

  private ticketModels: TicketModel[] = [
    new TicketModel(
      "12",
      "12",
      1,
      "13 februari 13:16",
      "405273",
      "405273",
      false,
      "11",
      "14 februari 16:32",
      true,
      "Zending is aangekomen bij Fontys HVK"
    ),
    new TicketModel(
      "11",
      "11",
      1,
      "12 februari 10:28",
      "405273",
      "405273",
      true,
      "13",
      "12 februari 14:23",
      false,
      "Zending onderweg naar Fontys HVK"
    ),
    new TicketModel(
      "13",
      "13",
      1,
      "10 februari 13:16",
      "405273",
      "405273",
      true,
      "13",
      "11 februari 10:32",
      false,
      "Zending is geregistreerd bij Fontys"
    ),
  ];
  private isLoading: Boolean = true;

  async mounted() {
    this.packageId = this.$router.currentRoute.value.params.id.toString();
    this.isLoading = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styling/main.scss";
.pi-container {
  padding-top: 2em;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 1em;
}

.pi-item-container {
  min-height: 100vh;
  min-width: 45vw;
  max-width: 45vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 1em;
  padding-bottom: 1em;
  @media only screen and (max-width: 970px) {
    min-width: 90vw;
    max-width: 90vw;
    min-height: unset;
  }
}
</style>