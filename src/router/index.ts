import {createWebHistory, createRouter} from "vue-router";
import HelloWorld from "@/views/HelloWorld.vue";
import RegisterPackage from "@/views/RegisterPackage.vue";
import Home from "@/views/Home.vue";
import PakketOverzicht from "@/views/PakketOverzicht.vue";
import PackagePage from "@/views/PackagePage.vue";
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;