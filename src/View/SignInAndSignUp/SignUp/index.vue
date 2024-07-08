<template>
    <div class="signin-form">
        <h1 class="text-dark-purple">Sign Up</h1>
        <div>
            <v-text-field variant="underlined"
                          v-model="form.email"
                          name="email"
                          label="Email"
            ></v-text-field>
            <v-text-field
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                v-on:keyup.enter="handleSubmit"
                v-model="form.password" label="Password" variant="underlined"></v-text-field>
            <v-text-field
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                v-on:keyup.enter="handleSubmit"
                v-model="form.repeatPassword" label="Re-enter password" variant="underlined"></v-text-field>
            <v-btn width="100%" class="submit-btn" color="primary">Sign Up</v-btn>
        </div>
        <div class="links">
            <router-link :to="ROUTES.SIGNIN">
                Already have an account? Sign In.
            </router-link>
        </div>
    </div>
</template>

<script>
import {ROUTES} from "@/Constants/routes.js";

export default {
    name: "SignUp",
    data() {
        return {
            ROUTES,
            show1:false,
            show2:false,
            form: {
                email: null,
                password: null,
                repeatPassword: null,
            },
            errrorMessage:null,
        }
    },
    methods:{
        handleSubmit(){

        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    margin-bottom: 24px;
}
.submit-btn{
    margin-top: 16px;
}
.links{
    margin-top: 24px;
    a{
        color: $PURPLE;
    }
}
</style>