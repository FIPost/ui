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
    import { Options, Vue } from "vue-class-component"
    import { getCurrentInstance } from "vue"

    import Room from '@/location/Room'
    import Building from "../location/Building";
    import Address from "../location/Address";
    import City from "../location/City";

    @Options({
        components: {

        },
    })
    export default class AddLocation extends Vue {
        private locationRepo = getCurrentInstance()?.appContext.config.globalProperties.$locationRepo;

        private loc: object = {};
        private requestSend: boolean = false;

        private addLocation(): void {
            if (this.requestSend) {
                throw new Error("Request was already send, please wait for response and try again");
            }

            console.log(this.loc);

            // validate form

            // this.sendRequest(this.loc);
        }

        private async sendRequest(location) {
            this.requestSend = true;

            // build location
            const city: City = new City("", location.city);
            const address: Address = new Address(city, location.street, location.zip, location.number, "");
            const building: Building = new Building("", "", address);
            const room: Room = new Room("", location.name, building);

            await this.locationRepo.AddRoom(room)
                .then(res => {
                    // handle response completed
                })
                .catch(err => {
                    // handle response failed
                });

            this.requestSend = false;
        }
    }
</script>

<style lang="scss" scoped>
</style>
