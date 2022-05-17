<template>
    <div class="container">
        <h1 class="border-bottom">Start</h1>
        <div class="row">
            <MenuItem class="col-2" @click="goToUrl('/registratie')" :source="getImgUrl('register.png')">Registreren</MenuItem>
            <MenuItem class="col-2" @click="goToUrl('/overzicht')" :source="getImgUrl('search.png')">Zoeken</MenuItem>
            <MenuItem class="col-2" @click="goToUrl('/locaties')" :source="getImgUrl('map.png')">Locaties</MenuItem>
        </div>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component'
    import MenuItem from '@/components/MenuItem.vue'

    @Options({
        components: {
            MenuItem
        }
    })
    export default class MenuComp extends Vue {
        private getImgUrl(pic) {
            return require("@/assets/svg/" + pic);
        }

        private goToUrl(end: string): void {
            this.$router.push(end);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
