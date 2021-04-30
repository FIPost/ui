<template>
  <div class="align-left">
    <BtnBack class="button-back" />
    <div class="component-container" v-if="!overview">
      <h1>Pakket registreren</h1>
      <div>
        <h3>Afzender</h3>
        <InputField
          label="Afzender:"
          v-model:input="fpackage.Sender"
          :valid="senderValid"
          @update:input="senderChanged"
        />
      </div>
      <div>
        <h3>Ontvanger</h3>
        <CBSearchSuggestions
          :options="receivers"
          label="Ontvanger:"
          @selectChanged="receiverChanged"
          :valid="receiverValid"
        />
      </div>
      <div>
        <h3>Pakket</h3>
        <InputField
          label="Pakketnaam:"
          v-model:input="fpackage.Name"
          :valid="nameValid"
          @update:input="nameChanged"
        />
      </div>
      <div>
        <h3>Afhaalpunt</h3>
        <CBSearchSuggestions
          :options="rooms"
          label="Afhaalpunt:"
          @selectChanged="collectionPointChanged"
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
      <h3>Ontvanger</h3>
      <p>{{ receiver.name }}</p>
      <h3>Pakket</h3>
      <p>{{ fpackage.Name }}</p>
      <h3>Afhaalpunt</h3>
      <p>{{ room.name }}</p>
    </div>
    <BtnFinish class="margin-button" :text="btnText" v-on:click="toggleStep" />
    <BtnFinish
      class="margin-button"
      text="Bevestigen"
      v-on:click="registerPackage"
      v-if="overview"
    />
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
import { personeelService } from "@/services/personeelService/personeelService";
import Person from "@/classes/Person";
import SelectOption from "@/classes/helpers/SelectOption";
import { getCurrentInstance, watch } from "@vue/runtime-core";

@Options({
  components: {
    BtnBack,
    InputField,
    BtnFinish,
    CBSearchSuggestions,
  },
})
export default class RegisterPackage extends Vue {
  private emitter = getCurrentInstance()?.appContext.config.globalProperties
    .emitter;

  public fpackage: RegisterPackageModel = new RegisterPackageModel(
    "",
    "",
    "",
    ""
  );

  private test: string = "";
  private overview: boolean = false;
  private btnText: string = "Volgende";
  private errorText: boolean = false;
  private error: string = "Niet alle velden zijn ingevuld";
  private senderValid: boolean = true;
  private receiverValid: boolean = true;
  private nameValid: boolean = true;
  private collectionPointValid: boolean = true;

  private receiver: SelectOption = new SelectOption("", "");
  private receivers: Array<SelectOption> = new Array<SelectOption>();
  private allreceivers: Array<Person> = new Array<Person>();

  private room: SelectOption = new SelectOption("", "");
  private rooms: Array<SelectOption> = new Array<SelectOption>();
  private allRooms: Array<Room> = new Array<Room>();

  toggleStep() {
    // Basic model validation
    this.senderValid = this.fpackage.Sender.length >= 1;
    this.nameValid = this.fpackage.Name.length >= 1;

    var roomId = this.allRooms.find((room) => room.id == this.room.id)?.id;
    if (roomId != null) {
      this.collectionPointValid = true;
      this.fpackage.CollectionPointId = roomId;
    } else {
      this.collectionPointValid = false;
      this.errorText = true;
      this.error = "dit afhaalpunt bestaat niet";
    }

    var receiverId = this.allreceivers.find(
      (receiver) => receiver.id == this.receiver.id
    )?.id;
    if (receiverId != null) {
      this.receiverValid = true;
      this.fpackage.ReceiverId = receiverId;
    } else {
      this.receiverValid = false;
      this.errorText = true;
      this.error = "deze ontvanger kan niet gevonden worden";
    }

    if (this.senderValid && this.nameValid) {
      if (this.collectionPointValid && this.receiverValid) {
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

  receiverChanged(input: SelectOption): void {
    this.receiver = input;
  }

  collectionPointChanged(input: SelectOption): void {
    this.room = input;
  }

  senderChanged(input: SelectOption): void {
    this.senderValid = this.fpackage.Sender.length >= 1;
  }

  nameChanged(input: SelectOption): void {
    this.nameValid = this.fpackage.Name.length >= 1;
  }

  async mounted() {
    roomService
      .getAll()
      .then((res) => {
        this.allRooms = res;
        this.allRooms.forEach((room) =>
          this.rooms.push(
            new SelectOption(
              room.id,
              room.building.address.city.name +
                ", " +
                room.building.name +
                ", " +
                room.name
            )
          )
        );
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
    personeelService
      .getAll()
      .then((res) => {
        this.allreceivers = res;
        this.allreceivers.forEach((receiver) =>
          this.receivers.push(new SelectOption(receiver.id, receiver.name))
        );
      })
      .catch((err) => {
        this.emitter.emit("err", err);
      });
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.align-left {
  text-align: left;
}
.margin-button {
  margin-right: 5%;
}
</style>