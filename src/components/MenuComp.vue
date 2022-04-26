<template>
  <div class="m-container">
    <MenuItem
      @click="registerClicked()"
      class="item"
      labelText="Registreren"
      :source="getImgUrl('register.png')"
    />
    <MenuItem
      @click="searchClicked()"
      class="item"
      labelText="Zoeken"
      :source="getImgUrl('search.png')"
    />
    <MenuItem
      @click="locationClicked()"
      class="item"
      labelText="Locaties"
      :source="getImgUrl('map.png')"
    />
  </div>
</template>

<script lang="ts">
    import MenuItem from "@/components/MenuItem.vue";
    import { Options, Vue } from "vue-class-component";

    @Options({
        components: {
            MenuItem
        }
    })
    export default class MenuComp extends Vue {
        private getImgUrl(pic) {
            return require("@/assets/svg/" + pic);
        }

        private registerClicked(): void {
            this.$router.push("/registratie");
        }

        private searchClicked(): void {
            this.$router.push("/overzicht");
        }

        private scanClicked(): void {
            if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
                // ok, browser supports it
                alert("support");
            }
        }

        private locationClicked(): void {
            this.$router.push("/locaties");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styling/main.scss";

.m-container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5em;
  row-gap: 1.5em;
}

.slot {
  width: 50px;
  margin: 10px;
}
</style>
