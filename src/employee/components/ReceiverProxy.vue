<template>
    <Placeholder :loaded="isLoaded">{{this.text}}</Placeholder>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'
    import { getCurrentInstance } from "@vue/runtime-core";
    import Placeholder from '@/components/Placeholder.vue'

    @Options({
        components: {
            Placeholder,
        }
    })
    export default class ReceiverProxy extends Vue {
        @Prop() id!: string;

        private employeeRepo = getCurrentInstance()?.appContext.config.globalProperties.$employeeRepo;

        private isLoaded: boolean = false;
        private text: string = "Empty";

        async mounted() {
            this.employeeRepo
                .GetEmployeeByID(this.id)
                .then((res) => {
                    this.LoadWithText(res.name);
                })
                .catch((err) => {
                    console.error(err);
                    this.LoadWithText("err. not found");
                });
        }

        private LoadWithText(text: string): void {
            this.text = text;
            this.isLoaded = true;
        }
    }
</script>

<style scoped lang="scss">
</style>