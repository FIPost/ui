<template>
       <h2>Vul de naam van het nieuwe gebouw in.</h2>
         <InputField 
                    @inputChanged="assignNameToBuilding"
                        label="naam gebouw:"
                        :input="building.Name"
                />
            <ComboBox
                @inputChanged="assignAddressToBuilding"
                :options="addresses"
                :placeholder="dropBoxAddressString"
                :input="address"
            />
            <BtnFinish
                text="Bevestigen"
                v-on:click="addBuilding"
            />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Address from "@/classes/Address";
import Building from "@/classes/Building";
import ComboBox from "@/components/standardUi/ComboBox.vue";
import { locatieService } from "@/services/locatieservice";

@Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish
        }
    })

export default class AddBuilding extends Vue{
    private building: Building = new Building("","","");
    private addresses: Array<Address> = new Array();
    private mockAddress: Address = new Address("Kalverstraat", 2, "4444 NN", "Tilburg", "Nederland", "vvfgtr");
    private dropBoxAddressString: string = "Kies uw adres";

    async created(){
        //backend call for adresesses
  //      let result = await locatieService.getAllAddresses();
   //     this.addresses = result;
    }

    assignNameToBuilding(input: string): void{
        this.building.Name = input;
    }
    assignAddressToBuilding(input: Address): void{
        this.building.AddressId = input.Guid;
    }

    async addBuilding(){
        let result  =  locatieService.postBuidling(this.building);
    }
}

</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

#InputField{
    display: flex;
    flex-direction: column;
    box-shadow: $shadow;
    border-radius: $border-radius;
}
</style>