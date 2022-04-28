<template>
    <div class="card fluid">
        <LoadingIcon small="true" v-if="!isLoaded" />
        <div v-else>
            {{room.name}}, {{room.building.name}}, {{room.building.address.city.name}}
        </div>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import Room from "@/location/Room";
    import LoadingIcon from '@/components/standardUi/LoadingIcon.vue'
    import { roomService } from "../../location/roomservice";
    import { Prop } from "vue-property-decorator";

    @Options({
        components: {
            LoadingIcon
        },
    })
    export default class RoomDetails extends Vue {
        @Prop() id!: string;
        private isLoaded: boolean = false;
        private room?: Room;

        async beforeMount() {
            roomService.getById(this.id)
                .then((res) => {
                    this.room = res;
                    this.isLoaded = true;
                })
        }
    }
</script>



<style scoped lang="scss">
    @import "@/styling/main.scss";

    .fluid {
        width: 100%;
    }
</style>