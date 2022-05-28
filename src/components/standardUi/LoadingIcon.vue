<template>
    <div style="display: flex; justify-content:center;">
        <span class="loader" :class="small ? 'small' : ''" />
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Options({
    })
    export default class LoadingIcon extends Vue {
        @Prop() small: boolean = false;
    }
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";

    .loader {
        border: 16px solid #e3e3e3; /* Light grey */
        border-top: 16px solid $modern-purple-color; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    .small {
        width: 12px;
        height: 12px;
        border: 5px solid #e3e3e3; /* Light grey */
        border-top: 5px solid $modern-purple-color; /* Blue */
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>