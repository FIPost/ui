<template>
    <div class="card">
        <h1>Pakketgegevens</h1>
        <ul class="listGroup gap-1">
            <li class="listItem">
                <div class="col-6"><b>Omschrijving:</b></div>
                <div class="col-6">{{pkg.name}}</div>
            </li>
            <li class="listItem">
                <div class="col-6"><b>Ontvanger:</b></div>
                <div class="col-6">{{pkg.receiverId}}</div>
            </li>
            <li class="listItem">
                <div class="col-6"><b>Afzender:</b></div>
                <div class="col-6">{{pkg.sender}}</div>
            </li>
            <li class="listItem">
                <div class=""><b>Huidige locatie:</b></div>
                <RoomDetails :id="pkg.tickets[0].locationId" />
            </li>
            <li class="listItem">
                <div class=""><b>Eind locatie:</b></div>
                <RoomDetails :id="pkg.collectionPointId" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component"
    import { Prop } from "vue-property-decorator"
    import { Package } from "@/package/Package"
    import RoomDetails from "@/components/packageInfo/RoomDetails.vue"

    @Options({
        components: {
            RoomDetails
        },
    })
    export default class PackageDetails extends Vue {
        @Prop() pkg!: Package;

    }
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";

    .col-6{
        flex-grow: 6;
    }



    .package-details {
        background-color: white;
        border-radius: $border-radius;
        box-shadow: $shadow;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 1em;
        padding: 3em;

        @media only screen and (max-width: 600px) {
            padding: 2em;
        }
    }

    .pd-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        column-gap: 0.5em;
    }

    .pd-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 0.2em;
    }

    .pd-item {
        font-size: 16px;

        @media only screen and (max-width: 600px) {
            font-size: 12px;
        }
    }

    .sd-img {
        width: 3em;
        position: relative;
    }

    img {
        width: 100px;
        position: absolute;
        left: -50px;
        top: -50px;

        @media only screen and (max-width: 600px) {
            width: 3em;
            left: 0px;
            top: 0px;
        }
    }

    .details-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
    }
</style>