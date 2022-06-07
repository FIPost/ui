<template>
    <nav class="navbar navbar-light navbar-expand-lg shadow-sm mb-2 bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img alt="IPostLogo" src="../assets/logo.png" style="height: 30px;"/>
            </a>
            <button type="button" class="navbar-toggler" 
                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2">
                    <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/#/overzicht">Paketten</a></li>
                    <li class="nav-item"><a class="nav-link" href="/#/locaties">Locaties</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";

    @Options({

    })
    export default class NavigationBar extends Vue {
        private logoClicked(): void {
            this.$router.push('/');
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
