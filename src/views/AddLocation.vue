<template>
<div id="pageWrapper">
    <div class="component-container" id="LocationField">
        <h2>Nieuw afhaalpunt toevoegen</h2>
        <button class="addTypeButton" @click="DisplayPage(0)">Stad</button>
        <button class="addTypeButton" @click="DisplayAddressPage(3)">Adres</button>
          <button class="addTypeButton" @click="DisplayInstitutePage(1)">Instituut</button>
        <button class="addTypeButton" @click="DisplayAfhaalPuntPage(2)">Locatie</button>
    </div>
    <div class="component-container"  id="inputField" >
        <div id="stadPage">
          <add-city></add-city>
        </div>
        <div id="addressPage">
          <add-address></add-address>
        </div>
        <div id="buildingPage">
            <add-building></add-building>
        </div>
        <div id="institutePage">
                <add-institution></add-institution>
            </div>
        <div id="roomPage">
            <add-room></add-room>          
        </div>
    </div>
</div>
</template>
 

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import AddCity from "@/components/locationRegistration/AddCity.vue";
import AddAddress from "@/components/locationRegistration/AddAddress.vue";
import AddBuilding from "@/components/locationRegistration/AddBuilding.vue";
import AddInstitution from "@/components/locationRegistration/AddInstitution.vue";
import AddRoom from "@/components/locationRegistration/AddRoom.vue"
import ComboBox from "@/components/standardUi/ComboBox.vue";

 @Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish,
            AddCity,
            AddAddress,
            AddBuilding,
            AddInstitution,
            AddRoom
        }
    })

export default class AddLocation extends Vue{

    DisplayPage(pageToGet: number): void{
        var a = document.getElementById("stadPage");
        var b = document.getElementById("institutePage");
        var c = document.getElementById("roomPage");
        var d = document.getElementById("addressPage");
        var e = document.getElementById("buildingPage");
        var elementCollection = [a,b,c,d];
        if(a && b && c && d &&e){
            a.style.display = "none";
            b.style.display = "none";
            c.style.display = "none";
            d.style.display = "none";
            e.style.display = "none";
            if(elementCollection[pageToGet] != null){
                elementCollection[pageToGet]!.style.display = "block";
            }                                                           
        }   
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

#stadPage{
    display: none;
}
#institutePage{
    display: none;
}
#adressPage{
    display: none;
}
#buildingPage{
    display: none;
}
#roomPage{
    display: none;
}
#pageWrapper{
    display: flex;
    padding: 5%;
}
</style>
