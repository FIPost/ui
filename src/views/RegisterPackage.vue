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
        <InputField
          @inputChanged="receiver"
          label="Ontvanger:"
          :input="fpackage.ReceiverId"
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
        <InputField
          @inputChanged="collectionPoint"
          label="Afhaalpunt:"
          :input="fpackage.CollectionPointId"
          :valid="collectionPointValid"
        />
      </div>
      <h3 class="error-text" v-if="errorText">
        Niet alle velden zijn ingevuld.
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
      <p>{{ fpackage.CollectionPointId }}</p>
    </div>
    <BtnFinish :text="btnText" v-on:click="toggleStep" />
    <BtnFinish text="Bevestigen" v-on:click="registerPackage" v-if="overview" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BtnBack from "@/components/BtnBack.vue";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import RegisterPackageModel from "@/classes/RegisterPackageModel";
import { pakketService } from "@/services/pakketservice";

@Options({
  components: {
    BtnBack,
    InputField,
    BtnFinish,
  },
})
export default class RegisterPackage extends Vue {
  private fpackage: RegisterPackageModel = new RegisterPackageModel(
    "",
    "",
    "",
    ""
  );

  private overview: boolean = false;
  private btnText: string = "Volgende";
  private errorText: boolean = false;
  private senderValid: boolean = true;
  private receiverValid: boolean = true;
  private nameValid: boolean = true;
  private collectionPointValid: boolean = true;

  toggleStep() {
    // Basic model validation
    this.senderValid = this.fpackage.Sender.length >= 1;
    this.receiverValid = this.fpackage.ReceiverId.length >= 1;
    this.nameValid = this.fpackage.Name.length >= 1;
    this.collectionPointValid = this.fpackage.CollectionPointId.length >= 1;

    if (
      this.senderValid &&
      this.receiverValid &&
      this.nameValid &&
      this.collectionPointValid
    ) {
      this.errorText = false;
      this.overview = !this.overview;
      if (this.overview) {
        this.btnText = "Vorige";
      } else {
        this.btnText = "Volgende";
      }
    } else {
      this.errorText = true;
    }
  }

  async registerPackage() {
    // Call to backend. Package is filled by emitters.
    let response = await pakketService.post(this.fpackage);
    window.alert("Registratie voltooid");
    console.log(response); // Only for testing
    await this.$router.push("/");
  }

  sender(input: string): void {
    this.fpackage.Sender = input;
  }

  receiver(input: string): void {
    this.fpackage.ReceiverId = input;
  }

  name(input: string): void {
    this.fpackage.Name = input;
  }

  collectionPoint(input: string): void {
    this.fpackage.CollectionPointId = input;
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.align-left {
  text-align: left;
}
</style>