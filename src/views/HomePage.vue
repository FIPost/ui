<template>
  <div class="h-container">
    <div class="container-group">
      <h1 class="header">Start</h1>
      <hr />
      <MenuComp />
    </div>
     <div class="container-group">
      <h1 class="header">Dashboard</h1>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import MenuComp from "@/components/MenuComp.vue";

    @Options({
        components: {
            MenuComp
        }
    })
    export default class HomePage extends Vue {
        registerClicked(): void {
            this.$router.push("/registratie");
        }

        searchClicked(): void {
            this.$router.push("/overzicht");
        }

        scanClicked(): void {
            this.$router.push("/pakket/1");
        }

        locationClicked(): void {
            this.$router.push("/locaties");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styling/main.scss";

.container-group {
  margin: 2em;
  margin-bottom: 4em;
}

.container-group {
  .header {
    font-family: $font-family;
    font-size: 2em;
    font-weight: 600;
    text-align: left;
  }

  hr {
    width: 75vw;
    border: 0;
    border-top: 3px solid $gray-color;
    opacity: 0.2;
    margin: 1em 0;
  }
}
</style>
