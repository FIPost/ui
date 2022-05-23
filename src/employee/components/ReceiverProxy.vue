<template>
    <div>
        <span class="placeholder fade" v-if="!isLoaded" />
        <span v-else>{{this.text}}</span>
    </div>
</template>

<script lang="ts">
    import { Vue } from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'
    import { getCurrentInstance } from "@vue/runtime-core";

    export default class ReceiverProxy extends Vue {
        @Prop() id!: string;

        private employeeRepo = getCurrentInstance()?.appContext.config.globalProperties.$employeeRepo;

        private isLoaded: boolean = false;
        private text: string = "Empty";

        async mounted() {
            this.employeeRepo
                .GetEmployeeByID(this.id)
                .then((res) => {
                    this.text = res.name;
                    this.isLoaded = true;
                })
                .catch((err) =>
                    console.error(err)
                );
        }
    }
</script>

<style scoped lang="scss">
    @keyframes fade-anim {
        from {
            background-color: lightgray;
        }

        to {
            background-color: darkgray;
        }
    }

    .fade {
        animation-name: fade-anim;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    .placeholder {
        display: block;
        background-color: lightgray;
        height: 20px;
        width: 100px;
    }
</style>