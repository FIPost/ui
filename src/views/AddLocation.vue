<template>
    <div id="LocationField">
        <h2>Nieuw afhaalpunt toevoegen</h2>
        <button class="addTypeButton" onclick="DisplayStadPage()">Stad</button>
        <button class="addTypeButton" onclick="DisplayInstituutPage()">Instituut</button>
        <button class="addTypeButton" onclick="DisplayAfhaalPuntPage()">Locatie</button>
    </div>
    <div id="inputField" >
        <div id="stadPage">
            <h2>Vul de naam van de nieuwe stad in.</h2>
            <InputField 
             @inputChanged="cityMethod"
                        label="stad:"
                        :input="city.City"
                        :valid="cityValid" />
            <BtnFinish
                text="Bevestigen"
                v-on:click="addCity"
            />
        </div>
        <div id="instituutPage">
            <h2>Vul de naam van de nieuwe vestiging in.</h2>
                <!-- hier moet een dynamische lijst maar vue is echt aids-->
                <InputField 
                    @inputChanged="streetMethod"
                        label="straatnaam:"
                        :input="institute.street"
                />
                <InputField 
                    @inputChanged="streetMethod"
                        label="straatnaam:"
                        :input="institute.Street"
                 />
                <InputField 
                    @inputChanged="streetNrMethod"
                        label="huisnummer:"
                        :input="institute.StreetNr"
                />
                <InputField 
                    @inputChanged="postalCodeMethod"
                        label="postcode:"
                        :input="institute.PostalCode"
                />
            <BtnFinish
                text="Bevestigen"
                v-on:click="addInstitute"
            />
        </div>
        <div id="afhaalPuntPage">
            <!--dynamische instituut lijst -->
            <InputField 
                    @inputChanged="afhaalNaamMethod"
                        label="naam afhaalpunt:"
                        :input="collectionPoint.Name"
                />
            <BtnFinish
                text="Bevestigen"
                v-on:click="addCollectionPoint"
            />
        </div>
    </div>
</template>
 

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import City from "@/classes/City";
import Institute from "@/classes/Institute";
import CollectioPoint from "@/classes/CollectionPoint";

 @Options({
        components: {
            InputField,
            BtnFinish
        }
    })

export default class AddLocation extends Vue{
    private city: City = new City("");
    private institute: Institute = new Institute("","",0,"","");
    private collectionPoint: CollectioPoint = new CollectioPoint("","","");

    private cityValid: boolean = true;

    cityMethod(input: string): void {
            this.city.City = input;
    }

    displayStadPage(): void{
        var x = document.getElementById("stadPage");
        var y = document.getElementById("instituutPage");
        var z = document.getElementById("afhaalPuntPage");
        if(z && y && x){
            z.style.display = "none";
            y.style.display = "none";
            if (x.style.display === "none") {
            x.style.display = "block";
            } 
            else {
            x.style.display = "none";
            }
        }
       
    }

    displayInstituutPage(): void{
        var x = document.getElementById("stadPage");
        var y = document.getElementById("instituutPage");
        var z = document.getElementById("afhaalPuntPage");
        if(z && y && x){
            x.style.display = "none";
            z.style.display = "none";
            if (y.style.display === "none") {
                y.style.display = "block";
            } 
            else {
            y.style.display = "none";
            }
        }
    }
    displayAfhaalPuntPage(): void{
        var x = document.getElementById("stadPage");
        var y = document.getElementById("instituutPage");
        var z = document.getElementById("afhaalPuntPage");
        if(z && y && x){
            x.style.display = "none";
            y.style.display = "none";
            if (z.style.display === "none") {
                z.style.display = "block";
            } 
            else {
            z.style.display = "none";
            }
        }
    }

}
</script>
<style lang="scss" scoped>
@import "@/styling/main.scss";
.addTypeButton{
    background-color: $background-colour;
    text-decoration-color: $black-color;
}
.addTypeButton:focus{
     background-color: $fontys-purple;
    text-decoration-color: white;
}
#stadPage{
    display: none;
}
#instituutPage{
    display: none;
}
#locatiePage{
    display: none;
}
</style>
