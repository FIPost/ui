import {createWebHashHistory, createRouter} from "vue-router";
import RegisterPackage from "@/views/RegisterPackage.vue";
import Home from "@/views/Home.vue";
import PakketOverzicht from "@/views/PakketOverzicht.vue";
import PackagePage from "@/views/PackagePage.vue";
import AddLocation from "@/views/AddLocation.vue";
import LocationOverview from "@/views/LocationOverview.vue";
import AddLocation from "@/views/AddLocation.vue";

const routes = [
    {
        path: "/registratie",
        name: "RegisterPackage",
        component: RegisterPackage,
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/overzicht",
        name: "PakketOverzicht",
        component: PakketOverzicht
    },
    {
        path: "/pakket/:id",
        name: "PackagePage",
        component: PackagePage
    },
    {
        path: "/addlocation",
        name: "AddLocation",
        component: AddLocation
    },
    {
        path: "/locatieOverzicht",
        name: "Locatie Overzicht",
        component: LocationOverview
    },
    {
        path: "/addlocation",
        name: "AddLocation",
        component: AddLocation
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;