<template>
    <form @submit.prevent="submitPackage">
        <section class="row mb-3 gap-2">
            <h2>Pakket informatie</h2>

            <div class="row">
                <label class="col-2 col-form-label">Afzender</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.sender" />
                </div>
            </div>

            <div class="row">
                <label class="col-2 col-form-label">Pakket naam</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.name" />
                </div>
            </div>

            <div class="row">
                <label class="col-2 col-form-label">Ontvanger</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.recieverId" />
                </div>
            </div>

            <div class="row">
                <label class="col-2 col-form-label">Afhaalpunt</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.collectionPointId" />
                </div>
            </div>
        </section>
        <section class="row mb-3 gap-2">
            <h2>Registratie informatie</h2>
            <div class="row">
                <label class="col-2 col-form-label">Verwerkt door</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.employee" />
                </div>
            </div>

            <div class="row">
                <label class="col-2 col-form-label">Op locatie</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.current" />
                </div>
            </div>
        </section>

        <button type="submit" class="btn btn-primary">Aanmaken</button>
    </form>
</template>

<script lang="ts">
    import { Vue, Options } from 'vue-class-component'
    import { Package, PackageRequest } from '../Package';
    import { pakketService } from '../pakketservice';

    @Options({
        components: {

        }
    })
    export default class PackageRegistrationForm extends Vue {
        private pkg: PackageRequest = { Sender: "", ReceiverId: "", Name: "", CollectionPointId: "", CreatedByPersonId: "", CreatedAtLocationId: "" };

        submitPackage() {
            console.log(this.pkg);
        }

        private registerPackage() {
            pakketService
                .post(this.pkg)
                .then(res => {
                })
                .catch();
        }
    }
</script>