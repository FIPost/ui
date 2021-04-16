<template>
  <div class="package-details">
    <div class="container container-header">Pakketgegevens</div>

    <ContactDetails v-bind:contact="reciever" />

    <div class="sd-container">
      <SenderDetails :sender="packageModel.sender" />
      <div class="sd-img">
        <img alt="BoxQR" src="@/assets/BoxQR.png" />
      </div>
    </div>

    <AddressBox
      :address="deliveryLocation.address"
      title="Bezorgadres"
      :locationName="deliveryLocation.name"
    />

    <AddressBox
      :address="finalLocation.address"
      title="Eindadres"
      :locationName="finalLocation.name"
    />

    <div class="sd-container">
      <PickupPoint :pickupPoint="dropPoint" />
      <div class="sd-img">
        <img alt="BoxQR" src="@/assets/BoxLocatie.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Address from "@/classes/Address";
import Contact from "@/classes/Contact";
import City from "@/classes/City";
import AddressBox from "@/components/packageInfo/AddressBox.vue";
import ContactDetails from "@/components/packageInfo/ContactDetails.vue";
import SenderDetails from "@/components/packageInfo/SenderDetails.vue";
import PickupPoint from "@/components/packageInfo/pickupPoint.vue";
import PackageModel from "@/classes/PackageModel"

@Options({
  props: {
    reciever: Contact,
    sender: String,
    deliveryLocation: Object,
    finalLocation: Object,
    dropPoint: String,
    packageModel: Object
  },
  components: {
    AddressBox,
    ContactDetails,
    SenderDetails,
    PickupPoint,
  },
})
export default class PackageDetails extends Vue {
  packageModel!: PackageModel;
  fAddress: Address = new Address(
    new City("13123", "Tilburg"),
    "Professor Goossenslaan",
    "5022DM",
    1,
    "",
  );

  reciever: Contact = new Contact(
    "P. Makelaar",
    "p.makelaar@fontys.nl",
    "+31654963378"
  );

  sender: string = "Perfect Home Depot";

  deliveryLocation: object = {
    name: "Fontys Tilburg Stappengoor",
    address: this.fAddress,
  };

  finalLocation: Object = {
    name: "Fontys HVK",
    address: this.fAddress,
  };

  dropPoint: string = "P1 Receptie";
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