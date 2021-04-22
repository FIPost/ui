<template>
  <div class="align-left">
    <BtnBack class="button-back" />
    <div class="component-container" v-if="!overview">
      <h1>Pakket registreren</h1>
      <div>
        <h3>Afzender</h3>
        <InputField
          @inputChanged="sender"
          label="Afzender:"
          :input="fpackage.Sender"
          :valid="senderValid"
        />
      </div>
      <div>
        <h3>Ontvanger</h3>
        <CBSearchSuggestions
          :options="receivers"
          label="Ontvanger:"
          @selectChanged="receiver"
          :valid="receiverValid"
        />
      </div>
      <div>
        <h3>Pakket</h3>
        <InputField
          @inputChanged="name"
          label="Pakketnaam:"
          :input="fpackage.Name"
          :valid="nameValid"
        />
      </div>
      <div>
        <h3>Afhaalpunt</h3>
        <CBSearchSuggestions
          :options="rooms"
          label="Afhaalpunt:"
          @selectChanged="collectionPoint"
          :valid="collectionPointValid"
        />
      </div>
      <h3 class="error-text" v-if="errorText">
        {{ error }}
      </h3>
    </div>
    <div class="component-container" v-if="overview">
      <h1>Overzicht</h1>
      <h3>Afzender</h3>
      <p>{{ fpackage.Sender }}</p>
      <h3>Ontvangstadres</h3>
      <p>{{ fpackage.ReceiverId }}</p>
      <h3>Pakket</h3>
      <p>{{ fpackage.Name }}</p>
      <h3>Afhaalpunt</h3>
      <p>{{ room }}</p>
    </div>
      <BtnFinish class="margin-button" :text="btnText" v-on:click="toggleStep" />
      <BtnFinish class="margin-button" text="Bevestigen" v-on:click="registerPackage" v-if="overview" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BtnBack from "@/components/standardUi/BtnBack.vue";
import InputField from "@/components/standardUi/InputField.vue";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import CBSearchSuggestions from "@/components/standardUi/CBSearchSuggestions.vue";
import RegisterPackageModel from "@/classes/requests/PackageRequest";
import { pakketService } from "@/services/pakketService/pakketservice";
import Room from "@/classes/Room";
import { roomService } from "@/services/locatieService/roomservice";

@Options({
  components: {
    BtnBack,
    InputField,
    BtnFinish,
    CBSearchSuggestions,
  },
})
export default class RegisterPackage extends Vue {
  private fpackage: RegisterPackageModel = new RegisterPackageModel(
    "",
    "",
    "",
    ""
  );
  private room: string = "";

  private overview: boolean = false;
  private btnText: string = "Volgende";
  private errorText: boolean = false;
  private error: string = "Niet alle velden zijn ingevuld";
  private senderValid: boolean = true;
  private receiverValid: boolean = true;
  private nameValid: boolean = true;
  private collectionPointValid: boolean = true;
  private receivers: Array<String> = [
    "Patrick de Beer",
    "Jacques de Roij",
    "Jaap van der Meer",
    "Kevin Wieling",
    "Sjors Scholten",
    "Aron Heesakkers",
    "Sverre van Gompel",
    "Robin de Witte",
  ];
  private rooms: Array<String> = new Array<String>();
  private allRooms: Array<Room> = new Array<Room>();

  toggleStep() {
    // Basic model validation
    this.senderValid = this.fpackage.Sender.length >= 1;
    this.receiverValid = this.fpackage.ReceiverId.length >= 1;
    this.nameValid = this.fpackage.Name.length >= 1;

    var roomId = this.allRooms.find((room) => room.name == this.room)?.id;
    if (roomId != null) {
      this.collectionPointValid = true;
      this.fpackage.CollectionPointId = roomId;
    } else {
      this.collectionPointValid = false;
      this.errorText = true;
      this.error = "dit afhaalpunt bestaat niet";
    }

    if (this.senderValid && this.receiverValid && this.nameValid) {
      if (this.collectionPointValid) {
        this.errorText = false;
        this.error = "";
        this.overview = !this.overview;
        if (this.overview) {
          this.btnText = "Vorige";
        } else {
          this.btnText = "Volgende";
        }
      }
    } else {
      this.errorText = true;
      this.error = "Niet alle velden zijn ingevuld";
    }
  }

  async registerPackage() {
    // Call to backend. Package is filled by emitters.
    let response = await pakketService.post(this.fpackage);
    await this.$router.push("/");
  }

  sender(input: string): void {
    if (!this.senderValid && input.length >= 1) {
      this.senderValid = true;
    }
    this.fpackage.Sender = input;
  }

  receiver(input: string): void {
     if (!this.receiverValid && input.length >= 1) {
      this.receiverValid = true;
    }
    this.fpackage.ReceiverId = input;
  }

  name(input: string): void {
     if (!this.nameValid && input.length >= 1) {
      this.nameValid = true;
    }
    this.fpackage.Name = input;
  }

  collectionPoint(input: string): void {
    this.room = input;
  }

  async mounted() {
    this.allRooms = await roomService.getAll();
    this.allRooms.forEach((room) => this.rooms.push(room.name));
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.align-left {
  text-align: left;
}
.margin-button{
  margin-right: 5%;
}

</style>