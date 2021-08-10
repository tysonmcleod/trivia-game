import Vue from "vue";
import VueRouter from "vue-router";
import Category from "../components/Screens/Start/Category.vue";
import StartScreen from "../components/Screens/Start/StartScreen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: StartScreen
    },
    {
        path: "/categories",
        name: "Category",
        component: Category
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes 
});

export default router;
