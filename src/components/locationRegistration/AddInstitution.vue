<template>
<h2>Voeg hier het instituut toe.</h2>
        <InputField 
            @inputChanged="assignNameToInstitute"
            label="naam:"
            :input="institute.Name"
        />
        <ComboBox
            @inputChanged="assignAddressToInstitute"
            :options="addresses"
            :placeholder="dropBoxAddressString"
            :input="Address"
        />
        <select id="SelectedAddresses"></select>
        <button @click="resetAddressList()">Resetten</button>
        <BtnFinish
        text="Bevestigen"
        v-on:click="addInstitute"
        />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Address from "@/classes/Address";
import Institute from "@/classes/Institute";
import ComboBox from "@/components/standardUi/ComboBox.vue";
import { locatieService } from "@/services/locatieservice";

@Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish
        }
    })

export default class AddInstitution extends Vue{
    private institute: Institute = new Institute("","",new Array<string>());
    private addresses: Array<Address> = new Array();
    private addressesToInstitute: Array<string> = new Array();
    private mockAddress: Address = new Address("Kalverstraat", 2, "4444 NN", "Tilburg", "Nederland", "vvfgtr");
    private dropBoxAddressString: string = "Kies uw adressen";

    async created(){
        //backend call for adresesses
  //      let result = await locatieService.getAllAddresses();
  //      this.addresses = result;
    }

    assignNameToInstitue(input: string): void{
        this.institute.Name = input;
    }

    assignAddressToInstitute(input: Address): void{
        if(!this.addressesToInstitute.includes(input.Guid)){
            this.addressesToInstitute.push(input.Guid);
            var listShow = <HTMLSelectElement>document.getElementById("SelectedAddressses");
            var optionPush = document.createElement("option");
            optionPush.text = Address.toString();
            listShow!.add(optionPush);
        }
      
    }

    async addInstitute(){
        let result = await locatieService.postInstitution(this.institute);
    }

    resetAddressList(){
        this.addressesToInstitute = [];
        var select =  <HTMLSelectElement>document.getElementById("SelectedAddressses");
        var options = document.querySelectorAll('#SelectedAddresses option');
        options.forEach(o => o.remove());

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