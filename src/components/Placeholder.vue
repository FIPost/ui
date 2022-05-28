<template>
    <div class="placeholder-glow">
        <span v-if="loaded" class="placeholder col-12"></span>
        <span v-else><slot/></span>
    </div>
</template>

<script lang="ts">
    import { Vue } from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    export default class Placeholder extends Vue {
        @Prop() loaded: boolean = false;
    }
</script>