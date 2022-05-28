<template>
    <div class="ticket">
        <div class="ticket-image">
            <font-awesome-icon :icon="destinationReached() ? 'home' : 'check-circle'"
                               :class="destinationReached() ? 'finished big' : 'finished'" />
        </div>
        <div class="ticket-info">
            <div class="ticket-info-top">{{ ticket.getDateString() }}</div>
            <div class="ticket-info-bot">Pakket is naar <u>{{ ticket.locationId }}</u> gebracht.</div>
            <div class="ticket-info-bot">Uitgevoerd door: {{ ticket.completedByPersonId }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue } from "vue-class-component";
    import { Ticket } from "@/package/Ticket";
    import { Prop } from "vue-property-decorator";

    export default class TicketComp extends Vue {
        @Prop() public ticket!: Ticket;

        mounted() {
            console.log(this.ticket);
        }

        private destinationReached() {
            if (this.ticket.receivedByPersonId) {
                return true;
            }
            return false;
        }

        private getLocationString(): string {
            let loc = this.ticket?.locationId;
            return loc ? loc : "Geen locatie";
        }
    }
</script>


<style scoped lang="scss">
    @import "@/styling/main.scss";

    .ticket {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        max-width: 500px;
        column-gap: 0.5em;
    }

    .ticket-info {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: left;
        align-items: flex-start;
        row-gap: 0.3em;
    }

    .ticket-info-top {
        font-weight: bold;
    }

    .ticket-image {
        margin-right: 1em;
        width: 50px;
        align-self: center;
        flex-direction: column;
        display: flex;
        align-items: center;
    }

    .finished {
        color: $pink-color;
        font-size: 1.5em;

        &.big {
            font-size: 2em;
            color: $modern-purple-color;
        }
    }

    @media only screen and (max-width: 700px) {
        .ticket-image {
            width: 5%;
        }

        .ticket-info {
            font-size: 12px;
        }
    }
</style>