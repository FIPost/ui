<template>
    <nav class="navbar shadow-sm mb-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img alt="IPostLogo" src="../assets/logo.png" style="height: 30px;"/>
            </a>
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
