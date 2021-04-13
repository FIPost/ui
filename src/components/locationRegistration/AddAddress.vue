<template>
       <h2>Vul de naam van het nieuwe adres in.</h2>
                <ComboBox
                @inputChanged="assignCityToAddress"
                :options="cities"
                :placeholder="dropBoxCityString"
                :input="address.city"
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
            <BtnFinish
                text="Bevestigen"
                v-on:click="addAddress"
            />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Address from "@/classes/Address";
import City from "@/classes/City";
import ComboBox from "@/components/standardUi/ComboBox.vue";
import { locatieService } from "@/services/locatieservice";

@Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish
        }
    })

export default class AddAddress extends Vue{
    private cities: Array<City> = new Array();
    private address: Address =  new Address("",0,"","","", "");
    private mockCity = new City("Tilburg", "gggheu");
    
    async created(){
        //call backend for cities//
        let result = await locatieService.getAllCities();
        this.cities = result;
    }

    assignCityToAddress(input: string): void{
        this.address.City = input;
    }

    assignStreetToAddress(input: string): void{
        this.address.Street = input;
    }

    assignStreetNrToAddress(input: number): void{
        this.address.StreetNr = input;
    }

    assignPostalCodeToAddress(input: string): void{
        this.address.PostalCode = input;
    }

    addAddress(): void{
        //tbd
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