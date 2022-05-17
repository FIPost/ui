<template>
    <form>
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
                    <input type="text" class="form-control" v-model="pkg.reiever" />
                </div>
            </div>
            <div class="row">
                <label class="col-2 col-form-label">Afhaalpunt</label>
                <div class="col-10">
                    <input type="text" class="form-control" v-model="pkg.target" />
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
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" dat-bs-target="#myModal">Aanmaken</button>

        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModalLabel">Confirm Registration</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close" />
                    </div>
                    <div class="modal-body">
                        some text...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="toggleStep">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
    import { Vue, Options } from 'vue-class-component'
import { Package } from '../Package';

    @Options({
        components: {

        }
    })
    export default class PackageRegistrationForm extends Vue {
        private pkg: object = {};

        private toggleStep() {
            console.log(this.pkg);
        }
    }
</script>