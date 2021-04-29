<template>
  <div v-if="!isLoading">
    <div v-if="!error" class="package-details">
      <div class="container container-header">Pakketgegevens</div>
      <PersonDetails :person="packageM.receiver" />

      <div class="sd-container">
        <SenderDetails :sender="packageM.sender" />
        <div class="sd-img">
          <img alt="BoxQR" src="@/assets/BoxQR.png" />
        </div>
      </div>

      <AddressBox
        :address="deliveryLocation.address"
        title="Bezorgadres"
        :locationName="deliveryLocation.name"
      />

      <CollectionPointDetails
        :room="packageM.collectionPoint"
        title="Eindadres"
      />
    </div>
    <div v-else class="package-details">
      <div class="container container-header">Pakketgegevens</div>
      Er ging iets mis bij het ophalen van de pakketgegevens. probeer het later
      opnieuw.
    </div>
  </div>
  <div v-else></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddressBox from "@/components/packageInfo/AddressBox.vue";
import PersonDetails from "@/components/packageInfo/PersonDetails.vue";
import SenderDetails from "@/components/packageInfo/SenderDetails.vue";
import CollectionPointDetails from "@/components/packageInfo/CollectionPointDetails.vue";
import { pakketService } from "@/services/pakketService/pakketservice";
import Person from "@/classes/Person";
import Room from "@/classes/Room";
import Package from "@/classes/Package";
import Address from "@/classes/Address";
import City from "@/classes/City";

@Options({
  props: {
    packageId: String,
  },
  components: {
    AddressBox,
    PersonDetails,
    SenderDetails,
    CollectionPointDetails,
  },
})
export default class PackageDetails extends Vue {
  private packageM: Package = new Package(
    "",
    (null as unknown) as Person,
    (null as unknown) as Room,
    "",
    "",
    "",
    false,
    []
  );
  private isLoading: Boolean = true;
  private error: Boolean = false;

  fAddress: Address = new Address(
    new City("13123", "Tilburg"),
    "Professor Goossenslaan",
    "5022DM",
    1,
    ""
  );

  deliveryLocation: object = {
    name: "Fontys Tilburg Stappengoor",
    address: this.fAddress,
  };

  async mounted() {
    try {
      this.packageM = await pakketService.get(
        this.$router.currentRoute.value.params.id
      );
    } catch (exception) {
      this.error = true;
    }
    this.isLoading = false;
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.package-details {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $shadow;
  text-align: left;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 1em;

  padding: 3em;
  @media only screen and (max-width: 600px) {
    padding: 2em;
  }
}

.sd-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 0.5em;
}

.sd-img {
  width: 3em;
  position: relative;
}

img {
  width: 100px;
  position: absolute;
  left: -50px;
  top: -50px;
  @media only screen and (max-width: 600px) {
    width: 3em;
    left: 0px;
    top: 0px;
  }
}
</style>