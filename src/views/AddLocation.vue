<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="/#/locaties">Locations</a></li>
                <li class="breadcrumb-item active" aria-current="page">Register</li>
            </ol>
        </nav>

        <header>
            <h1>Locatie registreren</h1>
        </header>

        <form class="needs-validation" @submit.prevent="addLocation" novalidate>
            <section class="row mb-3 gap-2">
                <div class="row">
                    <div class="col-12">
                        <label for="locationName" class="form-label">Naam locatie</label>
                        <input type="text" class="form-control" id="locationNameInput" v-model="loc.name" required />
                        <div class="invalid-feedback">Voer een valide naam in</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10">
                        <label for="address" class="form-label">Straatnaam</label>
                        <input type="text" class="form-control" v-model="loc.address" />
                    </div>
                    <div class="col-2">
                        <label for="address" class="form-label">Nummer</label>
                        <input type="text" class="form-control" v-model="loc.number" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="address" class="form-label">Stad</label>
                        <input type="text" class="form-control" v-model="loc.city" />
                    </div>
                    <div class="col-4">
                        <label for="address" class="form-label">Provincie</label>
                        <input type="text" class="form-control" v-model="loc.state" />
                    </div>
                    <div class="col-2">
                        <label for="address" class="form-label">Postcode</label>
                        <input type="text" class="form-control" v-model="loc.zip" />
                    </div>
                </div>
            </section>

            <button type="submit" class="btn btn-primary">Aanmaken</button>
        </form>
    </div>
</template>


<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import InputField from "@/components/standardUi/InputField.vue";
    import BtnFinish from "@/components/standardUi/BtnFinish.vue";
    import AddCity from "@/components/locationRegistration/AddCity.vue";
    import AddBuilding from "@/components/locationRegistration/AddBuilding.vue";
    import AddRoom from "@/components/locationRegistration/AddRoom.vue";
    import ComboBox from "@/components/standardUi/ComboBox.vue";
    import BtnBack from "@/components/standardUi/BtnBack.vue";

    @Options({
        components: {
            ComboBox,
            InputField,
            BtnFinish,
            AddCity,
            AddBuilding,
            AddRoom,
            BtnBack,
        },
    })
    export default class AddLocation extends Vue {
        private loc: object = {};

        addLocation() {
            console.log(this.loc);
        }
    }
</script>

<style lang="scss" scoped>
</style>
