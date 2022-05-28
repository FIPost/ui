<template>
    <div class="card" @click="toggle()">
        <h1>Geschiedenis</h1>
        <div v-if="mobile" class="arrow">
            <font-awesome-icon v-if="toggled" icon="sort-up" size="2x" />
            <font-awesome-icon v-else icon="sort-down" size="2x" />
        </div>
        <ul class="listGroup gap-1" v-if="toggled">
            <li class="listItem card stack" v-for="item in tickets" :key="item.id">
                <font-awesome-icon icon="check-circle" />
                <ul class="listGroup">
                    <li class="listItem">{{new Date(item.finishedAt * 1000).toLocaleDateString()}}</li>
                    <li class="listItem"><LocationProxy :id="item.locationId" /></li>
                    <li class="listItem"><ReceiverProxy :id ="item.completedByPersonId" /></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import RouteComp from "@/components/route/RouteComp.vue";
    import { Ticket } from "@/package/Ticket";

    import LocationProxy from '@/location/components/LocationProxy.vue'
    import ReceiverProxy from '@/employee/components/ReceiverProxy.vue'

    @Options({
        components: {
            RouteComp,
            LocationProxy,
            ReceiverProxy
        }
    })
    export default class RoutePackageInfo extends Vue {
        private toggled: Boolean = true;
        private mobile: Boolean = false;

        @Prop() public tickets!: Array<Ticket>;

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

    .stack {
        display: flex;
        align-items: center;
        justify-content: start;
        column-gap: 1em;
    }

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

