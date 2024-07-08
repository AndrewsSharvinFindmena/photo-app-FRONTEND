import { createRouter, createWebHistory } from "vue-router";
import { ROUTES } from "@/Constants/routes.js";
import Home from "@/View/Home/index.vue";
import SignInAndSignUp from "@/View/SignInAndSignUp/index.vue";


const routes = [
    {
        path: ROUTES.HOME,
        name: "Home",
        component: Home,
    },
    {
        path: ROUTES.SIGNIN,
        name: "Sign In",
        component: SignInAndSignUp,
    },
    {
        path: ROUTES.SIGNUP,
        name: "Sign Up",
        component: SignInAndSignUp,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

export default router;