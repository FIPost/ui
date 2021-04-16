<template>
  <div class="ab-container">
    <div class="container-subheader">{{ title }}: <a href="">{{ locationName }}</a></div>
    <div class="cd-item">{{address.Street}} {{address.StreetNr}}</div>
    <div class="cd-item">{{address.PostalCode}}</div>
  </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import Address from '@/classes/Address';

    @Options({
        props: {
            address: Address,
            title: String,
            locationName: String
        }
    })

    export default class AddressBox extends Vue {}
</script>



<style scoped lang="scss">
@import "@/styling/main.scss";

.ab-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.5em;
}

.cd-item {
  width: 50%;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
}
</style>