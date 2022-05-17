<template>
    <nav class="navbar">
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
    @import "@/styling/main.scss";

    .nav-container {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        background-color: #fff;
        width: 100%;
    }

    .nav-main {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        box-shadow: 0 2px 10px rgba(88, 88, 88, 0.16);
        overflow: hidden;
        align-content: center;
        font-family: $font-family;

        .logo-container {
            max-width: 100px;
            width: 20%;
            height: 90%;
            margin: 10px;
            margin-left: 15px;
            cursor: pointer;
            display: flex;

            .logo {
                background: url("../assets/logo.png");
                background-repeat: no-repeat;
                background-size: contain;
                height: 30px;
                width: 100px;
                margin: 3px;
                align-self: center;
            }
        }

        .other {
            margin-right: 15px;
        }
    }

    .nav-extra {
        display: none;
    }

    @media only screen and (max-width: 1000px) {
        .nav-extra {
            overflow: hidden;
            display: flex;
            padding: 10px 0;

            .btn-container-extra {
                display: flex;
                justify-content: space-evenly;
                margin: auto;
            }
        }
    }
</style>
