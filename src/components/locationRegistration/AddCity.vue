<!-- moet nog naar backend -->
<template>
      <h2>Vul de naam van de nieuwe stad in.</h2>
            <InputField 
             @inputChanged="cityMethod"
                        label="stad:"
                        :input="city.City"
            />
            <BtnFinish
                text="Bevestigen"
                v-on:click="addCity"
            />
</template>   

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputField from "@/components/InputField.vue";
import BtnFinish from "@/components/BtnFinish.vue";
import City from "@/classes/City";

@Options({
        components: {
            InputField,
            BtnFinish
        }
    })

export default class AddCity extends Vue{
    private city: City = new City("", "");


    cityMethod(input: string): void {
        this.city.City = input;
    }

    addCity(): void{
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
  