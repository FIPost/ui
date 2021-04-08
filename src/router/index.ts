import {createWebHistory, createRouter} from "vue-router";
import HelloWorld from "@/views/HelloWorld.vue";
import RegisterPackage from "@/views/RegisterPackage.vue";
import Home from "@/views/Home.vue";
import PakketOverzicht from "@/views/PakketOverzicht.vue";
import PackagePage from "@/views/PackagePage.vue";
import LocatieOverzicht from "@/views/LocatieOverzicht.vue";

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
        path: "/locatieOverzicht",
        name: "Locatie Overzicht",
        component: LocatieOverzicht
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;