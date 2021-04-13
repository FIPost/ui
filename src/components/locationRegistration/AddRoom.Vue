<template>
    <h2>Vul de naam van het nieuwe lokaal in.</h2>
        <InputField 
            @inputChanged="assignNameToRoom"
            label="naam lokaal:"
            :input="room.Name"
        />
        <ComboBox
            @inputChanged="assignBuildingToRoom"
            :options="buildings"
            :placeholder="dropBoxBuildingString"
            :input="building"
        />
        <BtnFinish
            text="Bevestigen"
            v-on:click="addRoom"
        />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import Building from "@/classes/Building";
import Room from "@/classes/Room";
import ComboBox from "@/components/standardUi/ComboBox.vue";
import { locatieService } from "@/services/locatieservice";

@Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish
        }
    })

export default class AddRoom extends Vue{
    private buildings: Array<Building> = new Array();
    private mockBuilding: Building = new Building("bla", "kazhad dum", "ababab");
    private room: Room =  new Room("","","");

    private dropBoxBuildingString = "Kies uw gebouw";

    async created(){
        //backend call for buildings//
        let result = await locatieService.getAllBuildings();
        this.buildings = result;
    }

    assignNameToRoom(input: string): void{
        this.room.Name = input;
    }
    assignBuidlingToRoom(input: Building): void{
        this.room.BuildingId = input.Guid;
    }

    async addRoom(){
        let result = await locatieService.AddRoom(this.room);
    }
}
</script>

<style lang="import { locatieService } from "@/services/locatieservice"
scss" scoped>
@import "@/styling/main.scss";

#InputField{
    display: flex;
    flex-direction: column;
    box-shadow: $shadow;
    border-radius: $border-radius;
}
</style>