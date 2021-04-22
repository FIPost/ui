<template>
    <h2>Wilt u verder gaan of blijven?</h2>
    <btn-finish class="button-tray" text="blijven"  v-on:click="closeModal"/>
    <btn-finish class="button-tray" text="Verder gaan"  v-on:click="goToLink"/>
</template>



<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";

@Options({
    components: {
    BtnFinish
    },
  props: {
    link: String,
  },
  emits: ["modal-clicked"],
})

export default class LinkOrStayModal extends Vue{
    private link: string = "";


    //To close the modal make a 'closemodal' method that sets v-if to false at the place you implement it
    goToLink(){    
        this.$router.push(this.link);
    }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.button-tray{
    margin-right: 20%;
    margin-left: 5%;
}
</style>