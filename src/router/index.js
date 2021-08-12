import Vue from "vue";
import VueRouter from "vue-router";
import StartScreen from "../components/Screens/Start/StartScreen.vue";
import ResultScreen from "../components/Screens/Result/ResultScreen.vue";
<<<<<<< HEAD
import QuestionScreen from "@/components/Screens/Question/QuestionScreen.vue";
=======
import QuestionScreen from "@/components/Screens/QuestionScreen.vue";

>>>>>>> robin-dev-result
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: StartScreen
    },
    {
        path: "/result",
        name: "Result",
        component: ResultScreen
    },
    {
        path: "/trivia",
        name: "Trivia",
        component: QuestionScreen
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes 
});

export default router;
