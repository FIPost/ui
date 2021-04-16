<template>
  <div>
    <div v-if="!ticket.IsFinished" class="next-step-container">
      <div class="container-header">Volgende stap</div>
      <div class="message">{{ ticket.Description }}</div>
      <BtnFinish class="finish" @btn-clicked="finishStep()" />
    </div>
    <div v-else class="next-step-container">
      <div class="container-header">
        <font-awesome-icon icon="flag-checkered" />
        Voltooid
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BtnFinish from "@/components/standardUi/BtnFinish.vue";
import TicketModel from "@/classes/TicketModel";

@Options({
  components: {
    BtnFinish,
  },
  props: {
    ticket: TicketModel,
  },
})
export default class NextStep extends Vue {
  ticket!: TicketModel;

  private finishStep(): void {
    this.ticket.IsFinished = true;
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.next-step-container {
  color: $black-color;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  overflow: hidden;
  padding: 3em;
  box-shadow: $shadow;
  border-radius: $border-radius;
  row-gap: 4em;

  @media only screen and (max-width: 600px) {
    padding: 2em;
  }
}

.message {
  text-decoration: underline;
}

.finish {
  cursor: pointer;
  align-self: flex-start;
}
</style>