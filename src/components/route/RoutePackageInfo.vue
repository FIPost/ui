<template>
    <div class="route-package-info-container" @click="toggle()">
        <div class="title">
            <div class="container-header text">Geschiedenis</div>
            <div v-if="mobile" class="arrow">
                <font-awesome-icon v-if="toggled" icon="sort-up" size="2x" />
                <font-awesome-icon v-else icon="sort-down" size="2x" />
            </div>
        </div>
        <div v-if="toggled">
            <RouteComp :tickets="tickets" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import RouteComp from "@/components/route/RouteComp.vue";
    import Ticket from "@/package/Ticket";

    @Options({
        components: {
            RouteComp,
        }
    })
    export default class RoutePackageInfo extends Vue {
        private toggled: Boolean = true;
        private mobile: Boolean = false;

        @Prop() public tickets!: Ticket[];

        private toggle() {
            if (this.mobile) {
                this.toggled = !this.toggled;
            }
        }

        created() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.toggled = false;
                this.mobile = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";

    .route-package-info-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background: white;
        overflow: hidden;
        padding: 3em;
        box-shadow: $shadow;
        border-radius: $border-radius;
        row-gap: 4em;
        text-align: left;

        @media only screen and (max-width: 600px) {
            padding: 2em;
        }
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .text {
        width: 90%;
    }

    .arrow {
        color: $modern-purple-color;
    }
</style>

