<template>
<div id="pageWrapper">
    <div class="component-container" id="LocationField">
        <h2>Nieuw afhaalpunt toevoegen</h2>
        <button class="addTypeButton" @click="DisplayStadPage()">Stad</button>
        <button class="addTypeButton" @click="DisplayInstituutPage()">Instituut</button>
        <button class="addTypeButton" @click="DisplayAfhaalPuntPage()">Locatie</button>
    </div>
    <div class="component-container"  id="inputField" >
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
                <ComboBox
                @inputChanged="assignCityToInstituteMethod"
                :options="cities"
                :placeholder="dropBoxCityString"
                :input="institute.city"
                />
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
            <ComboBox
            @inputChanged="assignInstituteToPointMethod"
            :options="institutes"
            :placeholder="dropBoxInstituteString"
            :input="collectionPoint.institute"
            />
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
</div>
</template>
 

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import City from "@/classes/City";
import Institute from "@/classes/Institute";
import CollectionPoint from "@/classes/CollectionPoint";
import ComboBox from "@/components/standardUi/ComboBox.vue";

 @Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish
        }
    })

export default class AddLocation extends Vue{
    private cities: Array<string> = new Array();
    private institutes: Array<String> = new Array();
    private dropBoxCityString: string = "Selecteer een stad";
    private dropBoxInstituteString: string = "selecteer een instituut";
    private city: City = new City("");
    private institute: Institute = new Institute("","",0,"","");
    private collectionPoint: CollectionPoint = new CollectionPoint("","","");

    private cityValid: boolean = true;

    created(){
        //call backend for cities and institutes//
        //hardcoded for now//
        this.cities = ["Tilburg", "Breda", "Eindhoven", "Mocktown", "Testville"];
        this.institutes = ["Aperture testfacility", "rachelsmolen", "Luigi's mansion"];
    }


    cityMethod(input: string): void {
            this.city.City = input;
    }

    assignInstituteToPointMethod(input: string): void{
        this.collectionPoint.Institute = input;
    }

    assignCityToInstituteMethod(input: string): void{
        this.institute.City  = input
    }

    DisplayStadPage(): void{
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

    DisplayInstituutPage(): void{
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
    DisplayAfhaalPuntPage(): void{
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
    width: 50%;
    height: 20%;
    margin-top:20%;
    margin-bottom: 20%;
    margin-left: auto;
    margin-right: auto;
    background-color: $background-color;
    text-decoration-color: $black-color;
}
.addTypeButton:focus{
    width: 50%;
    height: 20%;
    margin-top:20%;
    margin-bottom: 20%;
    margin-left: auto;
    margin-right: auto;
    background-color: $fontys-purple;
    text-decoration-color: white;
}
#LocationField{
    display: flex;
    flex-direction: column;
    align-content: center;

    box-shadow: $shadow;
    border-radius: $border-radius;
}
#InputField{
    display: flex;
    flex-direction: column;
    box-shadow: $shadow;
    border-radius: $border-radius;
}
#stadPage{
    display: none;
}
#instituutPage{
    display: none;
}
#afhaalPuntPage{
    display: none;
}
#pageWrapper{
    display: flex;
    padding: 5%;
}
</style>
