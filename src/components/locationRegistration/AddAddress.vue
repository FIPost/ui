<template>
  <div>
    <div class="container-header">Vul de naam van het nieuwe adres in.</div>
    <ComboBoxInput
      @selectChange="assignCityToAddress"
      :options="cities"
      placeholder="selecteer een stad"
      label="stad:"
    />
    <InputField
      @inputChanged="assignStreetToAddress"
      label="straatnaam:"
      :input="address.Street"
    />
    <InputField
      @inputChanged="assignStreetToAddress"
      label="huisnummer:"
      :input="address.StreetNr"
    />
    <InputField
      @inputChanged="assignPostalCodeToAddress"
      label="postcode:"
      :input="address.PostalCode"
    />
    <BtnFinish text="Bevestigen" v-on:click="addAddress" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Address from "@/classes/Address";
import ComboBoxInput from "@/components/standardUi/ComboBoxInput.vue";
import { locatieService } from "@/services/locatieservice";

@Options({
  components: {
    ComboBoxInput,
    InputField,
    BtnFinish,
  },
})
export default class AddAddress extends Vue {
  private cities: Array<String> = new Array<String>('Tilburg', 'Eindhoven');
  private address: Address = new Address("", 0, "", "", "", "");

  async created() {
    //call backend for cities//
    //    let result = await locatieService.getAllCities();
    //    this.cities = result;
  }

  assignCityToAddress(input: string): void {
    this.address.City = input;
  }

  assignStreetToAddress(input: string): void {
    this.address.Street = input;
  }

  assignStreetNrToAddress(input: number): void {
    this.address.StreetNr = input;
  }

  assignPostalCodeToAddress(input: string): void {
    this.address.PostalCode = input;
  }

  async addAddress() {
    let result = await locatieService.postAddress(this.address);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";


</style>