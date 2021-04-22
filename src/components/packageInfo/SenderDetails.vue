<template>
    <div class="sd-content">
      <div class="container-subheader">Afzender</div>
      <div class="sd-item">{{ sender }}</div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    sender: String,
  },
})
export default class SenderDetails extends Vue {
  public sender!: String;

  mounted(){
    console.log(this.sender);
  }
}
</script>


<style scoped lang="scss">
@import "@/styling/main.scss";


.sd-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.3em;
}

.sd-item {
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
}
</style>