<template>
    <div>
        <div v-for="pkg in packages">

        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Options } from 'vue-class-component'

    @Options({

    })
    export default class PackageList extends Vue {

    }
</script>

<style scoped lang="scss">

</style>