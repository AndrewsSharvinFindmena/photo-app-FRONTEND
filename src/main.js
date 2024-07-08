import "@/Assets/Styles/style.scss";

import { createApp } from 'vue'
import App from './App.vue'
import AppComponents from "./Components/index.js"
import router from "@/Router/index.js";
import 'vuetify/styles'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";


const app = createApp(App);


const appVuetifyThemes= {
    dark:false,
    colors:{
        primary:'#5521b4'
    }
}

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: "mdi",
    },
    theme: {
        defaultTheme: 'appVuetifyThemes',
        themes: {
            appVuetifyThemes,
        },
    },
});

const libs = [ router, vuetify];

AppComponents.forEach((component) => {
    app.component(component.name, component);
});
libs.forEach((lib) => {
    app.use(lib);
});

app.mount("#app");
