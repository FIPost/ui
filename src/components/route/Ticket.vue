<template>
  <div class="ticket">
    <div class="ticket-image">
        <font-awesome-icon icon="check-circle" size="2x" :class="ticket.IsFinished ? 'finished' : 'unfinished'"/>
    </div>
    <div class="ticket-info">
      <div class="ticket-info-top">
        <div v-if="ticket.IsFinished">
          {{ ticket.FinishedAt }}
        </div>
        <div v-else-if="ticket.IsCurrent">
          Te doen
        </div>
        <div v-else>
          N.V.T.
        </div>
      </div>
      <div class="ticket-info-bot">
        {{ ticket.Description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TicketModel from "@/classes/TicketModel";

@Options({
  props: {
    ticket: TicketModel,
  },
})
export default class Ticket extends Vue {
  ticket!: TicketModel;

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
}
.unfinished{
 color: $gray-color;
}

@media only screen and (max-width: 700px) {
  .ticket-info {
    font-size: 12px;
  }
}
</style>