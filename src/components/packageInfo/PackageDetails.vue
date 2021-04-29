<template>
  <div v-if="!isLoading">
    <div v-if="!error" class="package-details">
      <div class="container container-header">Pakketgegevens</div>

      <div class="pd-content">
        <div class="container-subheader-small">Omschrijving</div>
        <div class="pd-item">{{ packageM.name }}</div>
      </div>

      <PersonDetails :person="packageM.receiver" />

      <div class="pd-container">
        <div class="pd-content">
          <div class="container-subheader-small">Afzender</div>
          <div class="pd-item">
            {{
              packageM.sender.length > 1
                ? packageM.sender
                : "De afzender kan niet worden opgehaald"
            }}
          </div>
        </div>
        <div class="sd-img">
          <img alt="BoxQR" src="@/assets/BoxQR.png" />
        </div>
      </div>

      <div>
        <StatusBadge
          completeText="20-apr-2021 asdasdasdaads"
          inCompleteText="Niet binnen gekomen"
          :complete="true"
        />
        <RoomDetails :room="deliveryLocation" title="Binnen gekomen bij" />
      </div>

      <div>
        <StatusBadge
          completeText="Aangekomen"
          inCompleteText="nog niet binnen"
          :complete="packageM.routeFinished"
        />
        <RoomDetails :room="packageM.collectionPoint" title="Af te halen op" />
      </div>
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
import PersonDetails from "@/components/packageInfo/PersonDetails.vue";
import RoomDetails from "@/components/packageInfo/RoomDetails.vue";
import StatusBadge from "@/components/standardUi/StatusBadge.vue";
import { pakketService } from "@/services/pakketService/pakketservice";
import Person from "@/classes/Person";
import Room from "@/classes/Room";
import Package from "@/classes/Package";
import Address from "@/classes/Address";
import City from "@/classes/City";
import Building from "@/classes/Building";

@Options({
  props: {
    packageId: String,
  },
  components: {
    PersonDetails,
    RoomDetails,
    StatusBadge,
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
    new City("Tilburg", "1"),
    "Professor Goossenslaan",
    "1234AB",
    1,
    ""
  );

  private deliveryLocation: Room = new Room(
    "1",
    "Postkamer",
    new Building("1", "P8", this.fAddress)
  );

  async mounted() {
    pakketService
      .get(this.$router.currentRoute.value.params.id)
      .then((res) => {
        this.packageM = res;
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = true;
        this.isLoading = false;
      });
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

.pd-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 0.5em;
}

.pd-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.2em;
}

.pd-item {
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
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