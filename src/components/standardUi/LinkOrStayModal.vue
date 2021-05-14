<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <h2>Wilt u verder gaan of blijven?</h2>
        <small-btn-finish
          class="button-tray"
          text="Blijven"
          @click="$emit('close')"
        />
        <small-btn-finish
          class="button-tray"
          text="Sluiten"
          v-on:click="goToLink"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SmallBtnFinish from "@/components/standardUi/SmallBtnFinish.vue";

@Options({
  components: {
    SmallBtnFinish,
  },
  props: {
    link: String,
  },
  emits: ["close"],
})
export default class LinkOrStayModal extends Vue {
  private link!: string;

  goToLink() {
    this.$router.push("/" + this.link);
  }
}
</script>

<style scoped lang="scss">
@import "@/styling/main.scss";

.button-tray {
display: inline-block;
margin-right: 15px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial;
}
</style>

<!--Implement as follows
 <transition name="modal" v-if="showModal" close="showModal = false">
      <link-or-stay-modal link="locaties"  @close="showModal = false"/>
    </transition>

    in the script: showModal: boolean = false;
    Use this to allow users to either go on or stay on page, link can be wahtever you like -->
    