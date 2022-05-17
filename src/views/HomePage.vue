<template>
    <div class="container-fluid bg-light">
        <MenuComp />
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
