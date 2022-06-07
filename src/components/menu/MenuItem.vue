<template>
    <div class="card">
        <h2 class="card-title text-center"><slot /></h2>
        <img class="w-50 mx-auto" :src="source" alt="icon" />
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import { Prop } from "vue-property-decorator";

    @Options({

    })
    export default class MenuItem extends Vue {
        @Prop() private source!: string;
    }
</script>

<style scoped lang="scss">
</style>
